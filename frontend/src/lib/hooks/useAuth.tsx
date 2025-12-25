"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api/client";
import Cookies from "js-cookie";
import { User } from "@/types/user";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (payload: any) => Promise<any>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  async function refreshProfile() {
    try {
      const res = await api.get("/auth/profile");
      const profile = res.data.user ?? res.data;

      setUser(profile);
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (err) {
      console.error("refreshProfile failed", err);
    }
  }

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
      setLoading(false);
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/profile")
      .then((res) => setUser(res.data.user ?? res.data))
      .catch(() => {
        Cookies.remove("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });

    const token = res.data.access_token || res.data.token;

    if (token) Cookies.set("token", token, { expires: 7 });

    const profile = await api
      .get("/auth/profile")
      .then((r) => r.data.user ?? r.data);

    setUser(profile);
    return profile;
  }

  async function register(payload: any) {
    const res = await api.post("/auth/register", payload);
    return res.data;
  }

  function logout() {
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
