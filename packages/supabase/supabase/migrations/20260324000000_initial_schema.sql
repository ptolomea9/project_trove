-- ============================================================
-- TROVE: Trading Card Marketplace - Initial Schema
-- ============================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";    -- fuzzy text search
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- uuid generation

-- ============================================================
-- USERS & PROFILES
-- ============================================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  reputation_score NUMERIC(5,2) DEFAULT 0,
  verification_level TEXT DEFAULT 'unverified'
    CHECK (verification_level IN ('unverified', 'email_verified', 'phone_verified', 'id_verified', 'trusted_seller')),
  total_sales INTEGER DEFAULT 0,
  total_purchases INTEGER DEFAULT 0,
  stripe_account_id TEXT,
  stripe_onboarding_complete BOOLEAN DEFAULT FALSE,
  is_seller BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CARD CATALOG (Master Reference Data)
-- ============================================================

CREATE TABLE public.card_games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  api_source TEXT,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.card_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES public.card_games(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT,
  release_date DATE,
  external_id TEXT,
  icon_url TEXT,
  total_cards INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.card_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES public.card_games(id) ON DELETE CASCADE,
  set_id UUID REFERENCES public.card_sets(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  number TEXT,
  rarity TEXT,
  card_type TEXT,
  subtypes TEXT[],
  hp TEXT,
  image_small TEXT,
  image_large TEXT,
  external_id TEXT UNIQUE,
  market_price NUMERIC(10,2),
  price_updated_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Full-text search index on card name
CREATE INDEX idx_card_catalog_name_trgm ON public.card_catalog USING gin (name gin_trgm_ops);
CREATE INDEX idx_card_catalog_game ON public.card_catalog (game_id);
CREATE INDEX idx_card_catalog_set ON public.card_catalog (set_id);
CREATE INDEX idx_card_catalog_external ON public.card_catalog (external_id);

-- ============================================================
-- LISTINGS
-- ============================================================

CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  card_catalog_id UUID REFERENCES public.card_catalog(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  condition TEXT NOT NULL
    CHECK (condition IN ('mint', 'near_mint', 'lightly_played', 'moderately_played', 'heavily_played', 'damaged')),
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  currency TEXT DEFAULT 'USD',
  quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
  is_graded BOOLEAN DEFAULT FALSE,
  grading_company TEXT,
  grade TEXT,
  cert_number TEXT,
  status TEXT DEFAULT 'active'
    CHECK (status IN ('draft', 'active', 'sold', 'reserved', 'cancelled', 'expired')),
  images TEXT[] DEFAULT '{}',
  is_holo BOOLEAN DEFAULT FALSE,
  is_first_edition BOOLEAN DEFAULT FALSE,
  is_reverse_holo BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  favorite_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  listed_at TIMESTAMPTZ DEFAULT NOW(),
  sold_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_listings_seller ON public.listings (seller_id);
CREATE INDEX idx_listings_status ON public.listings (status);
CREATE INDEX idx_listings_card ON public.listings (card_catalog_id);
CREATE INDEX idx_listings_price ON public.listings (price);
CREATE INDEX idx_listings_title_trgm ON public.listings USING gin (title gin_trgm_ops);

-- ============================================================
-- TRANSACTIONS & ESCROW
-- ============================================================

CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id),
  buyer_id UUID NOT NULL REFERENCES public.profiles(id),
  seller_id UUID NOT NULL REFERENCES public.profiles(id),
  amount NUMERIC(10,2) NOT NULL,
  platform_fee NUMERIC(10,2) NOT NULL,
  processing_fee NUMERIC(10,2) NOT NULL,
  seller_payout NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'confirmed', 'completed', 'disputed', 'refunded', 'cancelled')),
  stripe_payment_intent_id TEXT,
  stripe_transfer_id TEXT,
  tracking_number TEXT,
  tracking_carrier TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  auto_confirm_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_buyer ON public.transactions (buyer_id);
