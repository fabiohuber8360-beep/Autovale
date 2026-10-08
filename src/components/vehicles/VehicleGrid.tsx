import type { Listing } from '@/types';
import VehicleCard from './VehicleCard';
import EmptyState from '@/components/shared/EmptyState';
import { Car } from 'lucide-react';
import Link from 'next/link';

interface VehicleGridProps {
  listings: Listing[];
  emptyMessage?: string;
}

export default function VehicleGrid({ listings, emptyMessage }: VehicleGridProps) {
  if (listings.length === 0) {
    return (
      <EmptyState
        title="Keine Fahrzeuge gefunden"
        description={emptyMessage || 'Passe deine Suchkriterien an oder schaue später nochmal vorbei.'}
        icon={<Car className="w-8 h-8 text-stone-400" />}
        action={
          <Link
            href="/fahrzeuge"
            className="px-5 py-2.5 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors"
          >
            Alle Fahrzeuge anzeigen
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <VehicleCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
