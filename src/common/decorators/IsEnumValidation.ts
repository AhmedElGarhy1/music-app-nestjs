import { IsEnum } from 'class-validator';

export function IsEnumValidation(enumType: Object) {
  return IsEnum(enumType, {
    message: ({ property }) =>
      `${property} must be one of ( ${Object.values(enumType).join(' | ')} )`,
  });
}
