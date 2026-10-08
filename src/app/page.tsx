import Link from 'next/link';
import Image from 'next/image';
import {
  Search, Plus, Car, ShieldCheck, FileText, Globe,
  ArrowRight, CheckCircle, Eye, Star, Users
} from 'lucide-react';
import VehicleCard from '@/components/vehicles/VehicleCard';
import { mockListings } from '@/data/mock-listings';

export default function HomePage() {
  const featuredListings = mockListings.filter((l) => l.featured).slice(0, 3);

  return (
    <div>
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-stone-900 text-white">
        {/* Hero background image */}
        <Image
          src="/hero-fahrzeuge.png"
          alt="AutoVale Hero"
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/50 to-stone-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 border border-orange-400/30 rounded-full text-sm text-orange-300 mb-6">
              <Globe className="w-4 h-4" />
              Schweizer Plattform für importierte Fahrzeuge
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Importierte Fahrzeuge.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                Klar erklärt.
              </span>{' '}
              Sicher gekauft.
            </h1>

            <p className="text-lg sm:text-xl text-stone-300 mb-10 max-w-2xl leading-relaxed">
              AutoVale macht den Kauf importierter Fahrzeuge aus Deutschland transparent und verständlich.
              Nachvollziehbare Historie, klare Importdaten und vertrauenswürdige Anbieter.
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/10 mb-8">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Marke, Modell oder Stichwort..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white text-stone-800 rounded-xl text-sm placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <Link
                  href="/fahrzeuge"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
                >
                  <Search className="w-4 h-4" />
                  Suchen
                </Link>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/fahrzeuge"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-all"
              >
                <Car className="w-4 h-4" />
                Fahrzeuge entdecken
              </Link>
              <Link
                href="/inserat-erstellen"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Inserat erstellen
              </Link>
              <Link
                href="/wunschfahrzeug"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-all"
              >
                <Star className="w-4 h-4" />
                Wunschfahrzeug finden
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust Badges ─────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, label: 'Geprüfte Inserate', desc: 'Transparente Fahrzeugdaten' },
              { icon: FileText, label: 'Klare Historie', desc: 'Import dokumentiert' },
              { icon: Globe, label: 'DE-Import Fokus', desc: 'Spezialisiert auf Deutschland' },
              { icon: Eye, label: 'Volle Transparenz', desc: 'Alle Daten nachvollziehbar' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800">{label}</p>
                  <p className="text-xs text-stone-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Warum AutoVale ───────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4">
              Warum AutoVale?
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Importierte Fahrzeuge aus Deutschland können deutlich günstiger sein.
              AutoVale sorgt dafür, dass du dabei den Überblick behältst.
            </p>
          </div>

          {/* CarVertical Banner */}
          <div className="mb-10 bg-gradient-to-r from-stone-900 to-stone-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 shadow-md">
            <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-1">Mehr Vertrauen · Mehr Verkaufschancen</p>
              <h3 className="text-white text-lg font-bold mb-1">carVertical Fahrzeugbericht zum Inserat hinzufügen</h3>
              <p className="text-stone-400 text-sm">
                Erhöhe deine Verkaufschancen mit einem offiziellen carVertical-Report — mit Unfallhistorie, Kilometerstand-Verlauf und Vorbesitzern. Käufer vertrauen Inseraten mit Fahrzeugbericht deutlich mehr.
              </p>
            </div>
            <div className="shrink-0 sm:ml-auto text-center">
              <span className="inline-block px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-xl whitespace-nowrap shadow">
                Nur CHF 10.–
              </span>
              <p className="text-stone-500 text-xs mt-1.5">optional beim Inserieren</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Transparenz statt Unsicherheit',
                desc: 'Jedes Inserat zeigt klar, woher das Fahrzeug stammt, welche Importschritte durchlaufen wurden und ob die MFK bestanden ist.',
              },
              {
                icon: FileText,
                title: 'Nachvollziehbare Fahrzeughistorie',
                desc: 'Von der Erstzulassung über Vorbesitzer bis zur Servicehistorie — alle relevanten Informationen auf einen Blick.',
              },
              {
                icon: Users,
                title: 'Vertrauenswürdige Anbieter',
                desc: 'Händler können sich verifizieren lassen. Private Verkäufer dokumentieren den Importweg transparent.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 shadow-sm border border-stone-100 hover:shadow-md hover:border-orange-200/50 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-3">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Import-Ablauf Bild */}
          <div className="mt-14 rounded-2xl overflow-hidden shadow-md border border-stone-100">
            <Image
              src="/hero-import.png"
              alt="Ablauf des Fahrzeugimports"
              width={1400}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── Featured Vehicles ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-2">Empfohlene Fahrzeuge</h2>
              <p className="text-stone-500">Ausgewählte Importfahrzeuge mit transparenter Dokumentation</p>
            </div>
            <Link
              href="/fahrzeuge"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
            >
              Alle anzeigen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <VehicleCard key={listing.id} listing={listing} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/fahrzeuge"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
            >
              Alle Fahrzeuge anzeigen
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Import Advantage ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-6">
                Fahrzeugimport aus Deutschland — transparent erklärt
              </h2>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Viele Fahrzeuge sind in Deutschland deutlich günstiger als in der Schweiz.
                Ein professioneller Import mit Verzollung, MFK und korrekter Abwicklung
                kann sich lohnen. AutoVale zeigt dir bei jedem Fahrzeug, wie der Import
                ablief und was beachtet wurde.
              </p>
              <div className="space-y-4">
                {[
                  'Importland und Importdatum transparent angegeben',
                  'MFK-Status und Zollabwicklung dokumentiert',
                  'Servicehistorie und Unfallstatus einsehbar',
                  'Optionaler Fahrzeughistorienbericht verfügbar',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-stone-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100">
              <h3 className="text-lg font-semibold text-stone-800 mb-6">Typischer Importvorteil</h3>
              <div className="space-y-4">
                {[
                  { label: 'Fahrzeugpreis Deutschland', value: "EUR 28'000" },
                  { label: 'Transport & Überführung', value: 'ca. CHF 500' },
                  { label: 'Zoll & MwSt.', value: "ca. CHF 2'500" },
                  { label: 'MFK & Anpassungen', value: 'ca. CHF 800' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b border-stone-100">
                    <span className="text-sm text-stone-600">{label}</span>
                    <span className="text-sm font-semibold text-stone-800">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 bg-emerald-50 rounded-xl px-4 -mx-4">
                  <span className="text-sm font-semibold text-emerald-800">Gesamtkosten Schweiz</span>
                  <span className="text-base font-bold text-emerald-700">ca. CHF 33&apos;000</span>
                </div>
                <p className="text-xs text-stone-500 mt-2">
                  Vergleichbares Fahrzeug in der Schweiz: ca. CHF 38&apos;000 – 42&apos;000.
                  Die tatsächliche Ersparnis hängt vom Fahrzeug ab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Wunschfahrzeug CTA ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,146,60,0.2),transparent_60%)]" />
            <div className="relative">
              <Star className="w-10 h-10 text-orange-400 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Dein Wunschfahrzeug nicht gefunden?</h2>
              <p className="text-stone-300 max-w-xl mx-auto mb-8">
                Sag uns, welches Fahrzeug du suchst. Wir prüfen den deutschen Markt
                und zeigen dir transparent, ob sich ein Import lohnt.
              </p>
              <Link
                href="/wunschfahrzeug"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
              >
                Wunschfahrzeug anfragen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Inserat CTA ──────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
                <Plus className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-800">Fahrzeug inserieren</h3>
                <p className="text-sm text-stone-500">
                  Erstelle ein professionelles Inserat für dein importiertes Fahrzeug ab CHF 29.–
                </p>
              </div>
            </div>
            <Link
              href="/inserat-erstellen"
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
            >
              Jetzt inserieren
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
