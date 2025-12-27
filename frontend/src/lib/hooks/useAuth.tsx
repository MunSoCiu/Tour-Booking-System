"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api/client";
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* =========================
      INIT AUTH (LOCALSTORAGE)
  ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  /* =========================
      LOGIN
  ========================= */
  async function login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });

    const token = res.data.access_token || res.data.token;
    if (!token) {
      throw new Error("Token not found");
    }

    // 🔐 lưu token
    localStorage.setItem("token", token);

    // 👤 lấy profile
    const profileRes = await api.get("/auth/profile");
    const profile = profileRes.data.user ?? profileRes.data;

    localStorage.setItem("user", JSON.stringify(profile));
    setUser(profile);

    return profile;
  }

  /* =========================
      REGISTER
  ========================= */
  async function register(payload: any) {
    const res = await api.post("/auth/register", payload);
    return res.data;
  }

  /* =========================
      REFRESH PROFILE (OPTIONAL)
  ========================= */
  async function refreshProfile() {
    try {
      const res = await api.get("/auth/profile");
      const profile = res.data.user ?? res.data;

      localStorage.setItem("user", JSON.stringify(profile));
      setUser(profile);
    } catch (err) {
      console.error("refreshProfile failed", err);
    }
  }

  /* =========================
      LOGOUT
  ========================= */
  function logout() {
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
