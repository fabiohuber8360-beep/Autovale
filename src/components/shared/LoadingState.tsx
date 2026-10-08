import { cn } from '@/lib/utils';

interface LoadingStateProps {
  text?: string;
  className?: string;
}

export default function LoadingState({ text = 'Wird geladen...', className }: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16', className)}>
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-stone-200" />
        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-stone-500">{text}</p>
    </div>
  );
}
