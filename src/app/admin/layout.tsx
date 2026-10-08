'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Car, Users, Store, Search, CreditCard,
  Settings, Shield, ChevronLeft, ArrowDownToLine
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNav = [
  { label: 'Übersicht', href: '/admin', icon: LayoutDashboard },
  { label: 'Inserate', href: '/admin/inserate', icon: Car },
  { label: 'Nutzer', href: '/admin/nutzer', icon: Users },
  { label: 'Händler', href: '/admin/haendler', icon: Store },
  { label: 'Suchanfragen', href: '/admin/suchanfragen', icon: Search },
  { label: 'Zahlungen', href: '/admin/zahlungen', icon: CreditCard },
  { label: 'AutoHub Importe', href: '/admin/importe', icon: ArrowDownToLine },
  { label: 'Einstellungen', href: '/admin/einstellungen', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-stone-200 flex-col fixed top-16 bottom-0 left-0 z-40">
          <div className="p-4 border-b border-stone-100">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
              <Shield className="w-4 h-4 text-orange-500" />
              Admin Dashboard
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {adminNav.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-orange-50 text-orange-700'
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-800'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-stone-100">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-sm text-stone-500 hover:text-stone-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Zurück zur Webseite
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 lg:ml-64">
          {/* Mobile Nav */}
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-3 overflow-x-auto">
            <div className="flex gap-1">
              {adminNav.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
                      isActive ? 'bg-orange-50 text-orange-700' : 'text-stone-500 hover:bg-stone-50'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
