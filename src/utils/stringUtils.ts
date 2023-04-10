import { Currency } from '@src/types';

export function createUUID(): string {
  const uuid = crypto.randomUUID();
  return uuid;
}

export function formatNumber(
  number: number,
  options?: {
    decimals?: number;
    currency?: Currency;
  }
): string {
  if (options?.currency) {
    switch (options.currency) {
      case Currency.USD:
        if (Number.isInteger(number)) {
          return `${options.currency}${number.toLocaleString('en-US')}`;
        }

        return `${options.currency}${number.toLocaleString('en-US', {
          minimumFractionDigits: options?.decimals,
          maximumFractionDigits: options?.decimals,
        })}`;
      case Currency.EURO:
        if (Number.isInteger(number)) {
          return `${options.currency}${number.toLocaleString('en-EU')}`;
        }

        return `${options.currency}${number.toLocaleString('en-EU', {
          minimumFractionDigits: options?.decimals,
          maximumFractionDigits: options?.decimals,
        })}`;
      case Currency.SEK:
      default:
        if (Number.isInteger(number)) {
          return `${number.toLocaleString('sv-SE')} ${options.currency}`;
        }

        return `${number.toLocaleString('sv-SE', {
          minimumFractionDigits: options?.decimals,
          maximumFractionDigits: options?.decimals,
        })} ${options.currency}`;
    }
  }

  if (Number.isInteger(number)) {
    return number.toLocaleString(undefined);
  }

  return number.toLocaleString(undefined, {
    minimumFractionDigits: options?.decimals,
    maximumFractionDigits: options?.decimals,
  });
}
