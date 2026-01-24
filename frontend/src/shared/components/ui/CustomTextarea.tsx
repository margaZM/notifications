import { ChangeEvent, useEffect, useState } from "react";

interface TextareaProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  label: string;
  name: string;
  placeholder: string;
  rows: number;
  isvalid?: boolean;
  errorMessage?: string;
  id: string;
  validators?:
    | Array<(value: string, allValues?: Record<string, string>) => string | null>
    | ((value: string, allValues?: Record<string, string>) => string | null);
  allValues?: Record<string, string>;
  onIsValid?: (status: { id?: string; validInput: boolean; name: string }) => void;
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
  id,
  validators = [],
  allValues = {},
  onIsValid,
}: TextareaProps) => {
  const [error, setError] = useState(null as string | null);

  const baseStyles = `w-full block p-2 rounded-md bg-gray-light text-slate-700 placeholder-slate-400 transition-all duration-200 resize-none`;
  const focusStyles = `focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-transparent`;

  useEffect(() => {
    let currentError = null;
    const validatorList = Array.isArray(validators) ? validators : [validators];

    for (const validator of validatorList) {
      const msg = validator(value, allValues);
      if (msg) {
        currentError = msg;
        break;
      }
    }

    setError(currentError);

    if (onIsValid) {
      onIsValid({ id, name, validInput: !currentError });
    }
  }, [value, validators, allValues[id]]);
  return (
    <>
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <textarea
          id={id || name}
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
