import { valid } from "@/src/shared/utils/validators";

export const registerFormValidators = {
  email: [valid.required("email"), valid.email()],
  password: [
    valid.required("password"),
    valid.min(8, "password"),
    valid.hasUppercase("password"),
    valid.hasNumber("password"),
  ],
  // confirmPassword: [valid.required("confirm password"), valid.compare("password", "password")],
};
