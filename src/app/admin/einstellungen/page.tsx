'use client';

import { useState } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';

export default function AdminEinstellungenPage() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    listing_price: '29',
    featured_price: '49',
    contact_email: 'info@autovale.ch',
    contact_phone: '+41 44 000 00 00',
    max_images_per_listing: '20',
    listing_duration_days: '90',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-800 mb-1">Einstellungen</h1>
        <p className="text-sm text-stone-500">Plattform-Konfiguration</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 space-y-6">
        <h2 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-orange-500" />
          Preise & Gebühren
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Inseratspreis (CHF)</label>
            <input
              type="number"
              value={settings.listing_price}
              onChange={(e) => setSettings({ ...settings, listing_price: e.target.value })}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Featured-Preis (CHF)</label>
            <input
              type="number"
              value={settings.featured_price}
              onChange={(e) => setSettings({ ...settings, featured_price: e.target.value })}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Max. Bilder pro Inserat</label>
            <input
              type="number"
              value={settings.max_images_per_listing}
              onChange={(e) => setSettings({ ...settings, max_images_per_listing: e.target.value })}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Inserat-Laufzeit (Tage)</label>
            <input
              type="number"
              value={settings.listing_duration_days}
              onChange={(e) => setSettings({ ...settings, listing_duration_days: e.target.value })}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-stone-800 pt-4">Kontaktdaten</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Kontakt-E-Mail</label>
            <input
              type="email"
              value={settings.contact_email}
              onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Kontakt-Telefon</label>
            <input
              type="tel"
              value={settings.contact_phone}
              onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            Speichern
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-sm text-emerald-600">
              <CheckCircle className="w-4 h-4" />
              Gespeichert
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
