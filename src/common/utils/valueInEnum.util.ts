export const valueInEnum = (value: string, _enum: object): boolean => {
  return Object.values(_enum).includes(value);
};
