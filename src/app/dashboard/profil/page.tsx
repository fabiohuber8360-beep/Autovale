'use client';

import { useState } from 'react';
import { User, Save, CheckCircle } from 'lucide-react';

export default function DashboardProfilPage() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Max Müller',
    email: 'max@example.ch',
    phone: '+41 79 123 45 67',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-stone-800">Mein Profil</h1>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-100">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <div>
            <p className="text-lg font-semibold text-stone-800">{profile.name}</p>
            <p className="text-sm text-stone-500">{profile.email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">E-Mail</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm bg-stone-50 text-stone-500"
            />
            <p className="text-xs text-stone-500 mt-1">E-Mail kann nicht geändert werden</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Telefon</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
            >
              <Save className="w-4 h-4" />
              Speichern
            </button>
            {saved && (
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <CheckCircle className="w-4 h-4" /> Gespeichert
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
