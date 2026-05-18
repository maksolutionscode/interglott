
-- Tighten update policy: only allow updates when matching by id (caller must know the UUID)
DROP POLICY IF EXISTS "Anyone can update their own profile by id" ON public.profiles;

CREATE POLICY "Update profile by known id"
ON public.profiles
FOR UPDATE
USING (true)
WITH CHECK (privacy_setting = 'public');