CREATE INDEX idx_transactions_seller ON public.transactions (seller_id);
CREATE INDEX idx_transactions_status ON public.transactions (status);

-- ============================================================
-- MESSAGING
-- ============================================================

CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_a UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  participant_b UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (participant_a, participant_b)
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON public.messages (conversation_id, created_at DESC);

-- ============================================================
-- REVIEWS & RATINGS
-- ============================================================

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID NOT NULL REFERENCES public.transactions(id) UNIQUE,
  reviewer_id UUID NOT NULL REFERENCES public.profiles(id),
  reviewed_id UUID NOT NULL REFERENCES public.profiles(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_reviewed ON public.reviews (reviewed_id);

-- ============================================================
-- FAVORITES / WISHLISTS
-- ============================================================

CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, listing_id)
);

-- ============================================================
-- COLLECTIONS (User Card Collections)
-- ============================================================

CREATE TABLE public.collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  card_catalog_id UUID NOT NULL REFERENCES public.card_catalog(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  condition TEXT,
  notes TEXT,
  acquired_price NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_collections_user ON public.collections (user_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_catalog ENABLE ROW LEVEL SECURITY;

-- Profiles: public read, self write
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Card catalog: public read
CREATE POLICY "Card catalog is public" ON public.card_games FOR SELECT USING (true);
CREATE POLICY "Card sets are public" ON public.card_sets FOR SELECT USING (true);
CREATE POLICY "Cards are public" ON public.card_catalog FOR SELECT USING (true);

-- Listings: public read, seller write
CREATE POLICY "Active listings are public" ON public.listings FOR SELECT USING (status = 'active' OR seller_id = auth.uid());
CREATE POLICY "Sellers can create listings" ON public.listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Sellers can update own listings" ON public.listings FOR UPDATE USING (auth.uid() = seller_id);

-- Transactions: only buyer/seller can see
CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers can create transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Conversations: only participants
CREATE POLICY "Users can view own conversations" ON public.conversations FOR SELECT USING (auth.uid() = participant_a OR auth.uid() = participant_b);
CREATE POLICY "Users can create conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = participant_a OR auth.uid() = participant_b);

-- Messages: only conversation participants
CREATE POLICY "Users can view messages in their conversations" ON public.messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = conversation_id
    AND (c.participant_a = auth.uid() OR c.participant_b = auth.uid())
  ));
CREATE POLICY "Users can send messages in their conversations" ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_id
      AND (c.participant_a = auth.uid() OR c.participant_b = auth.uid())
    )
  );

-- Reviews: public read, reviewer write
CREATE POLICY "Reviews are public" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Favorites: self only
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Collections: self only
CREATE POLICY "Users can view own collections" ON public.collections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own collections" ON public.collections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own collections" ON public.collections FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from own collections" ON public.collections FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- SEED: Card Games
-- ============================================================

INSERT INTO public.card_games (name, slug, api_source) VALUES
  ('Pokemon TCG', 'pokemon', 'pokemontcg'),
  ('Magic: The Gathering', 'mtg', 'scryfall'),
  ('Yu-Gi-Oh!', 'yugioh', 'manual'),
  ('Sports Cards', 'sports', 'manual'),
  ('One Piece TCG', 'onepiece', 'manual'),
  ('Disney Lorcana', 'lorcana', 'manual');

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.card_catalog FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.listings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.collections FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || LEFT(NEW.id::text, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Calculate platform fee (tiered)
CREATE OR REPLACE FUNCTION public.calculate_platform_fee(amount NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
  IF amount < 10 THEN
    RETURN 0.50; -- $0.50 minimum
  ELSIF amount < 100 THEN
    RETURN ROUND(amount * 0.05, 2); -- 5%
  ELSIF amount < 500 THEN
    RETURN ROUND(amount * 0.04, 2); -- 4%
  ELSE
    RETURN ROUND(amount * 0.03, 2); -- 3%
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;
