import { isValidEmail } from "@/src/shared/utils/validators";
import { ChangeEvent, FormEvent, useState } from "react";

const validators = {
  email: (value: string) => {
    let message;
    if (!value) {
      message = "Email is required";
    } else if (!isValidEmail(value)) {
      message = "Invalid email";
    }
    return message;
  },
  password: (value: string) => {
    let message;
    if (!value) {
      message = "Password is required";
    } else if (value.length < 8) {
      message = "Password must be at least 8 characters";
    } else if (value.length > 20) {
      message = "Password must be less than 20 characters";
    } else if (!/[A-Z]/.test(value)) {
      message = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(value)) {
      message = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(value)) {
      message = "Password must contain at least one number";
    }
    return message;
  },
};

export const useRegisterForm = (onSubmit: (values: any) => Promise<void>) => {
  const [formData, setFormData] = useState({
    fields: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
    touched: {
      email: false,
      password: false,
    },
  });

  const { email, password } = formData.fields;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const error = validators[name as keyof typeof validators]?.(value);

    setFormData((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [name]: value,
      },
      errors: {
        ...prev.errors,
        [name]: error,
      },
      touched: {
        ...prev.touched,
        [name]: true,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const emailError = validators.email(email);
      const passwordError = validators.password(password);

      if (emailError || passwordError) {
        setFormData((prev: any) => {
          return {
            ...prev,
            errors: {
              email: emailError,
              password: passwordError,
            },
            touched: {
              email: true,
              password: true,
            },
          };
        });
      }
      await onSubmit(formData.fields);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isFormValid =
    !!formData.fields.email &&
    !formData.errors.email &&
    !!formData.fields.password &&
    !formData.errors.password;

  return { handleChange, handleSubmit, formData, isFormValid };
};
