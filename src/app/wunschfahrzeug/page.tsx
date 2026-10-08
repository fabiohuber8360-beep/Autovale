'use client';

import { useState } from 'react';
import { Star, CheckCircle, Search, ArrowRight } from 'lucide-react';
import { MAKES, FUEL_TYPES, EXTERIOR_COLORS } from '@/lib/constants';

type FormState = {
  make: string;
  model: string;
  variant: string;
  budget_chf: string;
  min_year: string;
  max_mileage_km: string;
  preferred_fuel: string;
  preferred_colors: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
  import_de: boolean;
};

const EMPTY: FormState = {
  make: '', model: '', variant: '', budget_chf: '', min_year: '',
  max_mileage_km: '', preferred_fuel: '', preferred_colors: '',
  notes: '', name: '', email: '', phone: '', import_de: true,
};

export default function WunschfahrzeugPage() {
  const [form,      setForm]      = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);

  function set(key: keyof FormState, value: string | boolean) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/search-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:              form.name,
          email:             form.email,
          phone:             form.phone || null,
          make:              form.make || null,
          model:             form.model || null,
          variant:           form.variant || null,
          budget_chf:        form.budget_chf ? Number(form.budget_chf) : null,
          min_year:          form.min_year ? Number(form.min_year) : null,
          max_mileage_km:    form.max_mileage_km ? Number(form.max_mileage_km) : null,
          preferred_fuel:    form.preferred_fuel || null,
          preferred_colors:  form.preferred_colors ? [form.preferred_colors] : null,
          notes:             form.notes || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Fehler beim Absenden');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Absenden. Bitte erneut versuchen.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-3">Suchanfrage erhalten</h1>
          <p className="text-stone-500 mb-6">
            Vielen Dank für deine Anfrage. Wir prüfen den Markt und melden uns bei dir,
            sobald wir passende Fahrzeuge gefunden haben.
          </p>
          <button onClick={() => { setSubmitted(false); setForm(EMPTY); }}
            className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
            Weitere Anfrage stellen
          </button>
        </div>
      </div>
    );
  }

  const inputCls = 'w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500';
  const selectCls = inputCls + ' appearance-none bg-white';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-stone-800 to-stone-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <Star className="w-10 h-10 text-orange-400 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Wunschfahrzeug finden lassen</h1>
          <p className="text-stone-300 max-w-xl mx-auto text-lg">
            Du suchst ein bestimmtes Fahrzeug? Wir helfen dir, passende Angebote aus
            Deutschland zu finden und zeigen dir transparent, ob sich der Import lohnt.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-100">
          <form onSubmit={handleSubmit} className="space-y-8">

            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Fahrzeugwunsch */}
            <div>
              <h2 className="text-lg font-semibold text-stone-800 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-500" />
                Fahrzeugwunsch
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Marke *</label>
                  <select required value={form.make} onChange={e => set('make', e.target.value)} className={selectCls}>
                    <option value="">Bitte wählen</option>
                    {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Modell</label>
                  <input type="text" value={form.model} onChange={e => set('model', e.target.value)}
                    placeholder="z.B. 3er Touring, A4 Avant..." className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Variante</label>
                  <input type="text" value={form.variant} onChange={e => set('variant', e.target.value)}
                    placeholder="z.B. M Sport, S line..." className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Budget (CHF) *</label>
                  <input type="number" required value={form.budget_chf} onChange={e => set('budget_chf', e.target.value)}
                    placeholder="z.B. 35000" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Baujahr ab</label>
                  <input type="number" value={form.min_year} onChange={e => set('min_year', e.target.value)}
                    placeholder="z.B. 2020" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Max. Kilometer</label>
                  <input type="number" value={form.max_mileage_km} onChange={e => set('max_mileage_km', e.target.value)}
                    placeholder="z.B. 50000" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Kraftstoff</label>
                  <select value={form.preferred_fuel} onChange={e => set('preferred_fuel', e.target.value)} className={selectCls}>
                    <option value="">Egal</option>
                    {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Wunschfarbe</label>
                  <select value={form.preferred_colors} onChange={e => set('preferred_colors', e.target.value)} className={selectCls}>
                    <option value="">Egal</option>
                    {EXTERIOR_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Gewünschte Ausstattung & Wünsche</label>
              <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)}
                placeholder="Beschreibe hier, welche Ausstattung dir wichtig ist..."
                className={inputCls + ' resize-none'} />
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="import_de" checked={form.import_de}
                onChange={e => set('import_de', e.target.checked)}
                className="w-4 h-4 text-orange-500 border-stone-300 rounded focus:ring-orange-500" />
              <label htmlFor="import_de" className="text-sm text-stone-700">Import aus Deutschland gewünscht</label>
            </div>

            {/* Kontaktdaten */}
            <div>
              <h2 className="text-lg font-semibold text-stone-800 mb-4">Kontaktdaten</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Name *</label>
                  <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Vor- und Nachname" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">E-Mail *</label>
                  <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="deine@email.ch" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Telefon (optional)</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="+41 ..." className={inputCls} />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm disabled:opacity-60 disabled:cursor-wait">
              {loading ? 'Wird gesendet…' : 'Suchanfrage absenden'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <p className="text-xs text-stone-500 text-center">
              Deine Daten werden nur für die Bearbeitung deiner Anfrage verwendet.
              Wir melden uns innerhalb von 1–3 Werktagen bei dir.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
