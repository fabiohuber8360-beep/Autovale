import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { listingId, priceChf } = body;

    if (!listingId || !priceChf) {
      return NextResponse.json(
        { error: 'listingId and priceChf are required' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'chf',
            product_data: {
              name: 'AutoVale Inserat',
              description: `Veröffentlichung Inserat #${listingId}`,
            },
            unit_amount: priceChf * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/zahlung/erfolg?session_id={CHECKOUT_SESSION_ID}&listing_id=${listingId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/zahlung/abgebrochen?listing_id=${listingId}`,
      metadata: {
        listing_id: listingId,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
