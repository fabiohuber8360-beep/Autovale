import { cn } from '@/lib/utils';
import { getListingStatusLabel, getListingStatusColor } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        getListingStatusColor(status),
        className
      )}
    >
      {getListingStatusLabel(status)}
    </span>
  );
}
