'use client';

import { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, ArrowRight, Upload, X, Eye, ShieldCheck, FileText, Battery, Download } from 'lucide-react';
import { MAKES, FUEL_TYPES, TRANSMISSIONS, DRIVETRAINS, BODY_TYPES, EXTERIOR_COLORS, MFK_STATUSES, ACCIDENT_STATUSES, EQUIPMENT_CATEGORIES, WIZARD_STEPS } from '@/lib/constants';
import { cn, formatCHF } from '@/lib/utils';
import Link from 'next/link';

const DEFAULT_LISTING_PRICE = 29;
const CARVERTICAL_PRICE = 10;

export default function InseratErstellenPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [selectedEquipment, setSelectedEquipment] = useState<Set<string>>(new Set());
  const [carVertical, setCarVertical] = useState(false);
  const [published, setPublished] = useState(false);

  const updateField = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleEquipment = (item: string) => {
    setSelectedEquipment((prev) => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const handlePublish = () => {
    // In production: create Stripe Checkout session, then redirect
    setPublished(true);
  };

  if (published) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-3">Inserat veröffentlicht</h1>
          <p className="text-stone-500 mb-6">
            Dein Inserat ist jetzt live und für alle sichtbar. Du kannst es jederzeit bearbeiten oder pausieren.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/fahrzeuge/1"
              className="px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
            >
              Inserat ansehen
            </Link>
            <Link
              href="/dashboard/inserate"
              className="px-6 py-3 bg-stone-100 text-stone-700 font-medium rounded-xl hover:bg-stone-200 transition-colors"
            >
              Meine Inserate
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-stone-800 mb-1">Inserat erstellen</h1>
          <p className="text-sm text-stone-500">Erstelle ein professionelles Inserat für dein importiertes Fahrzeug</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {WIZARD_STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap',
                    step.id === currentStep
                      ? 'bg-orange-500 text-white'
                      : step.id < currentStep
                        ? 'bg-emerald-100 text-emerald-700 cursor-pointer'
                        : 'bg-stone-100 text-stone-400'
                  )}
                >
                  {step.id < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                      {step.id}
                    </span>
                  )}
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
                {i < WIZARD_STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-stone-300 mx-1 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-100 mb-8">
          {/* Step 1: Grunddaten */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-800">Fahrzeug-Grunddaten</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Marke *" type="select" options={MAKES as unknown as string[]} value={formData.make as string} onChange={(v) => updateField('make', v)} />
                <FormField label="Modell *" value={formData.model as string} onChange={(v) => updateField('model', v)} placeholder="z.B. 320d Touring" />
                <FormField label="Variante" value={formData.variant as string} onChange={(v) => updateField('variant', v)} placeholder="z.B. M Sport" />
                <FormField label="Karosserieform *" type="select" options={BODY_TYPES as unknown as string[]} value={formData.body_type as string} onChange={(v) => updateField('body_type', v)} />
                <div className="sm:col-span-2">
                  <FormField label="Inserat-Titel *" value={formData.title as string} onChange={(v) => updateField('title', v)} placeholder="z.B. BMW 320d Touring M Sport" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Technik */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-800">Technische Daten</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Baujahr *" type="number" value={formData.production_year as string} onChange={(v) => updateField('production_year', v)} placeholder="z.B. 2021" />
                <FormField label="Erstzulassung" type="date" value={formData.first_registration as string} onChange={(v) => updateField('first_registration', v)} />
                <FormField label="Kilometerstand *" type="number" value={formData.mileage_km as string} onChange={(v) => updateField('mileage_km', v)} placeholder="z.B. 45000" />
                <FormField label="Leistung (PS) *" type="number" value={formData.power_hp as string} onChange={(v) => updateField('power_hp', v)} placeholder="z.B. 190" />
                <FormField label="Leistung (kW)" type="number" value={formData.power_kw as string} onChange={(v) => updateField('power_kw', v)} placeholder="z.B. 140" />
                <FormField label="Hubraum (ccm)" type="number" value={formData.displacement_ccm as string} onChange={(v) => updateField('displacement_ccm', v)} placeholder="z.B. 1995" />
                <FormField label="Kraftstoff *" type="select" options={FUEL_TYPES as unknown as string[]} value={formData.fuel_type as string} onChange={(v) => updateField('fuel_type', v)} />
                <FormField label="Getriebe *" type="select" options={TRANSMISSIONS as unknown as string[]} value={formData.transmission as string} onChange={(v) => updateField('transmission', v)} />
                <FormField label="Antrieb *" type="select" options={DRIVETRAINS as unknown as string[]} value={formData.drivetrain as string} onChange={(v) => updateField('drivetrain', v)} />
                <FormField label="Farbe aussen *" type="select" options={EXTERIOR_COLORS as unknown as string[]} value={formData.exterior_color as string} onChange={(v) => updateField('exterior_color', v)} />
                <FormField label="Farbe innen" value={formData.interior_color as string} onChange={(v) => updateField('interior_color', v)} placeholder="z.B. Schwarz" />
                <FormField label="Türen" type="number" value={formData.doors as string} onChange={(v) => updateField('doors', v)} placeholder="z.B. 5" />
                <FormField label="Sitze" type="number" value={formData.seats as string} onChange={(v) => updateField('seats', v)} placeholder="z.B. 5" />
                <FormField label="Verbrauch (l/100km)" type="number" value={formData.consumption as string} onChange={(v) => updateField('consumption', v)} placeholder="Optional" />
              </div>
            </div>
          )}

          {/* Step 3: Ausstattung */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-800">Ausstattung</h2>
              <p className="text-sm text-stone-500">Wähle die Ausstattungsmerkmale deines Fahrzeugs aus.</p>
              {Object.entries(EQUIPMENT_CATEGORIES).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-stone-700 mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleEquipment(item)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-sm font-medium transition-all border',
                          selectedEquipment.has(item)
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-orange-300'
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 4: Import & Historie */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-800">Import- & Historieninformationen</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Importland *" value={formData.import_country as string || 'Deutschland'} onChange={(v) => updateField('import_country', v)} placeholder="z.B. Deutschland" />
                <FormField label="Importdatum" type="date" value={formData.import_date as string} onChange={(v) => updateField('import_date', v)} />
                <FormField label="MFK-Status *" type="select" options={MFK_STATUSES as unknown as string[]} value={formData.mfk_status as string} onChange={(v) => updateField('mfk_status', v)} />
                <FormField label="Zoll/MwSt.-Status" value={formData.customs_status as string} onChange={(v) => updateField('customs_status', v)} placeholder="z.B. Verzollt und versteuert" />
                <FormField label="Unfallstatus *" type="select" options={ACCIDENT_STATUSES as unknown as string[]} value={formData.accident_free_status as string} onChange={(v) => updateField('accident_free_status', v)} />
                <FormField label="Vorbesitzer" type="number" value={formData.previous_owners as string} onChange={(v) => updateField('previous_owners', v)} placeholder="z.B. 1" />
                <div className="sm:col-span-2">
                  <FormField label="Servicehistorie" type="textarea" value={formData.service_history as string} onChange={(v) => updateField('service_history', v)} placeholder="z.B. Lückenlos bei BMW Händler" />
                </div>
                <div className="sm:col-span-2">
                  <FormField label="Garantie" value={formData.warranty_text as string} onChange={(v) => updateField('warranty_text', v)} placeholder="z.B. Herstellergarantie bis 03/2025" />
                </div>
                <div className="sm:col-span-2">
                  <FormField label="VIN (Fahrgestellnummer, nur intern)" value={formData.vin_private as string} onChange={(v) => updateField('vin_private', v)} placeholder="Wird nicht öffentlich angezeigt" />
                  <p className="text-xs text-stone-500 mt-1">Die VIN wird nie öffentlich angezeigt. Nur eine maskierte Version ist sichtbar.</p>
                </div>
              </div>

              {/* Dokumente / Berichte */}
              <div className="mt-8 pt-6 border-t border-stone-100">
                <h3 className="text-base font-semibold text-stone-800 mb-1">Fahrzeugberichte</h3>
                <p className="text-sm text-stone-500 mb-4">Lade vorhandene Berichte als PDF hoch. Berichte erhöhen das Vertrauen der Käufer deutlich.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* CarVertical Report */}
                  <div className="border border-stone-200 rounded-xl p-4 hover:border-orange-300 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-800">CarVertical-Bericht</p>
                        <p className="text-xs text-stone-500">Unfallhistorie & Km-Verlauf</p>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100 transition-colors">
                      <Upload className="w-4 h-4 text-stone-500" />
                      <span className="text-sm text-stone-600">
                        {formData.carvertical_report ? 'Datei ausgewählt ✓' : 'PDF hochladen'}
                      </span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          updateField('carvertical_report', file);
                        }}
                      />
                    </label>
                  </div>

                  {/* Aviloo Report */}
                  <div className="border border-stone-200 rounded-xl p-4 hover:border-orange-300 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                        <Battery className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-800">Aviloo-Batteriereport</p>
                        <p className="text-xs text-stone-500">Batteriegesundheit (Elektro/Hybrid)</p>
                      </div>
                    </div>
                    <label className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-lg cursor-pointer hover:bg-stone-100 transition-colors">
                      <Upload className="w-4 h-4 text-stone-500" />
                      <span className="text-sm text-stone-600">
                        {formData.aviloo_report ? 'Datei ausgewählt ✓' : 'PDF hochladen'}
                      </span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          updateField('aviloo_report', file);
                        }}
                      />
                    </label>
                    <p className="text-xs text-stone-400 mt-2">Empfohlen für Elektro- und Hybridfahrzeuge</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Preis & Standort */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-800">Preis & Standort</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Preis CHF *" type="number" value={formData.price_chf as string} onChange={(v) => updateField('price_chf', v)} placeholder="z.B. 34900" />
                <FormField label="Preis EUR (optional)" type="number" value={formData.price_eur as string} onChange={(v) => updateField('price_eur', v)} placeholder="z.B. 33500" />
                <FormField label="Standort (Ort) *" value={formData.location_city as string} onChange={(v) => updateField('location_city', v)} placeholder="z.B. Zürich" />
                <FormField label="PLZ *" value={formData.location_zip as string} onChange={(v) => updateField('location_zip', v)} placeholder="z.B. 8001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Beschreibung *</label>
                <textarea
                  rows={5}
                  placeholder="Beschreibe dein Fahrzeug ausführlich. Was macht es besonders? Wie war der Import?"
                  value={(formData.description as string) || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 6: Bilder */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-800">Bilder hochladen</h2>
              <p className="text-sm text-stone-500">Lade mindestens ein Bild hoch. Das erste Bild wird als Titelbild verwendet.</p>
              <div className="border-2 border-dashed border-stone-200 rounded-2xl p-12 text-center hover:border-orange-300 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-stone-700 mb-1">Bilder hierher ziehen oder klicken</p>
                <p className="text-xs text-stone-500">JPG, PNG oder WebP, max. 10 MB pro Bild</p>
                <input type="file" multiple accept="image/*" className="hidden" />
              </div>
              <p className="text-xs text-stone-500">
                In der Produktivversion werden Bilder direkt in Supabase Storage hochgeladen.
                Für den aktuellen Prototyp ist der Upload vorbereitet.
              </p>
            </div>
          )}

          {/* Step 7: Vorschau */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-800 flex items-center gap-2">
                <Eye className="w-5 h-5 text-orange-500" />
                Vorschau
              </h2>
              <div className="bg-stone-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-stone-800 mb-2">
                  {(formData.title as string) || 'Inserattitel'}
                </h3>
                <p className="text-2xl font-bold text-orange-600 mb-4">
                  {formData.price_chf ? formatCHF(Number(formData.price_chf)) : 'CHF —'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-xs text-stone-500">Kilometer</p>
                    <p className="text-sm font-semibold">{String(formData.mileage_km || '—')} km</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-xs text-stone-500">Baujahr</p>
                    <p className="text-sm font-semibold">{String(formData.production_year || '—')}</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-xs text-stone-500">Leistung</p>
                    <p className="text-sm font-semibold">{String(formData.power_hp || '—')} PS</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-xs text-stone-500">Standort</p>
                    <p className="text-sm font-semibold">{(formData.location_city as string) || '—'}</p>
                  </div>
                </div>
                {selectedEquipment.size > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-stone-700 mb-2">Ausstattung ({selectedEquipment.size})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from(selectedEquipment).map((item) => (
                        <span key={item} className="px-2 py-0.5 bg-white text-stone-600 text-xs rounded-md border border-stone-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-sm text-stone-600 whitespace-pre-line">
                  {(formData.description as string) || 'Keine Beschreibung angegeben.'}
                </p>
              </div>
            </div>
          )}

          {/* Step 8: Veröffentlichen */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-stone-800">Inserat veröffentlichen</h2>

              {/* carVertical Add-on */}
              <div
                onClick={() => setCarVertical(!carVertical)}
                className={`cursor-pointer rounded-2xl border-2 p-5 transition-all ${carVertical ? 'border-orange-500 bg-orange-50' : 'border-stone-200 bg-white hover:border-orange-300'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${carVertical ? 'bg-orange-500' : 'bg-stone-100'}`}>
                    <ShieldCheck className={`w-5 h-5 ${carVertical ? 'text-white' : 'text-stone-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-stone-800">carVertical Fahrzeugbericht hinzufügen</p>
                      <span className="text-sm font-bold text-orange-600">+ CHF {CARVERTICAL_PRICE}.–</span>
                    </div>
                    <p className="text-sm text-stone-500 mb-2">
                      Erhöhe deine Verkaufschancen mit einem offiziellen carVertical-Report. Käufer vertrauen Inseraten mit Fahrzeugbericht deutlich mehr — Unfallhistorie, Kilometerstand-Verlauf, Vorbesitzer.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${carVertical ? 'bg-orange-500 border-orange-500' : 'border-stone-300'}`}>
                        {carVertical && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-xs font-medium text-stone-600">{carVertical ? 'Ausgewählt ✓' : 'Optional hinzufügen'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preisübersicht + CTA */}
              <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100 text-center">
                <div className="mb-4">
                  <p className="text-sm text-stone-500 mb-1">Gesamtbetrag</p>
                  <p className="text-4xl font-bold text-orange-600">
                    {formatCHF(DEFAULT_LISTING_PRICE + (carVertical ? CARVERTICAL_PRICE : 0))}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Inserat {formatCHF(DEFAULT_LISTING_PRICE)}{carVertical ? ` + carVertical ${formatCHF(CARVERTICAL_PRICE)}` : ''}
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-stone-600 text-left max-w-xs mx-auto mb-8">
                  {[
                    'Inserat sofort online',
                    'Sichtbar für alle Besucher',
                    'Kontaktanfragen erhalten',
                    'Jederzeit bearbeitbar',
                    ...(carVertical ? ['carVertical-Report wird automatisch erstellt'] : []),
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handlePublish}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
                >
                  Jetzt bezahlen & veröffentlichen
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs text-stone-500 mt-4">
                  Weiterleitung zu Stripe Checkout. Nach erfolgreicher Zahlung wird dein Inserat automatisch veröffentlicht.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            disabled={currentStep === 1}
            className={cn(
              'flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-colors',
              currentStep === 1
                ? 'text-stone-300 cursor-not-allowed'
                : 'text-stone-700 bg-white border border-stone-200 hover:bg-stone-50'
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            Zurück
          </button>
          {currentStep < 8 && (
            <button
              onClick={() => setCurrentStep((s) => Math.min(8, s + 1))}
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              Weiter
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Form Field Helper ───────────────────────────────────────────────────────

function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  type?: 'text' | 'number' | 'date' | 'select' | 'textarea';
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: string[];
}) {
  const baseClass = 'w-full px-3 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500';

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
      {type === 'select' && options ? (
        <select value={value || ''} onChange={(e) => onChange(e.target.value)} className={`${baseClass} appearance-none bg-white`}>
          <option value="">Bitte wählen</option>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          rows={3}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}
