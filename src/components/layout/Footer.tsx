import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LogoFallback } from '@/components/shared/Logo';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/">
              <LogoFallback size="md" variant="white" />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              Dein transparenter Zugang zu importierten Fahrzeugen aus Deutschland.
              Klar erklärt. Nachvollziehbar dokumentiert.
            </p>
          </div>

          {/* Plattform */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Plattform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/fahrzeuge" className="text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Fahrzeuge durchsuchen
                </Link>
              </li>
              <li>
                <Link href="/inserat-erstellen" className="text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Inserat erstellen
                </Link>
              </li>
              <li>
                <Link href="/wunschfahrzeug" className="text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Wunschfahrzeug finden
                </Link>
              </li>
              <li>
                <Link href="/auth/registrieren" className="text-sm text-stone-400 hover:text-orange-400 transition-colors">
                  Registrieren
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Information</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-stone-400">So funktioniert AutoVale</span>
              </li>
              <li>
                <span className="text-sm text-stone-400">Fahrzeugimport erklärt</span>
              </li>
              <li>
                <span className="text-sm text-stone-400">Häufige Fragen</span>
              </li>
              <li>
                <span className="text-sm text-stone-400">Für Händler</span>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-sm text-stone-400">info@autovale.ch</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-sm text-stone-400">+41 44 000 00 00</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-400">Zürich, Schweiz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              &copy; {new Date().getFullYear()} AutoVale. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-stone-500 hover:text-stone-400 cursor-pointer transition-colors">
                Datenschutz
              </span>
              <span className="text-xs text-stone-500 hover:text-stone-400 cursor-pointer transition-colors">
                AGB
              </span>
              <span className="text-xs text-stone-500 hover:text-stone-400 cursor-pointer transition-colors">
                Impressum
              </span>
            </div>
          </div>
          <p className="mt-4 text-xs text-stone-600 text-center sm:text-left">
            AutoVale schafft Transparenz beim Kauf importierter Fahrzeuge, ersetzt jedoch keine eigene Prüfung.
            Alle Fahrzeugdaten stammen von den jeweiligen Inserenten.
          </p>
        </div>
      </div>
    </footer>
  );
}
