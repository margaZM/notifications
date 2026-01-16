"use client";
import RegisterViewMain from "@/src/modules/register/Main";
import { AuthDashboardLayout } from "@/src/shared/components/layouts/AuthLayout/AuthDashboardLayout";

export default function RegisterPage() {
  return (
    <AuthDashboardLayout>
      <RegisterViewMain />
    </AuthDashboardLayout>
  );
}
