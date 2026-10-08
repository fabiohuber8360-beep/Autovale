import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCHF(amount: number): string {
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('de-CH').format(num);
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('de-CH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateStr));
}

export function formatMonthYear(dateStr: string): string {
  return new Intl.DateTimeFormat('de-CH', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(dateStr));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function maskVIN(vin: string): string {
  if (!vin || vin.length < 6) return '***';
  return vin.slice(0, 3) + '*'.repeat(vin.length - 6) + vin.slice(-3);
}

export function getListingStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: 'Entwurf',
    pending_payment: 'Zahlung ausstehend',
    published: 'Veröffentlicht',
    paused: 'Pausiert',
    sold: 'Verkauft',
    rejected: 'Abgelehnt',
    archived: 'Archiviert',
  };
  return labels[status] || status;
}

export function getListingStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: 'bg-stone-100 text-stone-700',
    pending_payment: 'bg-amber-100 text-amber-700',
    published: 'bg-emerald-100 text-emerald-700',
    paused: 'bg-blue-100 text-blue-700',
    sold: 'bg-purple-100 text-purple-700',
    rejected: 'bg-red-100 text-red-700',
    archived: 'bg-stone-100 text-stone-500',
  };
  return colors[status] || 'bg-stone-100 text-stone-700';
}
