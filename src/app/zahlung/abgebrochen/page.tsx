import Link from 'next/link';
import { XCircle, ArrowLeft, RotateCcw } from 'lucide-react';

export default function ZahlungAbgebrochenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-3xl font-bold text-stone-800 mb-3">Zahlung abgebrochen</h1>
        <p className="text-stone-500 mb-8 leading-relaxed">
          Die Zahlung wurde nicht abgeschlossen. Dein Inserat wurde als Entwurf gespeichert
          und kann jederzeit veröffentlicht werden.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/inserat-erstellen"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Erneut versuchen
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zum Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
