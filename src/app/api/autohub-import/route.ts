import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const exp = await request.json();
    const supabase = createServiceClient();

    const title = `${exp.brand} ${exp.model}${exp.year ? ` (${exp.year})` : ''}`;

    // Insert as draft listing
    const { error: insertError } = await supabase.from('listings').insert({
      title,
      make:             exp.brand,
      model:            exp.model,
      production_year:  exp.year ?? new Date().getFullYear(),
      mileage_km:       exp.mileage_km ?? 0,
      price_chf:        exp.price_chf ?? 0,
      price_eur:        exp.price_eur ?? 0,
      status:           'draft',
      location_city:    exp.location ?? null,
      description:      exp.engine ? `Motor: ${exp.engine}` : null,
    });

    if (insertError) throw new Error(insertError.message);

    // Mark as imported in autovale_exports
    await supabase
      .from('autovale_exports')
      .update({ imported: true })
      .eq('id', exp.id);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('AutoHub import error:', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Import fehlgeschlagen' },
      { status: 500 }
    );
  }
}
