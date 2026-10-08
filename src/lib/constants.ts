// ─── AutoVale Constants ──────────────────────────────────────────────────────

export const SITE_NAME = 'AutoVale';
export const SITE_DESCRIPTION = 'Importierte Fahrzeuge aus Deutschland. Transparent geprüft. Einfach verständlich.';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://autovale.ch';

// ─── Vehicle Data Options ────────────────────────────────────────────────────

export const MAKES = [
  'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Porsche', 'Opel',
  'Ford', 'Toyota', 'Hyundai', 'Kia', 'Skoda', 'Seat', 'Cupra',
  'Volvo', 'Peugeot', 'Renault', 'Citroën', 'Fiat', 'Mazda',
  'Nissan', 'Honda', 'Subaru', 'Mitsubishi', 'Suzuki', 'Dacia',
  'Tesla', 'Polestar', 'Mini', 'Alfa Romeo', 'Jeep', 'Land Rover',
  'Jaguar', 'Lexus', 'Maserati', 'Aston Martin', 'Bentley', 'Andere',
] as const;

export const FUEL_TYPES = [
  'Benzin', 'Diesel', 'Elektro', 'Hybrid', 'Plug-in-Hybrid', 'Gas', 'Andere',
] as const;

export const TRANSMISSIONS = [
  'Automatik', 'Schaltgetriebe', 'Halbautomatik',
] as const;

export const DRIVETRAINS = [
  'Frontantrieb', 'Heckantrieb', 'Allrad',
] as const;

export const BODY_TYPES = [
  'Limousine', 'Kombi', 'SUV', 'Cabrio', 'Coupé', 'Van', 'Kleinwagen', 'Transporter', 'Andere',
] as const;

export const EXTERIOR_COLORS = [
  'Schwarz', 'Weiss', 'Silber', 'Grau', 'Blau', 'Rot', 'Grün',
  'Braun', 'Beige', 'Gold', 'Orange', 'Gelb', 'Violett', 'Andere',
] as const;

export const MFK_STATUSES = [
  'Neu vorgeführt', 'Muss vorgeführt werden', 'Nicht erforderlich',
] as const;

export const ACCIDENT_STATUSES = [
  'Unfallfrei', 'Unfallfahrzeug', 'Unbekannt',
] as const;

export const EQUIPMENT_CATEGORIES = {
  Sicherheit: [
    'ABS', 'ESP', 'Airbags', 'Notbremsassistent', 'Spurhalteassistent',
    'Totwinkelwarner', 'Rückfahrkamera', 'Parkassistent', 'Isofix',
  ],
  Komfort: [
    'Klimaanlage', 'Klimaautomatik', 'Sitzheizung', 'Lenkradheizung',
    'Elektrische Sitze', 'Tempomat', 'Keyless Entry', 'Elektrische Heckklappe',
  ],
  Infotainment: [
    'Navigationssystem', 'Apple CarPlay', 'Android Auto', 'Bluetooth',
    'DAB Radio', 'Soundsystem', 'Head-up-Display', 'Digitales Cockpit',
  ],
  Exterieur: [
    'LED-Scheinwerfer', 'Matrix-LED', 'Panoramadach', 'Schiebedach',
    'Anhängerkupplung', 'Dachrelinge', 'Alufelgen',
  ],
  Interieur: [
    'Ledersitze', 'Alcantara', 'Sportlenkrad', 'Ambientebeleuchtung',
    'Dritte Sitzreihe',
  ],
} as const;

export const SWISS_CANTONS = [
  'Zürich', 'Bern', 'Luzern', 'Uri', 'Schwyz', 'Obwalden', 'Nidwalden',
  'Glarus', 'Zug', 'Freiburg', 'Solothurn', 'Basel-Stadt', 'Basel-Landschaft',
  'Schaffhausen', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden',
  'St. Gallen', 'Graubünden', 'Aargau', 'Thurgau', 'Tessin', 'Waadt',
  'Wallis', 'Neuenburg', 'Genf', 'Jura',
] as const;

// ─── Pricing (defaults, can be overridden via site_settings) ─────────────────

export const DEFAULT_LISTING_PRICE_CHF = 29;
export const DEFAULT_FEATURED_PRICE_CHF = 49;

// ─── Wizard Steps ────────────────────────────────────────────────────────────

export const WIZARD_STEPS = [
  { id: 1, label: 'Grunddaten', description: 'Marke, Modell und Typ' },
  { id: 2, label: 'Technik', description: 'Motor, Getriebe und Farbe' },
  { id: 3, label: 'Ausstattung', description: 'Extras und Features' },
  { id: 4, label: 'Import & Historie', description: 'Herkunft und Zustand' },
  { id: 5, label: 'Preis & Standort', description: 'Preis und Beschreibung' },
  { id: 6, label: 'Bilder', description: 'Fotos hochladen' },
  { id: 7, label: 'Vorschau', description: 'Überprüfen' },
  { id: 8, label: 'Veröffentlichen', description: 'Bezahlen & online stellen' },
] as const;

// ─── Navigation ──────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { label: 'Fahrzeuge', href: '/fahrzeuge' },
  { label: 'Wunschfahrzeug', href: '/wunschfahrzeug' },
  { label: 'Inserat erstellen', href: '/inserat-erstellen' },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: 'Übersicht', href: '/admin' },
  { label: 'Inserate', href: '/admin/inserate' },
  { label: 'Nutzer', href: '/admin/nutzer' },
  { label: 'Händler', href: '/admin/haendler' },
  { label: 'Suchanfragen', href: '/admin/suchanfragen' },
  { label: 'Zahlungen', href: '/admin/zahlungen' },
  { label: 'Einstellungen', href: '/admin/einstellungen' },
] as const;
