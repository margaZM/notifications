import { ChangeEvent, FormEvent, useState } from "react";
import { generateErrors } from "@/src/shared/utils/validators";
import { loginFormValidators } from "../validator";

export const useLoginForm = (onSubmit: (values: any) => Promise<void>) => {
  const [formData, setFormData] = useState({
    fields: { email: "", password: "" },
    errors: {} as Record<string, string>,
    touched: {} as Record<string, boolean>,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newFields = { ...formData.fields, [name]: value };

    const { errors } = generateErrors(newFields, loginFormValidators);

    setFormData((prev) => ({
      ...prev,
      fields: newFields,
      errors: { ...prev.errors, [name]: errors[name] || "" },
      touched: { ...prev.touched, [name]: true },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { isValid, errors } = generateErrors(formData.fields, loginFormValidators);

      if (!isValid) {
        setFormData((prev) => ({ ...prev, errors, touched: { email: true, password: true } }));
        return;
      }

      await onSubmit(formData.fields);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isFormValid =
    Object.keys(generateErrors(formData.fields, loginFormValidators).errors).length === 0;

  return { handleChange, handleSubmit, formData, isFormValid, validators: loginFormValidators };
};
