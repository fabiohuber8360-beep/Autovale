'use client';

import { useState, useMemo } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';
import VehicleGrid from '@/components/vehicles/VehicleGrid';
import FilterSidebar from '@/components/vehicles/FilterSidebar';
import { mockListings } from '@/data/mock-listings';
import type { VehicleFilters } from '@/types';

export default function FahrzeugePage() {
  const [filters, setFilters] = useState<VehicleFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<VehicleFilters['sortBy']>('newest');

  const filteredListings = useMemo(() => {
    let results = mockListings.filter((l) => l.status === 'published');

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.make.toLowerCase().includes(q) ||
          l.model.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }

    if (filters.make) results = results.filter((l) => l.make === filters.make);
    if (filters.fuelType) results = results.filter((l) => l.fuel_type === filters.fuelType);
    if (filters.transmission) results = results.filter((l) => l.transmission === filters.transmission);
    if (filters.drivetrain) results = results.filter((l) => l.drivetrain === filters.drivetrain);
    if (filters.bodyType) results = results.filter((l) => l.body_type === filters.bodyType);
    if (filters.priceMin) results = results.filter((l) => l.price_chf >= filters.priceMin!);
    if (filters.priceMax) results = results.filter((l) => l.price_chf <= filters.priceMax!);
    if (filters.mileageMin) results = results.filter((l) => l.mileage_km >= filters.mileageMin!);
    if (filters.mileageMax) results = results.filter((l) => l.mileage_km <= filters.mileageMax!);
    if (filters.yearMin) results = results.filter((l) => l.production_year >= filters.yearMin!);
    if (filters.yearMax) results = results.filter((l) => l.production_year <= filters.yearMax!);

    switch (sortBy) {
      case 'price_asc': results.sort((a, b) => a.price_chf - b.price_chf); break;
      case 'price_desc': results.sort((a, b) => b.price_chf - a.price_chf); break;
      case 'mileage': results.sort((a, b) => a.mileage_km - b.mileage_km); break;
      case 'year': results.sort((a, b) => b.production_year - a.production_year); break;
      default: results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return results;
  }, [filters, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── Hero ── */}
      <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/hero-fahrzeuge.png"
          alt="Fahrzeuge in den Bergen"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />

        {/* Hero Text + Search */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-black text-xs font-semibold uppercase tracking-widest mb-2">Schweizer Importspezialisten</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Fahrzeuge
          </h1>
          <p className="text-white/80 text-sm mb-6 max-w-md">
            Importierte Occasion-Fahrzeuge mit transparenter Dokumentation
          </p>

          {/* Search bar inside hero */}
          <div className="w-full max-w-xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Marke, Modell oder Stichwort suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white/95 backdrop-blur rounded-2xl text-sm placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-orange-500 shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Sort bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-stone-500">
            <span className="font-semibold text-stone-800">{filteredListings.length}</span> Fahrzeuge gefunden
          </p>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as VehicleFilters['sortBy'])}
              className="pl-9 pr-8 py-2 bg-white border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer shadow-sm"
            >
              <option value="newest">Neueste zuerst</option>
              <option value="price_asc">Preis aufsteigend</option>
              <option value="price_desc">Preis absteigend</option>
              <option value="mileage">Kilometer</option>
              <option value="year">Jahrgang</option>
            </select>
          </div>
        </div>

        {/* Filter + Grid */}
        <div className="flex gap-6">
          <FilterSidebar filters={filters} onChange={setFilters} totalResults={filteredListings.length} />
          <div className="flex-1">
            <VehicleGrid listings={filteredListings} />
          </div>
        </div>
      </div>
    </div>
  );
}
