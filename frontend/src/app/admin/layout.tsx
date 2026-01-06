"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
