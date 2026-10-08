# AutoVale — Projekt-Zusammenfassung

## Was ist AutoVale?

AutoVale ist eine Schweizer Online-Plattform für den Kauf und Verkauf von importierten Occasion-Fahrzeugen aus Deutschland. Der Fokus liegt auf Transparenz, Vertrauen und Nachvollziehbarkeit — Käufer sollen genau wissen, woher ein Fahrzeug kommt, welche Historie es hat und was beim Import passiert ist.

Zielmarkt: Schweiz (alle Texte auf Deutsch, Preise in CHF, MFK statt TÜV).

---

## Zielgruppen & Rollen

| Rolle | Beschreibung |
|-------|-------------|
| **Käufer (Gast)** | Durchsucht Fahrzeuge, sendet Anfragen, stellt Wunschfahrzeug-Gesuche |
| **Privater Verkäufer** | Erstellt Inserate für eigene importierte Fahrzeuge |
| **Händler** | Verifiziertes Firmenprofil, mehrere Inserate, Händler-Badge |
| **Admin** | Verwaltet Inserate, Nutzer, Händler, Zahlungen, Einstellungen |

---

## Die drei Hauptbereiche

### 1. Fahrzeug-Marktplatz
- Durchsuchen/Filtern nach Marke, Modell, Preis, Kilometer, Baujahr, Kraftstoff, Getriebe, Antrieb, Karosserie, Standort
- Detailseiten mit Bildergalerie, technischen Daten, Ausstattung nach Kategorie, Import-Historie
- Kontaktformular (Anfrage oder Besichtigung)

### 2. Inserat erstellen (8-Schritt-Wizard)
1. Grunddaten (Marke, Modell, Variante, Karosserie, Titel)
2. Technik (Baujahr, km, PS/kW, Kraftstoff, Getriebe, Antrieb, Farben)
3. Ausstattung (Toggle-Chips nach Kategorien)
4. Import & Historie (Importland/-datum, MFK, Zoll, Unfallstatus, VIN, **CarVertical-Bericht**, **Aviloo-Batteriereport**)
5. Preis & Standort (CHF/EUR, Ort, PLZ, Beschreibung)
6. Bilder (Upload, erstes Bild = Titelbild)
7. Vorschau
8. Veröffentlichen (Bezahlung via Stripe → automatische Freischaltung)

**Kosten:** CHF 29 pro Inserat + optional CHF 10 für CarVertical-Report

### 3. Wunschfahrzeug-Suche
- Formular für Käufer: gewünschte Marke/Modell, Budget, Baujahr, Kilometerstand, Kraftstoff, Farbe
- Admin sieht alle Anfragen und kann Status verwalten

---

## Fahrzeugberichte (Vertrauens-Feature)

Jedes Inserat kann zwei Dokumente als PDF hinterlegen:

| Bericht | Zweck | Zielgruppe |
|---------|-------|-----------|
| **CarVertical** | Unfallhistorie, Kilometerstand-Verlauf, Vorbesitzer | Alle Fahrzeuge |
| **Aviloo** | Zertifizierte Batteriegesundheits-Analyse | Elektro- & Hybridfahrzeuge |

- Berichte werden als Badges auf den Fahrzeugkarten angezeigt (sofort sichtbar in der Übersicht)
- Auf der Detailseite als Download-Links mit farbigen Karten
- Im Vertrauensbereich referenziert

---

## Tech Stack

| Komponente | Technologie |
|-----------|-------------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS 4 |
| Auth & DB | Supabase (Auth, PostgreSQL, Storage, RLS) |
| Zahlung | Stripe Checkout + Webhooks |
| Formulare | React Hook Form + Zod |
| Icons | lucide-react |
| Hosting | Vercel (geplant) |

