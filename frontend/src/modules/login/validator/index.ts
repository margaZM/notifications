import { valid } from "@/src/shared/utils/validators";

export const loginFormValidators = {
  email: [valid.required("email"), valid.email()],
  password: [valid.required("password")],
};
