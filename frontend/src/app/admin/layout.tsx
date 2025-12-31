"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
=======
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      router.replace("/login");
      return;
    }

    const user = JSON.parse(u);
    if (user.role !== "admin") {
      router.replace("/login");
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) return null;

  return (
    <div className="flex min-h-screen">
=======
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!loading && (!user || user.role !== "admin")) {
    router.replace("/login");
    return null;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
