export const isValidEmail = (email: string) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  console.log(isValid);
  return isValid;
};

type CallbackFunction = (value: any, fieldValues: any) => boolean;

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isNullOrEmptyString = (value: any) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (Array.isArray(value) && value.length === 0);

export const valid = {
  match:
    (testFn: CallbackFunction, message: string = "") =>
    (value: any, fieldValues: any) =>
      !testFn(value, fieldValues) ? message : null,

  required: (keyword: string) => (value: any) =>
    isNullOrEmptyString(value) ? `El ${keyword || "campo"} es obligatorio` : null,

  min: (min: number, keyword: string) => (value: string) =>
    value && value.length < min
      ? `El ${keyword || "campo"} debe ser de al menos ${min} dígitos`
      : null,

  max: (max: number, keyword: string) => (value: string) =>
    value && value.length > max
      ? `El ${keyword || "campo"} debe ser máximo de ${max} dígitos`
      : null,

  exact: (num: number, keyword: string) => (value: string) =>
    value && value.length !== num ? `El ${keyword || "campo"} debe tener ${num} dígitos` : null,

  number: (keyword: string) => (value: string) =>
    value && !/^\d+$/.test(value) ? `El ${keyword || "campo"} solo permite números` : null,

  email: () => (value: string) =>
    value && !EMAIL_REGEX.test(value) ? "El campo debe ser un formato de email correcto" : null,

  oneOf: (allowedValues: string[], keyword: string) => (value: any) =>
    value && !allowedValues.includes(value) ? `El valor de ${keyword} no es válido` : null,
};

export const generateErrors = (fieldValues: any, fieldValidators: any) => {
  const errors: Record<string, string> = {};
  let isValid = true;

  Object.entries(fieldValidators).forEach(([fieldName, validators]: [string, any]) => {
    const value = fieldValues[fieldName];
    const validatorList = Array.isArray(validators) ? validators : [validators];

    for (const validator of validatorList) {
      const errorMessage = validator(value, fieldValues);
      if (errorMessage) {
        errors[fieldName] = errorMessage;
        isValid = false;
        break;
      }
    }
  });

  return { isValid, errors };
};
