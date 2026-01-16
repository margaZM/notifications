import { ChangeEvent } from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  label: string;
  name: string;
  isvalid?: boolean;
  errorMessage?: string;
}

export const CustomSelect = ({
  options,
  onChange,
  value,
  label,
  name,
  isvalid,
  errorMessage,
}: SelectProps) => {
  const baseStyles = `w-full block p-2 rounded-md bg-gray-light text-slate-700 placeholder-slate-400 transition-all duration-200`;
  const focusStyles = `focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-transparent`;

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="mb-1.5 text-sm font-semibold text-slate-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`${baseStyles} ${focusStyles}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!isvalid && errorMessage && (
        <div className="mt-1">
          <span className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};
