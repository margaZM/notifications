import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
}

export const CustomButton = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  ...props
}: CustomButtonProps) => {
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary-default text-white hover:bg-primary-default shadow-md shadow-gray-200",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
  };

  const baseStyles = `w-full cursor-pointer py-2.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100`;

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {loading ? <Loader2 className="animate-spin" size={20} /> : children}
    </button>
  );
};
