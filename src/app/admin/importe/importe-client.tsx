'use client';

import { useState } from 'react';
import { ArrowDownToLine, RefreshCw, CheckCircle, Car, Gauge, Euro } from 'lucide-react';
import { useRouter } from 'next/navigation';

type AutovaleExport = {
  id: string;
  vehicle_id: string;
  company_id: string;
  brand: string;
  model: string;
  year: number | null;
  mileage_km: number | null;
  engine: string | null;
  vin: string | null;
  price_eur: number | null;
  price_chf: number | null;
  exchange_rate: number | null;
  image_urls: string[];
  seller: string | null;
  location: string | null;
  listing_url: string | null;
  next_step: string | null;
  exported_at: string;
  imported: boolean;
};

function swissNum(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

export default function ImporteClient({ initialExports }: { initialExports: AutovaleExport[] }) {
  const router = useRouter();
  const [exports,   setExports]   = useState<AutovaleExport[]>(initialExports);
  const [importing, setImporting] = useState<string | null>(null);
  const [error,     setError]     = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 800);
  }

  async function handleImport(exp: AutovaleExport) {
    setImporting(exp.id);
    setError(null);
    try {
      const res = await fetch('/api/autohub-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exp),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Import fehlgeschlagen');
      setExports(prev => prev.map(e => e.id === exp.id ? { ...e, imported: true } : e));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import fehlgeschlagen');
    } finally {
      setImporting(null);
    }
  }

  const pending  = exports.filter(e => !e.imported);
  const imported = exports.filter(e => e.imported);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800 mb-1">AutoHub Importe</h1>
          <p className="text-sm text-stone-500">
            Fahrzeuge aus AutoHub als Entwurf in AutoVale übernehmen.
          </p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors disabled:opacity-50">
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Aktualisieren
        </button>
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
      )}

      {exports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-12 text-center">
          <ArrowDownToLine className="w-12 h-12 text-stone-300 mx-auto mb-4" />
          <p className="text-stone-500 font-medium mb-2">Noch keine Exporte</p>
          <p className="text-sm text-stone-400">
            Öffne in AutoHub ein Fahrzeug und klicke auf «→ AutoVale» um es hierher zu exportieren.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {pending.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                Warten auf Import ({pending.length})
              </h2>
              <div className="grid gap-3">
                {pending.map(exp => (
                  <ExportCard key={exp.id} exp={exp}
                    importing={importing === exp.id}
                    onImport={() => handleImport(exp)} />
                ))}
              </div>
            </div>
          )}
          {imported.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Bereits importiert ({imported.length})
              </h2>
              <div className="grid gap-3 opacity-60">
                {imported.map(exp => (
                  <ExportCard key={exp.id} exp={exp} importing={false} onImport={() => {}} done />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ExportCard({ exp, importing, onImport, done }: {
  exp: AutovaleExport;
  importing: boolean;
  onImport: () => void;
  done?: boolean;
}) {
  const img = exp.image_urls?.[0];
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 flex items-center gap-4">
      <div className="w-20 h-14 rounded-xl bg-stone-100 flex-shrink-0 overflow-hidden">
        {img
          ? <img src={img} alt="" className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center"><Car className="w-6 h-6 text-stone-300" /></div>}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-stone-800 text-sm">
          {exp.brand} {exp.model}
          {exp.year && <span className="text-stone-400 font-normal"> · {exp.year}</span>}
        </p>
        <div className="flex flex-wrap gap-3 mt-1 text-xs text-stone-500">
          {exp.mileage_km != null && (
            <span className="flex items-center gap-1"><Gauge className="w-3 h-3" />{swissNum(exp.mileage_km)} km</span>
          )}
          {exp.price_eur != null && (
            <span className="flex items-center gap-1"><Euro className="w-3 h-3" />{swissNum(exp.price_eur)} €</span>
          )}
          {exp.price_chf != null && (
            <span className="font-medium text-stone-700">→ {swissNum(exp.price_chf)} CHF</span>
          )}
          {exp.location && <span>{exp.location}</span>}
        </div>
        <p className="text-xs text-stone-400 mt-0.5">
          Exportiert: {new Date(exp.exported_at).toLocaleDateString('de-CH')}
        </p>
      </div>
      <div className="flex-shrink-0">
        {done ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <CheckCircle className="w-4 h-4" /> Importiert
          </span>
        ) : (
          <button onClick={onImport} disabled={importing}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-60">
            {importing
              ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Importieren…</>
              : <><ArrowDownToLine className="w-3.5 h-3.5" /> Importieren</>}
          </button>
        )}
      </div>
    </div>
  );
}
