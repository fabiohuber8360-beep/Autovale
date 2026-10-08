import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { height: 28, width: 140 },
  md: { height: 36, width: 180 },
  lg: { height: 48, width: 240 },
};

export default function Logo({ className, variant = 'default', size = 'md' }: LogoProps) {
  const { height, width } = sizeMap[size];
  const src = variant === 'white' ? '/logo-white.png' : '/logo.png';

  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src={src}
        alt="AutoVale"
        width={width}
        height={height}
        className="h-auto"
        style={{ height: `${height}px`, width: 'auto' }}
        priority
        unoptimized
      />
    </div>
  );
}

/**
 * Fallback-Logo als reines SVG+Text, falls das PNG noch nicht vorhanden ist.
 * Wird automatisch im Header/Footer verwendet, wenn /public/logo.png fehlt.
 */
export function LogoFallback({
  className,
  variant = 'default',
  size = 'md',
}: LogoProps) {
  const sizes = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', gap: 'gap-1.5' },
    md: { icon: 'w-9 h-9', text: 'text-xl', gap: 'gap-2' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', gap: 'gap-2.5' },
  };

  const textColor = variant === 'white' ? 'text-white' : 'text-stone-900';
  const s = sizes[size];

  return (
    <div className={cn('flex items-center', s.gap, className)}>
      {/* AV Monogram Icon */}
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={s.icon}
        aria-hidden="true"
      >
        {/* A left leg */}
        <path d="M10 150 L70 10 L90 10 L48 110 Z" fill="#f97316" />
        {/* A right leg */}
        <path d="M48 110 L90 10 L110 10 L80 82 L68 110 Z" fill="#f97316" />
        {/* A crossbar */}
        <path d="M32 105 L62 105 L58 118 L28 118 Z" fill="#f97316" />
        {/* V left leg */}
        <path d="M88 10 L108 10 L130 70 L118 100 Z" fill="#f97316" />
        {/* V right leg */}
        <path d="M108 10 L128 10 L190 150 L170 150 L118 40 Z" fill="#f97316" />
      </svg>
      <span className={cn('font-bold tracking-tight', s.text, textColor)}>
        Auto<span className="text-orange-500">Vale</span>
      </span>
    </div>
  );
}
