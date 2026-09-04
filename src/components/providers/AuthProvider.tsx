"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Profile, UserAuthContextType } from "@/types";
import { isSupabaseConfigured, getProfile } from "@/lib/services/api";
import { DEMO_USER_KEY } from "@/lib/constants";
import { getStoredDemoData } from "@/lib/services/storage";
import { useRouter } from "next/navigation";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

const AuthContext = createContext<UserAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoUser, setIsDemoUser] = useState(false);
  const router = useRouter();

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const p = await getProfile(userId);
      setProfile(p);
    } catch (err) {
      console.error("Error loading profile:", err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadAuth() {
      const configured = isSupabaseConfigured();

      if (!configured) {
        if (!isMounted) return;
        const stored = getStoredDemoData();
        setUser({
          id: stored.profile.id,
          email: stored.profile.email || undefined,
          user_metadata: {
            full_name: stored.profile.full_name || undefined,
          },
        });
        setProfile(stored.profile);
        setIsDemoUser(true);
        setIsLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (session?.user) {
          const u = session.user as SupabaseUser;
          setUser({
            id: u.id,
            email: u.email,
            user_metadata: u.user_metadata,
          });
          setIsDemoUser(false);
          await fetchUserProfile(u.id);
        } else {
          const demoFlag = typeof window !== "undefined" ? localStorage.getItem(DEMO_USER_KEY) : null;
          if (demoFlag === "true") {
            const stored = getStoredDemoData();
            setUser({
              id: stored.profile.id,
              email: stored.profile.email || undefined,
              user_metadata: {
                full_name: stored.profile.full_name || undefined,
              },
            });
            setProfile(stored.profile);
            setIsDemoUser(true);
          } else {
            setUser(null);
            setProfile(null);
            setIsDemoUser(false);
          }
        }

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
          if (!isMounted) return;
          if (newSession?.user) {
            const u = newSession.user as SupabaseUser;
            setUser({
              id: u.id,
              email: u.email,
              user_metadata: u.user_metadata,
            });
            setIsDemoUser(false);
            await fetchUserProfile(u.id);
          } else {
            const demoFlag = typeof window !== "undefined" ? localStorage.getItem(DEMO_USER_KEY) : null;
            if (demoFlag !== "true") {
              setUser(null);
              setProfile(null);
              setIsDemoUser(false);
            }
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error("Auth init exception:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadAuth();

    return () => {
      isMounted = false;
    };
  }, [fetchUserProfile]);

  const enableDemoMode = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(DEMO_USER_KEY, "true");
      document.cookie = "finora_demo_user=true; path=/; max-age=86400";
    }
    const stored = getStoredDemoData();
    setUser({
      id: stored.profile.id,
      email: stored.profile.email || undefined,
      user_metadata: {
        full_name: stored.profile.full_name || undefined,
      },
    });
    setProfile(stored.profile);
    setIsDemoUser(true);
    router.push("/dashboard");
  };

  const signOut = async () => {
    if (isSupabaseConfigured() && !isDemoUser) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem(DEMO_USER_KEY);
      document.cookie = "finora_demo_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setUser(null);
    setProfile(null);
    setIsDemoUser(false);
    router.push("/login");
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchUserProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isDemoUser,
        signOut,
        refreshProfile,
        enableDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
