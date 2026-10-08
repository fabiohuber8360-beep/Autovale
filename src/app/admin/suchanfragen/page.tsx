import { Search, Mail, Phone, Calendar } from 'lucide-react';
import { formatCHF } from '@/lib/utils';

const mockSearchRequests = [
  { id: '1', name: 'Thomas Keller', email: 'thomas@example.ch', phone: '+41 79 123 45 67', make: 'BMW', model: '3er Touring', budget: 40000, max_mileage: 50000, min_year: 2021, status: 'open', created: '18.11.2024' },
  { id: '2', name: 'Lisa Brunner', email: 'lisa@example.ch', phone: null, make: 'Mercedes-Benz', model: 'GLC', budget: 55000, max_mileage: 60000, min_year: 2020, status: 'in_progress', created: '16.11.2024' },
  { id: '3', name: 'Daniel Meier', email: 'daniel@example.ch', phone: '+41 76 987 65 43', make: 'Audi', model: 'A6 Avant', budget: 45000, max_mileage: 40000, min_year: 2022, status: 'open', created: '14.11.2024' },
];

const statusColors: Record<string, string> = {
  open: 'bg-amber-100 text-amber-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-stone-100 text-stone-500',
};
const statusLabels: Record<string, string> = {
  open: 'Offen',
  in_progress: 'In Bearbeitung',
  completed: 'Erledigt',
  cancelled: 'Storniert',
};

export default function AdminSuchanfragenPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 mb-1">Suchanfragen</h1>
        <p className="text-sm text-stone-500">{mockSearchRequests.length} Wunschfahrzeug-Anfragen</p>
      </div>

      <div className="space-y-4">
        {mockSearchRequests.map((req) => (
          <div key={req.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-stone-800">{req.make} {req.model}</h3>
                <p className="text-sm text-stone-500">Budget: {formatCHF(req.budget)} · Max. {req.max_mileage?.toLocaleString('de-CH')} km · Ab {req.min_year}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[req.status]}`}>
                {statusLabels[req.status]}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-stone-600">
              <span className="flex items-center gap-1.5">
                <Search className="w-4 h-4 text-stone-400" />
                {req.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-stone-400" />
                {req.email}
              </span>
              {req.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-stone-400" />
                  {req.phone}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-stone-400" />
                {req.created}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
