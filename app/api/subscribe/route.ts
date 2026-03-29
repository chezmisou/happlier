import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const { appId } = await request.json();

    // Verify app belongs to user
    const { data: app } = await supabase
      .from('apps')
      .select('id, status')
      .eq('id', appId)
      .eq('user_id', user.id)
      .maybeSingle();

    if (!app) {
      return NextResponse.json({ error: 'Application introuvable' }, { status: 404 });
    }

    if (app.status === 'active') {
      return NextResponse.json({ error: 'Application déjà active' }, { status: 400 });
    }

    // Get profile for stripe customer id
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single();

    const session = await createCheckoutSession({
      appId: app.id,
      userId: user.id,
      customerEmail: user.email!,
      stripeCustomerId: profile?.stripe_customer_id,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
