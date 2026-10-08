'use client';

import { useState } from 'react';
import { Search, Filter, Eye, Edit, Pause, Trash2, Star } from 'lucide-react';
import { mockListings } from '@/data/mock-listings';
import { formatCHF, formatNumber, formatDate } from '@/lib/utils';
import StatusBadge from '@/components/shared/StatusBadge';
import Link from 'next/link';

export default function AdminInseratePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = mockListings.filter((l) => {
    if (searchQuery && !l.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter && l.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800 mb-1">Inserate verwalten</h1>
          <p className="text-sm text-stone-500">{filtered.length} Inserate</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            placeholder="Inserat suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
        >
          <option value="">Alle Status</option>
          <option value="draft">Entwurf</option>
          <option value="pending_payment">Zahlung ausstehend</option>
          <option value="published">Veröffentlicht</option>
          <option value="paused">Pausiert</option>
          <option value="sold">Verkauft</option>
          <option value="archived">Archiviert</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-3">Fahrzeug</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-3">Preis</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-3">Kilometer</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-3">Standort</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-3">Erstellt</th>
                <th className="text-right text-xs font-semibold text-stone-500 uppercase tracking-wider px-4 py-3">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((listing) => (
                <tr key={listing.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {listing.featured && <Star className="w-4 h-4 text-orange-400 fill-orange-400 shrink-0" />}
                      <div>
                        <p className="text-sm font-medium text-stone-800">{listing.title}</p>
                        <p className="text-xs text-stone-500">{listing.make} {listing.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-stone-800">{formatCHF(listing.price_chf)}</td>
                  <td className="px-4 py-3 text-sm text-stone-600">{formatNumber(listing.mileage_km)} km</td>
                  <td className="px-4 py-3 text-sm text-stone-600">{listing.location_city}</td>
                  <td className="px-4 py-3"><StatusBadge status={listing.status} /></td>
                  <td className="px-4 py-3 text-sm text-stone-500">{formatDate(listing.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/fahrzeuge/${listing.id}`} className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-lg transition-colors" title="Ansehen">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Bearbeiten">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Pausieren">
                        <Pause className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Löschen">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
