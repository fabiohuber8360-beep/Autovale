import Link from 'next/link';
import { Plus, Eye, Edit, Pause } from 'lucide-react';
import { mockListings } from '@/data/mock-listings';
import { formatCHF, formatNumber } from '@/lib/utils';
import StatusBadge from '@/components/shared/StatusBadge';

export default function DashboardInseratePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Meine Inserate</h1>
        <Link
          href="/inserat-erstellen"
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Neues Inserat
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Fahrzeug</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Preis</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Status</th>
                <th className="text-right text-xs font-semibold text-stone-500 uppercase px-4 py-3">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {mockListings.slice(0, 4).map((listing) => (
                <tr key={listing.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-stone-800">{listing.title}</p>
                    <p className="text-xs text-stone-500">{formatNumber(listing.mileage_km)} km · {listing.location_city}</p>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-stone-800">{formatCHF(listing.price_chf)}</td>
                  <td className="px-4 py-3"><StatusBadge status={listing.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/fahrzeuge/${listing.id}`} className="p-2 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition-colors"><Eye className="w-4 h-4" /></Link>
                      <button className="p-2 text-stone-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-stone-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"><Pause className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
