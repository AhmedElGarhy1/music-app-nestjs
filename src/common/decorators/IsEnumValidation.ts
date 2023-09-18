import { IsEnum } from 'class-validator';

export function isEnumValidation(enumType: Object) {
  return IsEnum(enumType, {
    message: ({ property }) =>
      `${property} must be one of ( ${Object.values(enumType).join(' | ')} )`,
  });
}
