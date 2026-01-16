import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";

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

const Input = ({
  label,
  value,
  onChange,
  validators = [],
  id,
  allValues = {}, // Necesario para validaciones cruzadas (match)
  onIsValid,
  placeholder,
  type = "text",
  className = "",
}: InputProps) => {
  const [error, setError] = useState(null);

  // Ejecutar validaciones cuando el valor o las reglas cambien
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

    // Notificar al padre si este input específico es válido
    if (onIsValid) {
      onIsValid({ id: elementId, validInput: !currentError });
    }
  }, [value, validators, allValues[elementId]]);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        id={elementId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
