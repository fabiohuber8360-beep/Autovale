import { SearchX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-4">
        {icon || <SearchX className="w-8 h-8 text-stone-400" />}
      </div>
      <h3 className="text-lg font-semibold text-stone-800 mb-2">{title}</h3>
      <p className="text-sm text-stone-500 max-w-md mb-6">{description}</p>
      {action}
    </div>
  );
}
