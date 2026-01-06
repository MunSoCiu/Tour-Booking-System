"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function AuthGuard({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "admin" | "user";
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(`/login?redirect=${pathname}`);
      return;
    }

    if (role && user.role !== role) {
      router.replace("/");
    }
  }, [user, loading, role, pathname, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Đang kiểm tra đăng nhập…
      </div>
    );
  }

  return <>{children}</>;
}
