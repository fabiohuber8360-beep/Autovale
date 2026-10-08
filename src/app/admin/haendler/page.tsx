import { Store, CheckCircle, Globe, MapPin, Phone } from 'lucide-react';

const mockDealers = [
  { id: '1', company: 'AutoZentrum Zürich', city: 'Zürich', phone: '+41 44 123 45 67', website: 'autozentrum-zh.ch', verified: true, listings: 12 },
  { id: '2', company: 'Importcars Basel', city: 'Basel', phone: '+41 61 987 65 43', website: 'importcars-basel.ch', verified: true, listings: 8 },
  { id: '3', company: 'DE-Auto Import GmbH', city: 'Bern', phone: '+41 31 456 78 90', website: null, verified: false, listings: 3 },
];

export default function AdminHaendlerPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 mb-1">Händler verwalten</h1>
        <p className="text-sm text-stone-500">{mockDealers.length} registrierte Händler</p>
      </div>

      <div className="grid gap-4">
        {mockDealers.map((dealer) => (
          <div key={dealer.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-stone-800">{dealer.company}</h3>
                    {dealer.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Verifiziert
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500">{dealer.listings} aktive Inserate</p>
                </div>
              </div>
              {!dealer.verified && (
                <button className="px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 transition-colors">
                  Verifizieren
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-stone-600">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-stone-400" />{dealer.city}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-stone-400" />{dealer.phone}</span>
              {dealer.website && <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-stone-400" />{dealer.website}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
