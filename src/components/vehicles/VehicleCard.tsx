import Link from 'next/link';
import { MapPin, Calendar, Gauge, Zap, ShieldCheck, Globe, FileText, Battery } from 'lucide-react';
import { formatCHF, formatNumber } from '@/lib/utils';
import type { Listing } from '@/types';

interface VehicleCardProps {
  listing: Listing;
}

export default function VehicleCard({ listing }: VehicleCardProps) {
  const coverImage = listing.images?.find((img) => img.is_cover)?.url || listing.images?.[0]?.url;

  return (
    <Link href={`/fahrzeuge/${listing.id}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-lg hover:border-orange-200/50 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
          {coverImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(${coverImage})` }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
              <Gauge className="w-12 h-12 text-stone-300" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {listing.import_country === 'Deutschland' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/90 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
                <Globe className="w-3 h-3" />
                DE-Import
              </span>
            )}
            {listing.accident_free_status === 'Unfallfrei' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-600/90 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
                <ShieldCheck className="w-3 h-3" />
                Unfallfrei
              </span>
            )}
          </div>

          {listing.featured && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2 py-1 bg-orange-500/90 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                Empfohlen
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="text-base font-semibold text-stone-800 group-hover:text-orange-600 transition-colors line-clamp-1">
              {listing.title}
            </h3>
          </div>

          <p className="text-xl font-bold text-orange-600 mb-3">
            {formatCHF(listing.price_chf)}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-1.5 text-sm text-stone-500">
              <Gauge className="w-3.5 h-3.5 text-stone-400" />
              <span>{formatNumber(listing.mileage_km)} km</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-stone-500">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>EZ {listing.first_registration ? new Date(listing.first_registration).getFullYear() + '/' + String(new Date(listing.first_registration).getMonth() + 1).padStart(2, '0') : listing.production_year}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-stone-500">
              <Zap className="w-3.5 h-3.5 text-stone-400" />
              <span>{listing.power_hp} PS</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-stone-500">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{listing.location_city}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded-md">{listing.fuel_type}</span>
            <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded-md">{listing.transmission}</span>
            {listing.drivetrain === 'Allrad' && (
              <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-xs rounded-md">4x4</span>
            )}
            {listing.carvertical_report_url && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-md">
                <FileText className="w-3 h-3" />
                CarVertical
              </span>
            )}
            {listing.aviloo_report_url && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-md">
                <Battery className="w-3 h-3" />
                Aviloo
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
