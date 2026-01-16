import { ChangeEvent, FocusEvent } from "react";

interface InputProps {
  id?: string;
  label: string;
  type: string;
  name: string;
  message?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  isvalid?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  placeholder?: string;
}

export const CustomInput = ({
  id,
  label,
  type,
  name,
  message,
  value,
  onChange,
  onBlur,
  onFocus,
  isvalid,
  disabled,
  autofocus,
  placeholder,
}: InputProps) => {
  const baseStyles = `w-full block p-2 rounded-md bg-gray-light text-slate-700 placeholder-slate-400 transition-all duration-200`;
  const focusStyles = `focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-transparent`;

  console.log(name, label, value, "input");

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className={`mb-1.5 text-sm  transition-colors text-gray-700 font-medium`}
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          autoFocus={autofocus}
          autoComplete="off"
          className={`${baseStyles} ${focusStyles}`}
          placeholder={placeholder}
        />
      </div>

      {!isvalid && message && (
        <div className="mt-1">
          <span className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
            {message}
          </span>
        </div>
      )}
    </div>
  );
};
