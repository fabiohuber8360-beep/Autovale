'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { MAKES, FUEL_TYPES, TRANSMISSIONS, DRIVETRAINS, BODY_TYPES } from '@/lib/constants';
import type { VehicleFilters } from '@/types';

interface FilterSidebarProps {
  filters: VehicleFilters;
  onChange: (filters: VehicleFilters) => void;
  totalResults: number;
}

export default function FilterSidebar({ filters, onChange, totalResults }: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateFilter = (key: keyof VehicleFilters, value: unknown) => {
    onChange({ ...filters, [key]: value || undefined });
  };

  const resetFilters = () => onChange({});

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== '');

  const inputCls = "w-full px-2 py-1.5 bg-white border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none";
  const selectCls = "w-full px-2 py-1.5 bg-white border border-stone-200 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none appearance-none cursor-pointer";
  const labelCls = "block text-xs font-medium text-stone-600 mb-1";

  const filterContent = (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-stone-100">
        <h3 className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Filter</h3>
        {hasActiveFilters && (
          <button onClick={resetFilters} className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-medium">
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Marke */}
      <div>
        <label className={labelCls}>Marke</label>
        <select value={filters.make || ''} onChange={(e) => updateFilter('make', e.target.value)} className={selectCls}>
          <option value="">Alle</option>
          {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Preis */}
      <div>
        <label className={labelCls}>Preis (CHF)</label>
        <div className="flex gap-1.5">
          <input type="number" placeholder="Von" value={filters.priceMin || ''} onChange={(e) => updateFilter('priceMin', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
          <input type="number" placeholder="Bis" value={filters.priceMax || ''} onChange={(e) => updateFilter('priceMax', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
        </div>
      </div>

      {/* Kilometer */}
      <div>
        <label className={labelCls}>Kilometer</label>
        <div className="flex gap-1.5">
          <input type="number" placeholder="Von" value={filters.mileageMin || ''} onChange={(e) => updateFilter('mileageMin', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
          <input type="number" placeholder="Bis" value={filters.mileageMax || ''} onChange={(e) => updateFilter('mileageMax', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
        </div>
      </div>

      {/* Jahrgang */}
      <div>
        <label className={labelCls}>Jahrgang</label>
        <div className="flex gap-1.5">
          <input type="number" placeholder="Von" value={filters.yearMin || ''} onChange={(e) => updateFilter('yearMin', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
          <input type="number" placeholder="Bis" value={filters.yearMax || ''} onChange={(e) => updateFilter('yearMax', e.target.value ? Number(e.target.value) : undefined)} className={inputCls} />
        </div>
      </div>

      {/* Kraftstoff */}
      <div>
        <label className={labelCls}>Kraftstoff</label>
        <select value={filters.fuelType || ''} onChange={(e) => updateFilter('fuelType', e.target.value)} className={selectCls}>
          <option value="">Alle</option>
          {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      {/* Getriebe */}
      <div>
        <label className={labelCls}>Getriebe</label>
        <select value={filters.transmission || ''} onChange={(e) => updateFilter('transmission', e.target.value)} className={selectCls}>
          <option value="">Alle</option>
          {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Antrieb */}
      <div>
        <label className={labelCls}>Antrieb</label>
        <select value={filters.drivetrain || ''} onChange={(e) => updateFilter('drivetrain', e.target.value)} className={selectCls}>
          <option value="">Alle</option>
          {DRIVETRAINS.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Karosserieform */}
      <div>
        <label className={labelCls}>Karosserieform</label>
        <select value={filters.bodyType || ''} onChange={(e) => updateFilter('bodyType', e.target.value)} className={selectCls}>
          <option value="">Alle</option>
          {BODY_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Ergebnisse */}
      <div className="pt-2 border-t border-stone-100">
        <p className="text-xs text-stone-500">
          <span className="font-semibold text-stone-700">{totalResults}</span> Fahrzeuge
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-700 hover:border-orange-300 transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filter
        {hasActiveFilters && (
          <span className="w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">!</span>
        )}
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-stone-800">Filter</h2>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 hover:bg-stone-100 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {filterContent}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-52 shrink-0">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 sticky top-24">
          {filterContent}
        </div>
      </aside>
    </>
  );
}
