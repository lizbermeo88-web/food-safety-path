import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  fullName: string;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  fullName: "",
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const uid = session?.user?.id;
    if (!uid) {
      setProfileName("");
      return;
    }
    let active = true;
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", uid)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data?.full_name) setProfileName(data.full_name);
      });
    return () => {
      active = false;
    };
  }, [session?.user?.id]);

  const user = session?.user ?? null;

  const metaName =
    (user?.user_metadata?.["full_name"] as string | undefined) ??
    (user?.user_metadata?.["name"] as string | undefined) ??
    "";

  const fullName = profileName || metaName || user?.email?.split("@")[0] || "";

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      fullName,
      signOut,
    }),
    [user, session, loading, fullName, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
