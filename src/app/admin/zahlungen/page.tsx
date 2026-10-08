import { CreditCard, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { formatCHF } from '@/lib/utils';

const mockPayments = [
  { id: '1', listing: 'BMW 320d Touring M Sport', user: 'Max Müller', amount: 29, status: 'paid', date: '15.11.2024' },
  { id: '2', listing: 'Mercedes-Benz C 200', user: 'Anna Schmidt', amount: 29, status: 'paid', date: '10.11.2024' },
  { id: '3', listing: 'Audi A4 Avant', user: 'AutoZentrum Zürich', amount: 49, status: 'paid', date: '08.11.2024' },
  { id: '4', listing: 'VW Golf GTI', user: 'Peter Weber', amount: 29, status: 'paid', date: '07.11.2024' },
  { id: '5', listing: 'Porsche Macan S', user: 'AutoZentrum Zürich', amount: 49, status: 'paid', date: '05.11.2024' },
];

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  paid: { icon: CheckCircle, color: 'text-emerald-500', label: 'Bezahlt' },
  pending: { icon: Clock, color: 'text-amber-500', label: 'Ausstehend' },
  failed: { icon: AlertCircle, color: 'text-red-500', label: 'Fehlgeschlagen' },
};

export default function AdminZahlungenPage() {
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800 mb-1">Zahlungen</h1>
          <p className="text-sm text-stone-500">{mockPayments.length} Zahlungen · Gesamtumsatz: {formatCHF(totalRevenue)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Inserat</th>
              <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Nutzer</th>
              <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Betrag</th>
              <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Datum</th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((payment) => {
              const cfg = statusConfig[payment.status] || statusConfig.pending;
              const Icon = cfg.icon;
              return (
                <tr key={payment.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-stone-800">{payment.listing}</td>
                  <td className="px-4 py-3 text-sm text-stone-600">{payment.user}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-stone-800">{formatCHF(payment.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-sm ${cfg.color}`}>
                      <Icon className="w-4 h-4" />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-500">{payment.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
