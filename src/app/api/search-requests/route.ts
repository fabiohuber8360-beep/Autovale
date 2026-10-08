import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, make, model, variant, budget_chf, min_year, max_mileage_km, preferred_colors, preferred_fuel, required_equipment, notes } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'name and email are required' },
        { status: 400 }
      );
    }

    const supabase = createServiceClient();

    const { error } = await supabase.from('search_requests').insert({
      name,
      email,
      phone: phone || null,
      make: make || null,
      model: model || null,
      variant: variant || null,
      budget_chf: budget_chf || null,
      min_year: min_year || null,
      max_mileage_km: max_mileage_km || null,
      preferred_colors: preferred_colors || null,
      preferred_fuel: preferred_fuel || null,
      required_equipment: required_equipment || null,
      notes: notes || null,
      status: 'open',
    });

    if (error) {
      console.error('Error creating search request:', error);
      return NextResponse.json({ error: 'Failed to create search request' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Search request API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
