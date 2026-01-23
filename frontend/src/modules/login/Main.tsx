"use client";
import { LoginForm } from "./components/LoginForm";
import { ToastNotification } from "@/src/shared/components/ui/ToastNotification";
import { useNotification } from "@/src/shared/hooks/useNotification";
import { useMemo, useState } from "react";
import HeaderLogin from "./components/HeaderLogin";
import FooterLogin from "./components/FooterLogin";
import { AuthUserDto } from "@/src/core/auth/infrastructure/dtos/AuthUserDto";
import { ApiService } from "@/src/core/shared/infrastructure/api/ApiService";
import { UserRepository } from "@/src/core/auth/infrastructure/repositories/HttpUserRepository";
import { LoginUserUseCase } from "@/src/core/auth/application/use-cases/LoginUser";
import { saveToken } from "@/src/shared/utils/cookies";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/shared/stores/useAuthStore";

export default function LoginViewMain() {
  const [isLoading, setIsLoading] = useState(false);
  const { notification, showNotification, closeNotification } = useNotification();
  const { setUser } = useAuthStore();

  const router = useRouter();

  const loginUseCase = useMemo(() => {
    const apiService = new ApiService();
    const userRepository = new UserRepository(apiService);
    return new LoginUserUseCase(userRepository);
  }, []);

  const handleLogin = async (values: AuthUserDto) => {
    try {
      setIsLoading(true);
      const user = await loginUseCase.execute(values);
      setUser(user);
      if (user.token) saveToken(user.token);
      showNotification("Welcome back! Login successful.", "success");
      router.push("/");
    } catch (error: any) {
      console.log(error);
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
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-50">
          <HeaderLogin />
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          <FooterLogin />
        </div>
      </div>
    </>
  );
}
