export function isNil(value: any) {
  return value == null;
}

export function isAssigned(value: any) {
  return !isNil(value);
}
