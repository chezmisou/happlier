import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2026-03-25.dahlia',
      typescript: true,
    });
  }
  return _stripe;
}


export async function createCheckoutSession(params: {
  appId: string;
  userId: string;
  customerEmail: string;
  stripeCustomerId?: string | null;
}) {
  const stripe = getStripe();

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    metadata: {
      app_id: params.appId,
      user_id: params.userId,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?cancelled=true`,
  };

  if (params.stripeCustomerId) {
    sessionParams.customer = params.stripeCustomerId;
  } else {
    sessionParams.customer_email = params.customerEmail;
  }

  return stripe.checkout.sessions.create(sessionParams);
}
