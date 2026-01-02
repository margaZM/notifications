import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

export const CHANNEL_RULES = {
  EMAIL: {
    title: { min: 8, max: 50 },
    content: { min: 8, max: 400 },
  },
  SMS: {
    title: { min: 6, max: 30 },
    content: { min: 6, max: 130 },
  },
  PUSH: {
    title: { min: 6, max: 30 },
    content: { min: 6, max: 80 },
  },
} as const;

export type NotificationChannelKey = keyof typeof CHANNEL_RULES;
export type FieldType = "title" | "content";

@ValidatorConstraint({ name: "IsChannelFieldValid", async: false })
export class IsChannelFieldValidConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fieldType] = args.constraints as [FieldType];
    const object = args.object as any;
    const channel = object.channel as NotificationChannelKey;

    if (!channel || !CHANNEL_RULES[channel]) return false;

    const rule = CHANNEL_RULES[channel][fieldType];
    const length = String(value || "").length;

    return length >= rule.min && length <= rule.max;
  }

  defaultMessage(args: ValidationArguments) {
    const [fieldType] = args.constraints as [FieldType];
    const object = args.object as any;
    const channel = object.channel;
    const rule = CHANNEL_RULES[channel as NotificationChannelKey]?.[fieldType];

    if (!rule) {
      return `Configuración no encontrada para el canal "${channel}"`;
    }

    return `El campo "${args.property}" para el canal ${channel} debe tener entre ${rule.min} y ${rule.max} caracteres (actual: ${String(args.value).length})`;
  }
}

export function IsChannelFieldValid(fieldType: FieldType, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [fieldType],
      validator: IsChannelFieldValidConstraint,
    });
  };
}

export function IsAllowedChannel(allowedChannels: string[], validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: "IsAllowedChannel",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [allowedChannels],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [allowed] = args.constraints;
          return allowed.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `Channel "${args.value}" is not allowed. Supported: ${args.constraints[0].join(", ")}`;
        },
      },
    });
  };
}
