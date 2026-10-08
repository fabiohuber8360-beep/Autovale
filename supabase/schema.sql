-- ═══════════════════════════════════════════════════════════════════════════════
-- AutoVale Database Schema
-- Supabase (PostgreSQL) — Alle Tabellen, Indizes und RLS Policies
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── Custom Types ────────────────────────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('guest', 'seller', 'dealer', 'admin');
CREATE TYPE listing_status AS ENUM ('draft', 'pending_payment', 'published', 'paused', 'sold', 'rejected', 'archived');
CREATE TYPE search_request_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE inquiry_type AS ENUM ('question', 'viewing');

-- ─── Profiles ────────────────────────────────────────────────────────────────

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  role user_role NOT NULL DEFAULT 'seller',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── Dealer Profiles ─────────────────────────────────────────────────────────

CREATE TABLE dealer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  address TEXT,
  zip TEXT,
  city TEXT,
  country TEXT DEFAULT 'Schweiz',
  phone TEXT,
  website TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(profile_id)
);

-- ─── Listings ────────────────────────────────────────────────────────────────

CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  dealer_id UUID REFERENCES dealer_profiles(id) ON DELETE SET NULL,
  status listing_status NOT NULL DEFAULT 'draft',
  title TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  variant TEXT,
  price_chf INTEGER NOT NULL,
  price_eur INTEGER,
  mileage_km INTEGER NOT NULL,
  first_registration DATE,
  production_year INTEGER NOT NULL,
  power_hp INTEGER,
  power_kw INTEGER,
  displacement_ccm INTEGER,
  fuel_type TEXT NOT NULL,
  transmission TEXT NOT NULL,
  drivetrain TEXT NOT NULL,
  body_type TEXT NOT NULL,
  exterior_color TEXT NOT NULL,
  interior_color TEXT,
  doors INTEGER,
  seats INTEGER,
  consumption_l100km NUMERIC(4,1),
  co2_gkm INTEGER,
  vin_private TEXT, -- Never exposed publicly
  vin_masked TEXT,
  import_country TEXT NOT NULL DEFAULT 'Deutschland',
  import_date DATE,
  mfk_status TEXT,
  customs_status TEXT,
  accident_free_status TEXT NOT NULL DEFAULT 'Unbekannt',
  previous_owners INTEGER,
  warranty_text TEXT,
  service_history TEXT,
  description TEXT NOT NULL DEFAULT '',
  location_city TEXT NOT NULL,
  location_zip TEXT NOT NULL,
  location_country TEXT NOT NULL DEFAULT 'Schweiz',
  carvertical_report_url TEXT,    -- URL zum CarVertical-Historienbericht (PDF in Supabase Storage)
  aviloo_report_url TEXT,         -- URL zum Aviloo-Batteriereport (nur bei Elektro/Hybrid, PDF)
  featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_make ON listings(make);
CREATE INDEX idx_listings_price ON listings(price_chf);
CREATE INDEX idx_listings_seller ON listings(seller_id);
CREATE INDEX idx_listings_published ON listings(published_at) WHERE status = 'published';

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER listings_updated_at
  BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Listing Images ──────────────────────────────────────────────────────────

CREATE TABLE listing_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_cover BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listing_images_listing ON listing_images(listing_id);

-- ─── Listing Equipment ──────────────────────────────────────────────────────

CREATE TABLE listing_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL
);

CREATE INDEX idx_listing_equipment_listing ON listing_equipment(listing_id);

-- ─── Listing Inquiries ──────────────────────────────────────────────────────

CREATE TABLE listing_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  inquiry_type inquiry_type NOT NULL DEFAULT 'question',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listing_inquiries_listing ON listing_inquiries(listing_id);

-- ─── Search Requests ────────────────────────────────────────────────────────

CREATE TABLE search_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  make TEXT,
  model TEXT,
  variant TEXT,
  budget_chf INTEGER,
  min_year INTEGER,
  max_year INTEGER,
  max_mileage_km INTEGER,
  preferred_colors TEXT,
  preferred_fuel TEXT,
  required_equipment TEXT,
  notes TEXT,
  status search_request_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Payments ────────────────────────────────────────────────────────────────

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  stripe_session_id TEXT NOT NULL UNIQUE,
  amount_chf INTEGER NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_listing ON payments(listing_id);
CREATE INDEX idx_payments_stripe ON payments(stripe_session_id);

-- ─── Site Settings ──────────────────────────────────────────────────────────

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Default settings
INSERT INTO site_settings (key, value) VALUES
  ('listing_price_chf', '29'),
  ('featured_price_chf', '49'),
  ('max_images_per_listing', '20'),
  ('listing_duration_days', '90'),
  ('contact_email', 'info@autovale.ch'),
  ('contact_phone', '+41 44 000 00 00');

