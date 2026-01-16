import { ChangeEvent } from "react";

interface TextareaProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  label: string;
  name: string;
  placeholder: string;
  rows: number;
  isvalid?: boolean;
  errorMessage?: string;
}

export const CustomTextarea = ({
  onChange,
  value,
  label,
  name,
  placeholder,
  rows,
  isvalid,
  errorMessage,
}: TextareaProps) => {
  const baseStyles = `w-full block p-2 rounded-md bg-gray-light text-slate-700 placeholder-slate-400 transition-all duration-200 resize-none`;
  const focusStyles = `focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-transparent`;
  return (
    <>
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <textarea
          rows={rows}
          onChange={onChange}
          name={name}
          value={value}
          placeholder={placeholder}
          className={`${baseStyles} ${focusStyles}`}
        ></textarea>
      </div>
      {!isvalid && errorMessage && (
        <div className="mt-1">
          <span className="text-xs text-red-500 animate-in fade-in slide-in-from-top-1">
            {errorMessage}
          </span>
        </div>
      )}
    </>
  );
};
