import { cn } from '@/lib/utils';

interface KPIBoxProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export default function KPIBox({ label, value, icon, trend, className }: KPIBoxProps) {
  return (
    <div className={cn(
      'bg-white rounded-2xl p-5 shadow-sm border border-stone-100 hover:shadow-md transition-shadow',
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-stone-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-stone-800">{value}</p>
          {trend && (
            <p className="text-xs text-emerald-600 mt-1 font-medium">{trend}</p>
          )}
        </div>
        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}
