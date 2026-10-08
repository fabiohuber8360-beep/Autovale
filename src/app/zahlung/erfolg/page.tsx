import Link from 'next/link';
import { CheckCircle, Eye, Edit, ArrowRight } from 'lucide-react';

export default function ZahlungErfolgPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-stone-800 mb-3">Zahlung erfolgreich</h1>
        <p className="text-stone-500 mb-8 leading-relaxed">
          Dein Inserat wurde bezahlt und ist jetzt live auf AutoVale.
          Käufer können dein Fahrzeug ab sofort finden und dich kontaktieren.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/fahrzeuge"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            <Eye className="w-4 h-4" />
            Inserat ansehen
          </Link>
          <Link
            href="/dashboard/inserate"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Inserat bearbeiten
          </Link>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 mt-6 text-sm text-stone-500 hover:text-orange-600 transition-colors"
        >
          Zurück zur Startseite
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
