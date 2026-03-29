import { NextResponse, type NextRequest } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendSMS } from '@/lib/twilio';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const appId = session.metadata?.app_id;
      const userId = session.metadata?.user_id;

      if (!appId || !userId) break;

      // Create subscription record
      await supabase.from('subscriptions').insert({
        user_id: userId,
        app_id: appId,
        stripe_subscription_id: session.subscription as string,
      });

      // Update app status
      await supabase
        .from('apps')
        .update({ status: 'active', expires_at: null })
        .eq('id', appId);

      // Store stripe customer id
      if (session.customer) {
        await supabase
          .from('profiles')
          .update({ stripe_customer_id: session.customer as string })
          .eq('id', userId);
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      const subscriptionId = String((invoice as unknown as { subscription: string }).subscription || '');

      if (subscriptionId) {
        await supabase
          .from('subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', subscriptionId);

        // Get user info for SMS
        const { data: sub } = await supabase
          .from('subscriptions')
          .select('user_id, app_id')
          .eq('stripe_subscription_id', subscriptionId)
          .maybeSingle();

        if (sub) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('phone')
            .eq('id', sub.user_id)
            .single();

          if (profile?.phone) {
            await sendSMS(
              profile.phone,
              'Happlier : Votre paiement a échoué. Mettez à jour votre moyen de paiement sur happlier.com/dashboard pour éviter la suspension de votre app.'
            );
          }
        }
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;

      const { data: sub } = await supabase
        .from('subscriptions')
        .select('app_id')
        .eq('stripe_subscription_id', subscription.id)
        .maybeSingle();

      if (sub) {
        await supabase
          .from('apps')
          .update({ status: 'expired' })
          .eq('id', sub.app_id);

        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('stripe_subscription_id', subscription.id);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