-- ─── Audit Logs ──────────────────────────────────────────────────────────────

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- Row Level Security (RLS)
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper: check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ─── Profiles RLS ───────────────────────────────────────────────────────────

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (id = auth.uid() OR is_admin());
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Admin can view all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admin can update all profiles" ON profiles FOR UPDATE USING (is_admin());

-- ─── Dealer Profiles RLS ────────────────────────────────────────────────────

CREATE POLICY "Public can view verified dealers" ON dealer_profiles FOR SELECT USING (verified = true);
CREATE POLICY "Owners can manage own dealer profile" ON dealer_profiles FOR ALL USING (profile_id = auth.uid());
CREATE POLICY "Admin can manage all dealers" ON dealer_profiles FOR ALL USING (is_admin());

-- ─── Listings RLS ───────────────────────────────────────────────────────────
-- IMPORTANT: vin_private is never exposed via RLS — queries should use a view

CREATE POLICY "Anyone can view published listings" ON listings FOR SELECT USING (status = 'published');
CREATE POLICY "Sellers can view own listings" ON listings FOR SELECT USING (seller_id = auth.uid());
CREATE POLICY "Sellers can insert own listings" ON listings FOR INSERT WITH CHECK (seller_id = auth.uid());
CREATE POLICY "Sellers can update own listings" ON listings FOR UPDATE USING (seller_id = auth.uid());
CREATE POLICY "Admin can manage all listings" ON listings FOR ALL USING (is_admin());

-- ─── Listing Images RLS ─────────────────────────────────────────────────────

CREATE POLICY "Anyone can view images of published listings" ON listing_images FOR SELECT
  USING (EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND (status = 'published' OR seller_id = auth.uid())));
CREATE POLICY "Sellers can manage own images" ON listing_images FOR ALL
  USING (EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND seller_id = auth.uid()));
CREATE POLICY "Admin can manage all images" ON listing_images FOR ALL USING (is_admin());

-- ─── Listing Equipment RLS ──────────────────────────────────────────────────

CREATE POLICY "Anyone can view equipment of published listings" ON listing_equipment FOR SELECT
  USING (EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND (status = 'published' OR seller_id = auth.uid())));
CREATE POLICY "Sellers can manage own equipment" ON listing_equipment FOR ALL
  USING (EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND seller_id = auth.uid()));
CREATE POLICY "Admin can manage all equipment" ON listing_equipment FOR ALL USING (is_admin());

-- ─── Listing Inquiries RLS ──────────────────────────────────────────────────

CREATE POLICY "Anyone can create inquiries" ON listing_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Sellers can view inquiries for own listings" ON listing_inquiries FOR SELECT
  USING (EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND seller_id = auth.uid()));
CREATE POLICY "Admin can view all inquiries" ON listing_inquiries FOR ALL USING (is_admin());

-- ─── Search Requests RLS ────────────────────────────────────────────────────

CREATE POLICY "Anyone can create search requests" ON search_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Only admin can view search requests" ON search_requests FOR SELECT USING (is_admin());
CREATE POLICY "Admin can manage search requests" ON search_requests FOR ALL USING (is_admin());

-- ─── Payments RLS ───────────────────────────────────────────────────────────

CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admin can view all payments" ON payments FOR ALL USING (is_admin());

-- ─── Site Settings RLS ──────────────────────────────────────────────────────

CREATE POLICY "Anyone can read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can manage settings" ON site_settings FOR ALL USING (is_admin());

-- ─── Audit Logs RLS ─────────────────────────────────────────────────────────

CREATE POLICY "Admin can view audit logs" ON audit_logs FOR SELECT USING (is_admin());
CREATE POLICY "Service can insert audit logs" ON audit_logs FOR INSERT WITH CHECK (true);

-- ═══════════════════════════════════════════════════════════════════════════════
-- Public View (hides vin_private)
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE VIEW public_listings AS
SELECT
  id, seller_id, dealer_id, status, title, make, model, variant,
  price_chf, price_eur, mileage_km, first_registration, production_year,
  power_hp, power_kw, displacement_ccm, fuel_type, transmission, drivetrain,
  body_type, exterior_color, interior_color, doors, seats,
  consumption_l100km, co2_gkm, vin_masked,
  import_country, import_date, mfk_status, customs_status,
  accident_free_status, previous_owners, warranty_text, service_history,
  description, location_city, location_zip, location_country,
  carvertical_report_url, aviloo_report_url,
  featured, published_at, created_at, updated_at
FROM listings
WHERE status = 'published';
