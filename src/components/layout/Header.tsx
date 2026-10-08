'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Car, Plus, Search, User, LogIn, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoFallback } from '@/components/shared/Logo';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Startseite', href: '/', icon: Home },
    { label: 'Fahrzeuge', href: '/fahrzeuge', icon: Car },
    { label: 'Wunschfahrzeug', href: '/wunschfahrzeug', icon: Search },
    { label: 'Inserat erstellen', href: '/inserat-erstellen', icon: Plus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="group">
            <LogoFallback size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-stone-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:text-orange-600 rounded-xl hover:bg-orange-50 transition-all"
            >
              <LogIn className="w-4 h-4" />
              Anmelden
            </Link>
            <Link
              href="/inserat-erstellen"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Inserieren
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
            aria-label="Menü öffnen"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-96 border-t border-stone-100' : 'max-h-0'
        )}
      >
        <div className="px-4 py-4 space-y-1 bg-white">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <hr className="my-2 border-stone-100" />
          <Link
            href="/auth/login"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Anmelden</span>
          </Link>
          <Link
            href="/inserat-erstellen"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 mt-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl"
          >
            <Plus className="w-5 h-5" />
            Inserat erstellen
          </Link>
        </div>
      </div>
    </header>
  );
}
