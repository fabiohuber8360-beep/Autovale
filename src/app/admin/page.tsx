import { Car, Users, Search, CreditCard, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import KPIBox from '@/components/shared/KPIBox';
import StatusBadge from '@/components/shared/StatusBadge';
import { formatCHF } from '@/lib/utils';
import { mockListings } from '@/data/mock-listings';

export default function AdminDashboardPage() {
  const publishedCount = mockListings.filter((l) => l.status === 'published').length;

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 mb-1">Admin Übersicht</h1>
        <p className="text-sm text-stone-500">Willkommen im AutoVale Admin Dashboard</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIBox
          label="Aktive Inserate"
          value={publishedCount}
          icon={<Car className="w-5 h-5" />}
          trend="+2 diese Woche"
        />
        <KPIBox
          label="Offene Suchanfragen"
          value={3}
          icon={<Search className="w-5 h-5" />}
        />
        <KPIBox
          label="Registrierte Nutzer"
          value={47}
          icon={<Users className="w-5 h-5" />}
          trend="+5 diese Woche"
        />
        <KPIBox
          label="Umsatz (Monat)"
          value={formatCHF(870)}
          icon={<CreditCard className="w-5 h-5" />}
          trend="+12%"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Latest Listings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Neueste Inserate</h2>
          <div className="space-y-3">
            {mockListings.slice(0, 5).map((listing) => (
              <div key={listing.id} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-stone-800 truncate">{listing.title}</p>
                  <p className="text-xs text-stone-500">{listing.location_city} · {formatCHF(listing.price_chf)}</p>
                </div>
                <StatusBadge status={listing.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Schnellübersicht</h2>
          <div className="space-y-4">
            {[
              { label: 'Neue Inserate (7 Tage)', value: '4', icon: TrendingUp, color: 'text-emerald-500' },
              { label: 'Bezahlte Inserate (Monat)', value: '30', icon: CheckCircle, color: 'text-emerald-500' },
              { label: 'Deaktivierte Inserate', value: '2', icon: AlertCircle, color: 'text-amber-500' },
              { label: 'Verifizierte Händler', value: '8', icon: CheckCircle, color: 'text-blue-500' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0">
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-sm text-stone-600">{label}</span>
                </div>
                <span className="text-sm font-semibold text-stone-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
