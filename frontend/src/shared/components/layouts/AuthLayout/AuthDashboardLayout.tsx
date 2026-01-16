import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/src/shared/stores/useAuthStore";
import { usePathname, useRouter } from "next/navigation";

export const AuthDashboardLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof checkAuth === "function") {
      checkAuth();
    }
    setIsHydrated(true);
  }, [checkAuth]);

  useEffect(() => {
    if (isHydrated && isAuthenticated && pathname === "/login") {
      router.push("/");
    }
  }, [isAuthenticated, isHydrated, router, pathname]);

  return (
    <div className="min-h-screen bg-gray-default flex flex-col items-center justify-center p-4 font-sans antialiased">
      {children}
    </div>
  );
};
