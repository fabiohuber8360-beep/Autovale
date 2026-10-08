import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { listing_id, name, email, phone, message, inquiry_type } = body;

    if (!listing_id || !name || !email || !message) {
      return NextResponse.json(
        { error: 'listing_id, name, email and message are required' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { error } = await supabase.from('listing_inquiries').insert({
      listing_id,
      name,
      email,
      phone: phone || null,
      message,
      inquiry_type: inquiry_type || 'question',
    });

    if (error) {
      console.error('Error creating inquiry:', error);
      return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
