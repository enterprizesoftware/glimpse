const GLIMPSE_CSS_PREFIX = 'glimpse-';

export function px(number: number) {
  return `${number}px`;
}

export function projPrefix(value: string) {
  return value.charAt(0) + GLIMPSE_CSS_PREFIX + value.substring(1);
}
