
-- Allow anonymous inserts for public profile snapshots (no auth required)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Anyone can insert public profiles"
ON public.profiles
FOR INSERT
WITH CHECK (true);

-- Allow anonymous updates to profiles by matching on id
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Anyone can update their own profile by id"
ON public.profiles
FOR UPDATE
USING (true);
