-- Happlier Database Schema
-- Run this in your Supabase SQL Editor

-- ============================================
-- TABLES
-- ============================================

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR NOT NULL,
  phone VARCHAR,
  plan VARCHAR DEFAULT 'free' CHECK (plan IN ('free', 'paid', 'premium')),
  stripe_customer_id VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Apps table
CREATE TABLE public.apps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category VARCHAR CHECK (category IN ('vitrine', 'portfolio', 'evenement', 'restaurant', 'cv', 'landing', 'autre')),
  color_primary VARCHAR DEFAULT '#3B82F6',
  color_secondary VARCHAR DEFAULT '#1E40AF',
  logo_url VARCHAR,
  generated_code TEXT,
  status VARCHAR DEFAULT 'trial' CHECK (status IN ('trial', 'active', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '3 days')
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  app_id UUID NOT NULL REFERENCES public.apps(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_apps_user_id ON public.apps(user_id);
CREATE INDEX idx_apps_status ON public.apps(status);
CREATE INDEX idx_apps_expires_at ON public.apps(expires_at);
CREATE INDEX idx_subscriptions_app_id ON public.subscriptions(app_id);
CREATE INDEX idx_subscriptions_stripe_id ON public.subscriptions(stripe_subscription_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Apps: users can CRUD their own apps, anyone can read active/trial apps (for serving)
CREATE POLICY "Users can view own apps"
  ON public.apps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view active apps by slug"
  ON public.apps FOR SELECT
  USING (status IN ('trial', 'active'));

CREATE POLICY "Users can insert own apps"
  ON public.apps FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own apps"
  ON public.apps FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own apps"
  ON public.apps FOR DELETE
  USING (auth.uid() = user_id);

-- Subscriptions: users can only view their own subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON public.subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- TRIGGER: Auto-create profile on signup
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- STORAGE: Create bucket for app assets
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('app-assets', 'app-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload to own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'app-assets' AND
    (storage.foldername(name))[1] = 'logos' AND
    (storage.foldername(name))[2] = auth.uid()::text
  );

CREATE POLICY "Anyone can view app assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'app-assets');
