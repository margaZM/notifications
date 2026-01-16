"use client";
import { CustomInput } from "../../../shared/components/ui/CustomInput";
import { CustomButton } from "../../../shared/components/ui/CustomButton";
import { AuthUserDto } from "@/src/core/auth/infrastructure/dtos/AuthUserDto";
import { useLoginForm } from "../hooks/useLoginForm";

interface LoginFormProps {
  onSubmit: (values: AuthUserDto) => Promise<void>;
  isLoading: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const { handleChange, handleSubmit, formData, isFormValid } = useLoginForm(onSubmit);

  const { email, password } = formData.fields;
  const { errors } = formData;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <CustomInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleChange}
        isvalid={!errors.email}
        message={errors.email}
      />

      <CustomInput
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={handleChange}
        isvalid={!errors.password}
        message={errors.password}
      />

      <CustomButton type="submit" loading={isLoading} disabled={!isFormValid}>
        Sign In
      </CustomButton>
    </form>
  );
};
