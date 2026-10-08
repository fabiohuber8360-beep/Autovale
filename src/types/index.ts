// ─── AutoVale Type Definitions ───────────────────────────────────────────────

export type UserRole = 'guest' | 'seller' | 'dealer' | 'admin';

export type ListingStatus =
  | 'draft'
  | 'pending_payment'
  | 'published'
  | 'paused'
  | 'sold'
  | 'rejected'
  | 'archived';

export type FuelType = 'Benzin' | 'Diesel' | 'Elektro' | 'Hybrid' | 'Plug-in-Hybrid' | 'Gas' | 'Andere';
export type Transmission = 'Automatik' | 'Schaltgetriebe' | 'Halbautomatik';
export type Drivetrain = 'Frontantrieb' | 'Heckantrieb' | 'Allrad';
export type BodyType = 'Limousine' | 'Kombi' | 'SUV' | 'Cabrio' | 'Coupé' | 'Van' | 'Kleinwagen' | 'Transporter' | 'Andere';
export type AccidentStatus = 'Unfallfrei' | 'Unfallfahrzeug' | 'Unbekannt';
export type MFKStatus = 'Neu vorgeführt' | 'Muss vorgeführt werden' | 'Nicht erforderlich';
export type SearchRequestStatus = 'open' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// ─── Database Models ─────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

export interface DealerProfile {
  id: string;
  profile_id: string;
  company_name: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
  website: string | null;
  verified: boolean;
  description: string | null;
  logo_url: string | null;
  created_at: string;
}

export interface Listing {
  id: string;
  seller_id: string;
  dealer_id: string | null;
  status: ListingStatus;
  title: string;
  make: string;
  model: string;
  variant: string | null;
  price_chf: number;
  price_eur: number | null;
  mileage_km: number;
  first_registration: string | null;
  production_year: number;
  power_hp: number | null;
  power_kw: number | null;
  displacement_ccm: number | null;
  fuel_type: FuelType;
  transmission: Transmission;
  drivetrain: Drivetrain;
  body_type: BodyType;
  exterior_color: string;
  interior_color: string | null;
  doors: number | null;
  seats: number | null;
  consumption_l100km: number | null;
  co2_gkm: number | null;
  vin_private: string | null;
  vin_masked: string | null;
  import_country: string;
  import_date: string | null;
  mfk_status: MFKStatus;
  customs_status: string | null;
  accident_free_status: AccidentStatus;
  previous_owners: number | null;
  warranty_text: string | null;
  service_history: string | null;
  description: string;
  location_city: string;
  location_zip: string;
  location_country: string;
  carvertical_report_url: string | null;
  aviloo_report_url: string | null;
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // Relations
  images?: ListingImage[];
  equipment?: ListingEquipment[];
  seller?: Profile;
  dealer?: DealerProfile;
}

export interface ListingImage {
  id: string;
  listing_id: string;
  url: string;
  sort_order: number;
  is_cover: boolean;
  created_at: string;
}

export interface ListingEquipment {
  id: string;
  listing_id: string;
  name: string;
  category: string;
}

export interface ListingInquiry {
  id: string;
  listing_id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  inquiry_type: 'question' | 'viewing';
  created_at: string;
}

export interface SearchRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  make: string | null;
  model: string | null;
  variant: string | null;
  budget_chf: number | null;
  min_year: number | null;
  max_year: number | null;
  max_mileage_km: number | null;
  preferred_colors: string | null;
  preferred_fuel: string | null;
  required_equipment: string | null;
  notes: string | null;
  status: SearchRequestStatus;
  created_at: string;
}

export interface Payment {
  id: string;
  listing_id: string;
  user_id: string | null;
  stripe_session_id: string;
  amount_chf: number;
  status: PaymentStatus;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// ─── Filter & Search Types ───────────────────────────────────────────────────

export interface VehicleFilters {
  make?: string;
  model?: string;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  yearMin?: number;
  yearMax?: number;
  fuelType?: FuelType;
  transmission?: Transmission;
  drivetrain?: Drivetrain;
  bodyType?: BodyType;
  location?: string;
  sellerType?: 'private' | 'dealer';
  importCountry?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'mileage' | 'year';
  search?: string;
}

// ─── Form Types ──────────────────────────────────────────────────────────────

export interface ListingFormData {
  // Step 1: Grunddaten
  make: string;
  model: string;
  variant: string;
  title: string;
  body_type: BodyType;
  // Step 2: Technik
  production_year: number;
  first_registration: string;
  mileage_km: number;
  power_hp: number;
  power_kw: number;
  displacement_ccm: number;
  fuel_type: FuelType;
  transmission: Transmission;
  drivetrain: Drivetrain;
  exterior_color: string;
  interior_color: string;
  doors: number;
  seats: number;
  consumption_l100km: number | null;
  co2_gkm: number | null;
  // Step 3: Ausstattung
  equipment: { name: string; category: string }[];
  // Step 4: Import & Historie
  import_country: string;
  import_date: string;
  mfk_status: MFKStatus;
  customs_status: string;
  accident_free_status: AccidentStatus;
  previous_owners: number;
  service_history: string;
  warranty_text: string;
  vin_private: string;
  // Step 5: Preis & Standort
  price_chf: number;
  price_eur: number | null;
  location_city: string;
  location_zip: string;
  location_country: string;
  description: string;
  // Step 6: Dokumente & Berichte
  carvertical_report: File | null;
  aviloo_report: File | null;
  // Step 7: Bilder
  images: File[];
}

// ─── UI Types ────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface AdminKPIs {
  activeListings: number;
  newListings: number;
  openSearchRequests: number;
  paidListings: number;
  revenue: number;
  newUsers: number;
  deactivatedListings: number;
}
