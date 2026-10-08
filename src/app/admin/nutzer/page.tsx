import { Users, Shield, Store, User } from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Max Müller', email: 'max@example.ch', role: 'seller', created: '15.11.2024' },
  { id: '2', name: 'Anna Schmidt', email: 'anna@example.ch', role: 'seller', created: '12.11.2024' },
  { id: '3', name: 'AutoZentrum Zürich', email: 'info@autozentrum.ch', role: 'dealer', created: '10.11.2024' },
  { id: '4', name: 'Peter Weber', email: 'peter@example.ch', role: 'seller', created: '08.11.2024' },
  { id: '5', name: 'Fabio Huber', email: 'admin@autovale.ch', role: 'admin', created: '01.10.2024' },
];

const roleIcons: Record<string, typeof User> = { admin: Shield, dealer: Store, seller: User };
const roleLabels: Record<string, string> = { admin: 'Admin', dealer: 'Händler', seller: 'Verkäufer', guest: 'Gast' };
const roleColors: Record<string, string> = { admin: 'bg-red-100 text-red-700', dealer: 'bg-blue-100 text-blue-700', seller: 'bg-stone-100 text-stone-700' };

export default function AdminNutzerPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 mb-1">Nutzer verwalten</h1>
        <p className="text-sm text-stone-500">{mockUsers.length} registrierte Nutzer</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Name</th>
              <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">E-Mail</th>
              <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Rolle</th>
              <th className="text-left text-xs font-semibold text-stone-500 uppercase px-4 py-3">Registriert</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => {
              const Icon = roleIcons[user.role] || User;
              return (
                <tr key={user.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Icon className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-sm font-medium text-stone-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-600">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-stone-500">{user.created}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
