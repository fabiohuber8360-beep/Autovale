import { cn } from '@/lib/utils';

interface TrustBadgeProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export default function TrustBadge({ icon, label, className }: TrustBadgeProps) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium border border-emerald-100',
      className
    )}>
      {icon}
      {label}
    </div>
  );
}
