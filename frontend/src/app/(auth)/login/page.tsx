"use client";
import LoginViewMain from "@/src/modules/login/Main";
import { AuthDashboardLayout } from "@/src/shared/components/layouts/AuthLayout/AuthDashboardLayout";

export default function LoginPage() {
  return (
    <AuthDashboardLayout>
      <LoginViewMain />
    </AuthDashboardLayout>
  );
}
