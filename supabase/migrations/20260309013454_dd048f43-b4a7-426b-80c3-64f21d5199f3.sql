
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
