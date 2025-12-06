// frontend/src/lib/useAuth.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api/client";
import Cookies from "js-cookie";

type User = {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
} | null;

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setLoading(false);
      return;
    }
    // fetch profile
    api
      .get("/api/auth/profile") // implement endpoint or use /api/users/:id with token payload
      .then((res) => {
        setUser(res.data.user ?? res.data);
      })
      .catch(() => {
        Cookies.remove("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post("/api/auth/login", { email, password });
    const token = res.data.access_token || res.data.token;
    if (token) Cookies.set("token", token, { expires: 7 });
    // fetch profile
    const profile = await api
      .get("/api/auth/profile")
      .then((r) => r.data.user ?? r.data);
    setUser(profile);
    return profile;
  }

  async function register(payload: any) {
    const res = await api.post("/api/auth/register", payload);
    return res.data;
  }

  function logout() {
    Cookies.remove("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
