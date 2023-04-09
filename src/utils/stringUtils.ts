export function createUUID(): string {
  const uuid = crypto.randomUUID();
  return uuid;
}

export function formatNumber(number: number, decimals?: number): string {
  if (Number.isInteger(number)) {
    return number.toLocaleString();
  }

  return number.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
