import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  fullName: string;
  recovering: boolean;
  signOut: () => Promise<void>;
  clearRecovery: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  fullName: "",
  recovering: false,
  signOut: async () => {},
  clearRecovery: () => {},
});

function urlDeRecuperacion() {
  if (typeof window === "undefined") return false;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const search = new URLSearchParams(window.location.search);
  return hash.get("type") === "recovery" || search.get("type") === "recovery";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [recovering, setRecovering] = useState(() => urlDeRecuperacion());

  useEffect(() => {
    if (urlDeRecuperacion()) setRecovering(true);

    const { data: sub } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "PASSWORD_RECOVERY" || urlDeRecuperacion()) setRecovering(true);
      setSession(nextSession);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (urlDeRecuperacion()) setRecovering(true);
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
    setRecovering(false);
    await supabase.auth.signOut();
  }, []);

  const clearRecovery = useCallback(() => {
    setRecovering(false);
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      fullName,
      recovering,
      signOut,
      clearRecovery,
    }),
    [user, session, loading, fullName, recovering, signOut, clearRecovery],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
