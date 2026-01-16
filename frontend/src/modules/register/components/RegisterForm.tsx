"use client";
import { CustomInput } from "../../../shared/components/ui/CustomInput";
import { CustomButton } from "../../../shared/components/ui/CustomButton";
import { useRegisterForm } from "@/src/modules/register/hooks/useRegisterUser";

interface RegisterFormProps {
  onSubmit: (values: any) => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm = ({ onSubmit, isLoading }: RegisterFormProps) => {
  const { handleChange, handleSubmit, formData, isFormValid } = useRegisterForm(onSubmit);
  const { email, password } = formData.fields;
  const { errors } = formData;

  console.log(isFormValid, "isFormValid");

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
        placeholder="Create a password"
        value={password}
        onChange={handleChange}
        isvalid={!errors.password}
        message={errors.password}
      />
      <CustomButton type="submit" loading={isLoading} disabled={!isFormValid}>
        Create Account
      </CustomButton>
    </form>
  );
};