### Design-System
- Primärfarbe: Orange (#f97316)
- Hintergrund: Creme (#faf8f5)
- Text: Anthrazit (#2d2d2d)
- Font: Inter
- Ecken: abgerundet (rounded-xl/2xl)
- Premium-Feeling mit warmen Farben und viel Weissraum

---

## Datenbank-Architektur

### Tabellen
- `profiles` — Nutzerprofile (auto-erstellt bei Signup)
- `dealer_profiles` — Firmendaten verifizierter Händler
- `listings` — Fahrzeug-Inserate (Kern-Tabelle, 40+ Felder)
- `listing_images` — Bilder pro Inserat (sortierbar, Cover-Flag)
- `listing_equipment` — Ausstattungsmerkmale (Name + Kategorie)
- `listing_inquiries` — Kontaktanfragen (Frage oder Besichtigung)
- `search_requests` — Wunschfahrzeug-Gesuche
- `payments` — Stripe-Zahlungen pro Inserat
- `site_settings` — Plattform-Einstellungen (Key-Value)
- `audit_logs` — Protokoll aller wichtigen Aktionen

### Inserat-Status-Flow
```
draft → pending_payment → published → paused/sold/archived
                                    → rejected (Admin)
```

### Sicherheit
- Row Level Security (RLS) auf allen Tabellen
- `vin_private` wird nie öffentlich angezeigt (maskierte Version: `vin_masked`)
- `public_listings` View versteckt private Felder
- Stripe Secrets nur in Environment Variables
- Zahlungsstatus nur serverseitig änderbar (Webhook)
- `is_admin()` Helper-Funktion für Admin-Policies

---

## Geschäftsmodell

| Einnahme | Betrag |
|----------|--------|
| Inserat veröffentlichen | CHF 29 |
| CarVertical-Report (optional) | CHF 10 |
| Featured-Platzierung (vorbereitet) | CHF 49 |

**Zahlungsflow:**
1. Verkäufer erstellt Inserat → Status: `draft`
2. Klick auf "Veröffentlichen" → Stripe Checkout
3. Zahlung erfolgreich → Webhook setzt Status auf `published`
4. Inserat ist sofort live

---

## Bestehende Seiten / Routes

### Öffentlich
- `/` — Homepage (Hero, Suchleiste, Trust-Badges, Featured, CTAs)
- `/fahrzeuge` — Marktplatz mit Filtern und Sortierung
- `/fahrzeuge/[id]` — Fahrzeug-Detailseite
- `/wunschfahrzeug` — Wunschfahrzeug-Formular
- `/inserat-erstellen` — 8-Schritt-Wizard
- `/auth/login` — Anmeldung (E-Mail/Passwort oder Magic Link)
- `/auth/registrieren` — Registrierung
- `/zahlung/erfolg` — Zahlungsbestätigung
- `/zahlung/abgebrochen` — Zahlung abgebrochen

### Dashboard (Verkäufer)
- `/dashboard` — Übersicht mit Quick Links
- `/dashboard/inserate` — Eigene Inserate verwalten
- `/dashboard/profil` — Profil bearbeiten

### Admin
- `/admin` — KPI-Übersicht
- `/admin/inserate` — Alle Inserate verwalten
- `/admin/nutzer` — Nutzerverwaltung
- `/admin/haendler` — Händler verifizieren
- `/admin/suchanfragen` — Wunschfahrzeug-Anfragen
- `/admin/zahlungen` — Zahlungsübersicht
- `/admin/einstellungen` — Plattform-Einstellungen

### API-Endpoints
- `POST /api/stripe/checkout` — Stripe Session erstellen
- `POST /api/stripe/webhook` — Stripe Webhook (Zahlung → Veröffentlichung)
- `POST /api/inquiries` — Kontaktanfrage senden
- `POST /api/search-requests` — Wunschfahrzeug-Gesuch erstellen

---

## Branding / Logo

- **Logo:** Oranges "AV"-Monogramm (SVG) + "AutoVale"-Schriftzug (Auto schwarz, Vale orange)
- Varianten: Default (dunkler Hintergrund-Text) und White (für Footer etc.)
- Drei Grössen: sm, md, lg
- SVG-Fallback eingebaut, kann mit echtem PNG (`/public/logo.png`) ersetzt werden

---

## Was noch fehlt / nächste Schritte

### Funktional
- [ ] Echte Supabase-Anbindung (Auth, CRUD, Storage)
- [ ] Bild-Upload mit Supabase Storage (Drag & Drop, Reihenfolge)
- [ ] PDF-Upload für CarVertical/Aviloo-Berichte (Supabase Storage)
- [ ] Stripe Live-Integration (Checkout + Webhook)
- [ ] E-Mail-Benachrichtigungen (Anfragen, Statusänderungen)
- [ ] Händler-Verifizierungsprozess
- [ ] Suchmaschinen-Optimierung (SEO, Sitemap, Open Graph)
- [ ] Fahrzeug-Vergleichsfunktion

### Strategisch
- [ ] Preismodell validieren (CHF 29 pro Inserat, CHF 10 CarVertical)
- [ ] Partnerschaft mit CarVertical und Aviloo formalisieren
- [ ] Marketing-Strategie (SEO, Google Ads, Social Media)
- [ ] Händler-Akquise (erste 10–20 Händler)
- [ ] Rechtliches: AGB, Datenschutz, Impressum (Schweizer Recht)
- [ ] Mobile App (optional, PWA als Alternative)
- [ ] Abo-Modell für Händler (z.B. monatlich X Inserate)

---

## Mockdaten (6 Fahrzeuge)

1. BMW 320d Touring M Sport — CHF 34'900 (CarVertical vorhanden)
2. Mercedes-Benz C 200 — CHF 29'500
3. Audi A4 Avant — CHF 31'800
4. VW Golf GTI — CHF 27'500
5. Porsche Macan — CHF 52'900
6. Tesla Model 3 Long Range — CHF 33'500 (CarVertical + Aviloo vorhanden)

---

*Stand: Oktober 2026 — Erstellt mit Claude (Cowork)*
