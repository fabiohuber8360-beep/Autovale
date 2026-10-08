import Link from 'next/link';
import { Car, Plus, User, MessageSquare, CreditCard } from 'lucide-react';
import { mockListings } from '@/data/mock-listings';
import { formatCHF } from '@/lib/utils';
import StatusBadge from '@/components/shared/StatusBadge';

export default function DashboardPage() {
  const myListings = mockListings.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800 mb-1">Mein Dashboard</h1>
          <p className="text-sm text-stone-500">Verwalte deine Inserate und Anfragen</p>
        </div>
        <Link
          href="/inserat-erstellen"
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Neues Inserat
        </Link>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Car, label: 'Meine Inserate', href: '/dashboard/inserate', count: myListings.length },
          { icon: MessageSquare, label: 'Anfragen', href: '/dashboard/inserate', count: 5 },
          { icon: CreditCard, label: 'Zahlungen', href: '/dashboard/inserate', count: 3 },
          { icon: User, label: 'Profil', href: '/dashboard/profil', count: null },
        ].map(({ icon: Icon, label, href, count }) => (
          <Link key={label} href={href} className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 hover:shadow-md hover:border-orange-200/50 transition-all">
            <Icon className="w-6 h-6 text-orange-500 mb-3" />
            <p className="text-sm font-semibold text-stone-800">{label}</p>
            {count !== null && <p className="text-xs text-stone-500 mt-1">{count} Einträge</p>}
          </Link>
        ))}
      </div>

      {/* My Listings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-stone-800">Meine Inserate</h2>
          <Link href="/dashboard/inserate" className="text-sm text-orange-600 font-medium hover:text-orange-700">
            Alle anzeigen
          </Link>
        </div>
        <div className="space-y-3">
          {myListings.map((listing) => (
            <div key={listing.id} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-stone-800">{listing.title}</p>
                <p className="text-xs text-stone-500">{listing.location_city} · {formatCHF(listing.price_chf)}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={listing.status} />
                <Link href={`/fahrzeuge/${listing.id}`} className="text-xs text-orange-600 font-medium hover:text-orange-700">
                  Ansehen
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
