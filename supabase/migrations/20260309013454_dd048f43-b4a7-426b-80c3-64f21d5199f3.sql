
-- Initial schema for Interglott progress sharing.
-- These tables match the Supabase CSV exports for profiles and progress_viewers.

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  display_name text NOT NULL,
  avatar_url text,
  learning_language text NOT NULL DEFAULT 'french',
  xp integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  level text NOT NULL DEFAULT 'beginner',
  completed_lessons text[] DEFAULT ARRAY[]::text[],
  mastered_words text[] DEFAULT ARRAY[]::text[],
  completed_stories text[] DEFAULT ARRAY[]::text[],
  conversations integer NOT NULL DEFAULT 0,
  last_active_date text,
  daily_challenge_completed boolean DEFAULT false,
  learning_goal text,
  daily_goal_minutes integer DEFAULT 10,
  sound_enabled boolean DEFAULT true,
  privacy_setting text NOT NULL DEFAULT 'public',
  share_token text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT profiles_learning_language_check
    CHECK (learning_language IN ('french', 'spanish', 'chinese', 'german', 'arabic')),
  CONSTRAINT profiles_level_check
    CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  CONSTRAINT profiles_privacy_setting_check
    CHECK (privacy_setting IN ('public', 'private', 'invited_only'))
);

CREATE TABLE IF NOT EXISTS public.progress_viewers (
  id uuid PRIMARY KEY DEFAULT extensions.gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  viewer_email text NOT NULL,
  invited_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS profiles_share_token_idx
  ON public.profiles(share_token)
  WHERE share_token IS NOT NULL;

CREATE INDEX IF NOT EXISTS progress_viewers_profile_id_idx
  ON public.progress_viewers(profile_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.generate_share_token()
RETURNS text
LANGUAGE sql
AS $$
  SELECT encode(extensions.gen_random_bytes(16), 'hex');
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    display_name,
    avatar_url
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(COALESCE(NEW.email, ''), '@', 1), 'Language Learner'),
    NEW.raw_user_meta_data ->> 'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_viewers ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.progress_viewers TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_share_token() TO anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM public, anon, authenticated;

-- Fix RLS: allow anonymous/public reads via share token
DROP POLICY IF EXISTS "Public profiles viewable by share token" ON public.profiles;

CREATE POLICY "Public profiles viewable by share token"
ON public.profiles
FOR SELECT
TO anon, authenticated
USING (
  (privacy_setting = 'public')
  OR (privacy_setting = 'invited_only' AND share_token IS NOT NULL)
);

-- Ensure the trigger exists to auto-create profiles on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
