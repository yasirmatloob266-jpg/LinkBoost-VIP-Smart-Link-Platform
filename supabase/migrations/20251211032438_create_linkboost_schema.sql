/*
  # LinkBoost VIP - Complete Database Schema

  ## Overview
  This migration creates the complete database structure for LinkBoost VIP, a professional URL shortener and smart link management platform.

  ## New Tables

  1. **user_profiles**
     - `id` (uuid, references auth.users)
     - `email` (text)
     - `full_name` (text)
     - `role` (text) - 'user' or 'admin'
     - `is_active` (boolean)
     - `created_at` (timestamptz)

  2. **links**
     - `id` (uuid, primary key)
     - `user_id` (uuid, references user_profiles)
     - `short_code` (text, unique) - The shortened URL slug
     - `original_url` (text) - The destination URL
     - `title` (text)
     - `password` (text) - Optional password protection
     - `expires_at` (timestamptz) - Optional expiration
     - `is_active` (boolean)
     - `clicks` (integer) - Total click count
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  3. **link_redirects**
     - `id` (uuid, primary key)
     - `link_id` (uuid, references links)
     - `country_code` (text) - ISO country code
     - `device_type` (text) - 'mobile', 'desktop', 'tablet'
     - `redirect_url` (text)
     - `created_at` (timestamptz)

  4. **clicks**
     - `id` (uuid, primary key)
     - `link_id` (uuid, references links)
     - `country` (text)
     - `device` (text)
     - `browser` (text)
     - `referrer` (text)
     - `ip_address` (text)
     - `clicked_at` (timestamptz)

  5. **bio_pages**
     - `id` (uuid, primary key)
     - `user_id` (uuid, references user_profiles)
     - `slug` (text, unique)
     - `title` (text)
     - `description` (text)
     - `avatar_url` (text)
     - `theme_color` (text)
     - `background_type` (text) - 'color', 'gradient', 'image'
     - `background_value` (text)
     - `blocks` (jsonb) - Array of bio page blocks
     - `is_published` (boolean)
     - `views` (integer)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  6. **landing_pages**
     - `id` (uuid, primary key)
     - `user_id` (uuid, references user_profiles)
     - `slug` (text, unique)
     - `title` (text)
     - `html_content` (text)
     - `meta_title` (text)
     - `meta_description` (text)
     - `og_image` (text)
     - `is_published` (boolean)
     - `views` (integer)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  7. **multi_link_pages**
     - `id` (uuid, primary key)
     - `user_id` (uuid, references user_profiles)
     - `slug` (text, unique)
     - `title` (text)
     - `description` (text)
     - `links` (jsonb) - Array of links
     - `theme` (jsonb) - Theme settings
     - `is_published` (boolean)
     - `views` (integer)
     - `created_at` (timestamptz)
     - `updated_at` (timestamptz)

  8. **admin_settings**
     - `id` (uuid, primary key)
     - `key` (text, unique)
     - `value` (jsonb)
     - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can only access their own data
  - Admins can access all data
  - Public access for viewing published pages (bio, landing, multi-link)
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text DEFAULT '',
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create links table
CREATE TABLE IF NOT EXISTS links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  short_code text UNIQUE NOT NULL,
  original_url text NOT NULL,
  title text DEFAULT '',
  password text,
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  clicks integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own links"
  ON links FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own links"
  ON links FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own links"
  ON links FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own links"
  ON links FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all links"
  ON links FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage all links"
  ON links FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create link_redirects table
CREATE TABLE IF NOT EXISTS link_redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid NOT NULL REFERENCES links(id) ON DELETE CASCADE,
  country_code text,
  device_type text,
  redirect_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE link_redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own link redirects"
  ON link_redirects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM links
      WHERE links.id = link_redirects.link_id
      AND links.user_id = auth.uid()
    )
  );

-- Create clicks table
CREATE TABLE IF NOT EXISTS clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid NOT NULL REFERENCES links(id) ON DELETE CASCADE,
  country text DEFAULT '',
  device text DEFAULT '',
  browser text DEFAULT '',
  referrer text DEFAULT '',
  ip_address text DEFAULT '',
  clicked_at timestamptz DEFAULT now()
);

ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view clicks for own links"
  ON clicks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM links
      WHERE links.id = clicks.link_id
      AND links.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert clicks"
  ON clicks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create bio_pages table
CREATE TABLE IF NOT EXISTS bio_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  slug text UNIQUE NOT NULL,
  title text DEFAULT '',
  description text DEFAULT '',
  avatar_url text DEFAULT '',
  theme_color text DEFAULT '#6366f1',
  background_type text DEFAULT 'gradient',
  background_value text DEFAULT 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  blocks jsonb DEFAULT '[]'::jsonb,
  is_published boolean DEFAULT false,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bio_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own bio pages"
  ON bio_pages FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view published bio pages"
  ON bio_pages FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Create landing_pages table
CREATE TABLE IF NOT EXISTS landing_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  slug text UNIQUE NOT NULL,
  title text DEFAULT '',
  html_content text DEFAULT '',
  meta_title text DEFAULT '',
  meta_description text DEFAULT '',
  og_image text DEFAULT '',
  is_published boolean DEFAULT false,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own landing pages"
  ON landing_pages FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view published landing pages"
  ON landing_pages FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Create multi_link_pages table
CREATE TABLE IF NOT EXISTS multi_link_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  slug text UNIQUE NOT NULL,
  title text DEFAULT '',
  description text DEFAULT '',
  links jsonb DEFAULT '[]'::jsonb,
  theme jsonb DEFAULT '{}'::jsonb,
  is_published boolean DEFAULT false,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE multi_link_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own multi-link pages"
  ON multi_link_pages FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view published multi-link pages"
  ON multi_link_pages FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage settings"
  ON admin_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_links_short_code ON links(short_code);
CREATE INDEX IF NOT EXISTS idx_links_user_id ON links(user_id);
CREATE INDEX IF NOT EXISTS idx_clicks_link_id ON clicks(link_id);
CREATE INDEX IF NOT EXISTS idx_clicks_clicked_at ON clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_bio_pages_slug ON bio_pages(slug);
CREATE INDEX IF NOT EXISTS idx_landing_pages_slug ON landing_pages(slug);
CREATE INDEX IF NOT EXISTS idx_multi_link_pages_slug ON multi_link_pages(slug);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_links_updated_at ON links;
CREATE TRIGGER update_links_updated_at
  BEFORE UPDATE ON links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bio_pages_updated_at ON bio_pages;
CREATE TRIGGER update_bio_pages_updated_at
  BEFORE UPDATE ON bio_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_landing_pages_updated_at ON landing_pages;
CREATE TRIGGER update_landing_pages_updated_at
  BEFORE UPDATE ON landing_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_multi_link_pages_updated_at ON multi_link_pages;
CREATE TRIGGER update_multi_link_pages_updated_at
  BEFORE UPDATE ON multi_link_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();