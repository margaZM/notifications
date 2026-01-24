"use client";
import { CustomInput } from "../../../shared/components/ui/CustomInput";
import { CustomButton } from "../../../shared/components/ui/CustomButton";
import { useRegisterForm } from "@/src/modules/register/hooks/useRegisterUser";

interface RegisterFormProps {
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
  const { handleChange, handleSubmit, formData, isFormValid, validators } =
    useRegisterForm(onSubmit);
  const { email, password } = formData.fields;
  const { errors, touched } = formData;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <CustomInput
        id="email"
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleChange}
        isvalid={!touched.email || !errors.email}
        message={touched.email ? errors.email : ""}
        validators={validators.email}
      />
      <CustomInput
        id="password"
        label="Password"
        name="password"
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={handleChange}
        isvalid={!touched.password || !errors.password}
        message={touched.password ? errors.password : ""}
        validators={validators.password}
      />
      <CustomButton type="submit" loading={isLoading} disabled={!isFormValid}>
        Create Account
      </CustomButton>
    </form>
  );
};
