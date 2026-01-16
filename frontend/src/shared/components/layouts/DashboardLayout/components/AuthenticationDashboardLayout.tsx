"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/src/shared/stores/useAuthStore";
import { LoadingScreen } from "../../../ui/LoadingScreen";

export const AuthenticationDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { isAuthenticated, checkAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof checkAuth === "function") {
      checkAuth();
    }
    setIsHydrated(true);
  }, [checkAuth]);

  useEffect(() => {
    if (isHydrated && !isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [isAuthenticated, isHydrated, router, pathname]);

  if (!isHydrated || (!isAuthenticated && pathname !== "/login")) {
    return <LoadingScreen />;
  }
  return <>{children}</>;
};
