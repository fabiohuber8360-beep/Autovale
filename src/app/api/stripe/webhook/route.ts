import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServiceClient } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const listingId = session.metadata?.listing_id;

    if (listingId) {
      const supabase = createServiceClient();

      // Update payment status
      await supabase
        .from('payments')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session.id);

      // Publish the listing
      await supabase
        .from('listings')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .eq('id', listingId);

      // Audit log
      await supabase.from('audit_logs').insert({
        action: 'listing_published_via_payment',
        entity_type: 'listing',
        entity_id: listingId,
        metadata: {
          stripe_session_id: session.id,
          amount: session.amount_total,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}
