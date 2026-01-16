"use client";
import { RegisterForm } from "./components/RegisterForm";
import { ToastNotification } from "@/src/shared/components/ui/ToastNotification";
import { useNotification } from "@/src/shared/hooks/useNotification";
import { useMemo, useState } from "react";
import FooterRegister from "./components/FooterRegister";
import HeaderRegister from "./components/HeaderLogin";
import { ApiService } from "@/src/core/shared/infrastructure/api/ApiService";
import { UserRepository } from "@/src/core/auth/infrastructure/repositories/HttpUserRepository";
import { RegisterUserUseCase } from "@/src/core/auth/application/use-cases/RegisterUser";
import { saveToken } from "@/src/shared/utils/cookies";
import { useRouter } from "next/navigation";
import { AuthUserDto } from "@/src/core/auth/infrastructure/dtos/AuthUserDto";

export default function RegisterViewMain() {
  const [isLoading, setIsLoading] = useState(false);
  const { notification, showNotification, closeNotification } = useNotification();

  const router = useRouter();

  const registerUseCase = useMemo(() => {
    const apiService = new ApiService();
    const userRepository = new UserRepository(apiService);
    return new RegisterUserUseCase(userRepository);
  }, []);

  const handleRegister = async (values: AuthUserDto) => {
    try {
      setIsLoading(true);
      const user = await registerUseCase.execute(values);
      if (user.token) saveToken(user.token);
      showNotification("Registration successful!", "success");
      router.push("/");
    } catch (error: any) {
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {notification.isOpen && (
        <ToastNotification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
          <HeaderRegister />
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          <FooterRegister />
        </div>
      </div>
    </>
  );
}
