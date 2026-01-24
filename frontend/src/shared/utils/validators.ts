export const isValidEmail = (email: string) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    isNullOrEmptyString(value) ? `The ${keyword || "field"} is required` : null,

  min: (min: number, keyword: string) => (value: string) =>
    value && value.length < min
      ? `The ${keyword || "field"} should be at least ${min} characters long`
      : null,

  max: (max: number, keyword: string) => (value: string) =>
    value && value.length > max
      ? `The ${keyword || "field"} should be at most ${max} characters long`
      : null,

  exact: (num: number, keyword: string) => (value: string) =>
    value && value.length !== num ? `The ${keyword || "field"} should be ${num} characters` : null,

  number: (keyword: string) => (value: string) =>
    value && !/^\d+$/.test(value) ? `The ${keyword || "field"} should be a number` : null,

  email: () => (value: string) => (value && !EMAIL_REGEX.test(value) ? "Invalid email" : null),

  oneOf: (allowedValues: string[], keyword: string) => (value: any) =>
    value && !allowedValues.includes(value) ? `Invalid ${keyword}` : null,
  compare: (fieldToMatch: string, keyword: string) => (value: any, allValues: any) =>
    value !== allValues[fieldToMatch] ? `The ${keyword}s do not match` : null,
  hasUppercase: (keyword: string) => (value: string) =>
    value && !/[A-Z]/.test(value)
      ? `The ${keyword} must contain at least one uppercase letter`
      : null,
  hasNumber: (keyword: string) => (value: string) =>
    value && !/\d/.test(value) ? `The ${keyword} must contain at least one number` : null,
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
