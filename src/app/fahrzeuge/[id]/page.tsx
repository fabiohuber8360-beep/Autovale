'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Calendar, Gauge, Zap, Fuel, Settings, Globe, MapPin,
  ShieldCheck, FileText, User, ChevronLeft, ChevronRight,
  CheckCircle, Car, Send, Eye, Battery, Download
} from 'lucide-react';
import { mockListings } from '@/data/mock-listings';
import { formatCHF, formatNumber, formatDate } from '@/lib/utils';

export default function FahrzeugDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const listing = mockListings.find((l) => l.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryType,  setInquiryType]  = useState<'question' | 'viewing'>('question');
  const [inquirySent,  setInquirySent]  = useState(false);
  const [inquiryName,  setInquiryName]  = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg,   setInquiryMsg]   = useState('');
  const [inquiryErr,   setInquiryErr]   = useState<string | null>(null);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Car className="w-16 h-16 text-stone-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Fahrzeug nicht gefunden</h1>
        <p className="text-stone-500 mb-6">Dieses Inserat existiert nicht oder wurde entfernt.</p>
        <Link href="/fahrzeuge" className="text-orange-600 font-medium hover:text-orange-700">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  const images = listing.images || [];
  const equipmentByCategory = (listing.equipment || []).reduce(
    (acc, eq) => {
      if (!acc[eq.category]) acc[eq.category] = [];
      acc[eq.category].push(eq.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryErr(null);
    setInquiryLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listing_id:   listing!.id,
          name:         inquiryName,
          email:        inquiryEmail,
          phone:        inquiryPhone || null,
          message:      inquiryMsg,
          inquiry_type: inquiryType,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Fehler beim Senden');
      }
      setInquirySent(true);
    } catch (err) {
      setInquiryErr(err instanceof Error ? err.message : 'Fehler beim Senden');
    } finally {
      setInquiryLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/fahrzeuge" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-orange-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Übersicht
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Images + Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
              <div className="relative aspect-[16/10] bg-stone-100">
                {images.length > 0 ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${images[currentImageIndex]?.url})` }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200">
                    <Car className="w-20 h-20 text-stone-300" />
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Title & Price (Mobile) */}
            <div className="lg:hidden">
              <h1 className="text-2xl font-bold text-stone-800 mb-2">{listing.title}</h1>
              <p className="text-3xl font-bold text-orange-600 mb-4">{formatCHF(listing.price_chf)}</p>
              {listing.price_eur && (
                <p className="text-sm text-stone-500">ca. EUR {formatNumber(listing.price_eur)}</p>
              )}
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Gauge, label: 'Kilometer', value: `${formatNumber(listing.mileage_km)} km` },
                { icon: Calendar, label: 'Erstzulassung', value: listing.first_registration ? formatDate(listing.first_registration) : String(listing.production_year) },
                { icon: Zap, label: 'Leistung', value: `${listing.power_hp} PS` },
                { icon: Fuel, label: 'Kraftstoff', value: listing.fuel_type },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 text-center">
                  <Icon className="w-5 h-5 text-orange-500 mx-auto mb-2" />
                  <p className="text-xs text-stone-500 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-stone-800">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <h2 className="text-lg font-semibold text-stone-800 mb-4">Beschreibung</h2>
              <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{listing.description}</p>
            </div>

            {/* Technical Data */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <h2 className="text-lg font-semibold text-stone-800 mb-4">Technische Daten</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  { label: 'Marke', value: listing.make },
                  { label: 'Modell', value: listing.model },
                  { label: 'Variante', value: listing.variant },
                  { label: 'Baujahr', value: listing.production_year },
                  { label: 'Leistung', value: listing.power_hp ? `${listing.power_hp} PS (${listing.power_kw} kW)` : null },
                  { label: 'Hubraum', value: listing.displacement_ccm ? `${formatNumber(listing.displacement_ccm)} ccm` : null },
                  { label: 'Kraftstoff', value: listing.fuel_type },
                  { label: 'Getriebe', value: listing.transmission },
                  { label: 'Antrieb', value: listing.drivetrain },
                  { label: 'Karosserieform', value: listing.body_type },
                  { label: 'Farbe aussen', value: listing.exterior_color },
                  { label: 'Farbe innen', value: listing.interior_color },
                  { label: 'Türen', value: listing.doors },
                  { label: 'Sitze', value: listing.seats },
                  { label: 'Verbrauch', value: listing.consumption_l100km ? `${listing.consumption_l100km} l/100km` : null },
                  { label: 'CO₂-Emissionen', value: listing.co2_gkm ? `${listing.co2_gkm} g/km` : null },
                ]
                  .filter(({ value }) => value != null)
                  .map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b border-stone-50">
                      <span className="text-sm text-stone-500">{label}</span>
                      <span className="text-sm font-medium text-stone-800">{value}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Equipment */}
            {Object.keys(equipmentByCategory).length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h2 className="text-lg font-semibold text-stone-800 mb-4">Ausstattung</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {Object.entries(equipmentByCategory).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="text-sm font-semibold text-stone-700 mb-2">{category}</h3>
                      <div className="space-y-1.5">
                        {items.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-stone-600">
                            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Import Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
              <h2 className="text-lg font-semibold text-stone-800 mb-4">Import & Historie</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {[
                  { label: 'Importland', value: listing.import_country },
                  { label: 'Importdatum', value: listing.import_date ? formatDate(listing.import_date) : null },
                  { label: 'MFK-Status', value: listing.mfk_status },
                  { label: 'Zoll/MwSt.', value: listing.customs_status },
                  { label: 'Unfallstatus', value: listing.accident_free_status },
                  { label: 'Vorbesitzer', value: listing.previous_owners },
                  { label: 'Servicehistorie', value: listing.service_history },
                  { label: 'Garantie', value: listing.warranty_text },
                  { label: 'VIN (maskiert)', value: listing.vin_masked },
                ]
                  .filter(({ value }) => value != null)
                  .map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b border-stone-50">
                      <span className="text-sm text-stone-500">{label}</span>
                      <span className="text-sm font-medium text-stone-800">{value}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Fahrzeugberichte */}
            {(listing.carvertical_report_url || listing.aviloo_report_url) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h2 className="text-lg font-semibold text-stone-800 mb-4">Fahrzeugberichte</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {listing.carvertical_report_url && (
                    <a
                      href={listing.carvertical_report_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-800">CarVertical-Bericht</p>
                        <p className="text-xs text-stone-500">Unfallhistorie, Kilometerstand-Verlauf, Vorbesitzer</p>
                      </div>
                      <Download className="w-5 h-5 text-blue-500 group-hover:text-blue-700 shrink-0 transition-colors" />
                    </a>
                  )}
                  {listing.aviloo_report_url && (
                    <a
                      href={listing.aviloo_report_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                        <Battery className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-800">Aviloo-Batteriereport</p>
                        <p className="text-xs text-stone-500">Zertifizierte Analyse der Batteriegesundheit</p>
                      </div>
                      <Download className="w-5 h-5 text-emerald-500 group-hover:text-emerald-700 shrink-0 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Trust Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-semibold text-emerald-800">Vertrauenshinweise</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: Globe, text: 'Import transparent dokumentiert' },
                  { icon: FileText, text: 'Fahrzeugdaten nachvollziehbar' },
                  { icon: User, text: 'Anbieterinformationen sichtbar' },
                  ...(listing.carvertical_report_url ? [{ icon: FileText, text: 'CarVertical-Bericht vorhanden' }] : []),
                  ...(listing.aviloo_report_url ? [{ icon: Battery, text: 'Aviloo-Batteriereport vorhanden' }] : [{ icon: Eye, text: 'Optionaler Historienbericht verfügbar' }]),
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-emerald-700">
                    <Icon className="w-4 h-4 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
              <p className="text-xs text-emerald-600/70 mt-4">
                AutoVale schafft Transparenz, ersetzt aber keine eigene Prüfung.
                Fahrzeugdaten stammen vom Inserenten.
              </p>
            </div>
          </div>

          {/* Right Column: Price, Seller, Contact */}
          <div className="space-y-6">
            {/* Price Card (Desktop) */}
            <div className="hidden lg:block bg-white rounded-2xl p-6 shadow-sm border border-stone-100 sticky top-24">
              <h1 className="text-xl font-bold text-stone-800 mb-3">{listing.title}</h1>
              <p className="text-3xl font-bold text-orange-600 mb-1">{formatCHF(listing.price_chf)}</p>
              {listing.price_eur && (
                <p className="text-sm text-stone-500 mb-6">ca. EUR {formatNumber(listing.price_eur)}</p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {listing.import_country === 'Deutschland' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                    <Globe className="w-3.5 h-3.5" />
                    Deutschlandimport
                  </span>
                )}
                {listing.accident_free_status === 'Unfallfrei' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Unfallfrei
                  </span>
                )}
                {listing.mfk_status === 'Neu vorgeführt' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg">
                    <CheckCircle className="w-3.5 h-3.5" />
                    MFK bestanden
                  </span>
                )}
                {listing.carvertical_report_url && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                    <FileText className="w-3.5 h-3.5" />
                    CarVertical
                  </span>
                )}
                {listing.aviloo_report_url && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg">
                    <Battery className="w-3.5 h-3.5" />
                    Aviloo
                  </span>
                )}
              </div>

              {/* Key Data */}
              <div className="space-y-2.5 mb-6">
                {[
                  { icon: Gauge, text: `${formatNumber(listing.mileage_km)} km` },
                  { icon: Calendar, text: `EZ ${listing.first_registration ? formatDate(listing.first_registration) : listing.production_year}` },
                  { icon: Settings, text: `${listing.transmission} · ${listing.fuel_type}` },
                  { icon: MapPin, text: `${listing.location_city}, ${listing.location_country}` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-stone-600">
                    <Icon className="w-4 h-4 text-stone-400 shrink-0" />
                    {text}
                  </div>
                ))}
              </div>

              {/* Seller Info */}
              <div className="p-4 bg-stone-50 rounded-xl mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">
                      {listing.dealer_id ? 'Händler' : 'Privater Verkäufer'}
                    </p>
                    <p className="text-xs text-stone-500">
                      Standort: {listing.location_city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              {inquirySent ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-stone-800 mb-1">Anfrage gesendet</p>
                  <p className="text-xs text-stone-500">Der Verkäufer wird sich bei dir melden.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setInquiryType('question')}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                        inquiryType === 'question' ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                      Anfrage senden
                    </button>
                    <button type="button" onClick={() => setInquiryType('viewing')}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${
                        inquiryType === 'viewing' ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}>
                      Besichtigung
                    </button>
                  </div>
                  {inquiryErr && (
                    <div className="px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">{inquiryErr}</div>
                  )}
                  <input type="text" placeholder="Name" required value={inquiryName}
                    onChange={e => setInquiryName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  <input type="email" placeholder="E-Mail" required value={inquiryEmail}
                    onChange={e => setInquiryEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  <input type="tel" placeholder="Telefon (optional)" value={inquiryPhone}
                    onChange={e => setInquiryPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  <textarea placeholder={inquiryType === 'viewing' ? 'Wann möchten Sie das Fahrzeug besichtigen?' : 'Ihre Nachricht...'}
                    rows={3} required value={inquiryMsg} onChange={e => setInquiryMsg(e.target.value)}
                    className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
                  <button type="submit" disabled={inquiryLoading}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm disabled:opacity-60">
                    <Send className="w-4 h-4" />
                    {inquiryLoading ? 'Senden…' : inquiryType === 'viewing' ? 'Besichtigung anfragen' : 'Anfrage senden'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
