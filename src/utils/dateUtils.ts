const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getNameOfDay(date: Date) {
  return DAY_NAMES[date.getDay()];
}

export function getNameOfMonth(date: Date, options?: { short?: boolean }) {
  const monthName = MONTH_NAMES[date.getMonth()];

  if (options?.short) {
    return monthName.substr(0, 3);
  }

  return monthName;
}

export function getNumDaysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Formats a date into a string.
 * By default, the date will be formatted as "1 January 2021".
 * Configure the `style` parameter to change the format.
 * @param date The date to format.
 * @param style Specifies the format of the date.
 * @returns The formatted date.
 */
export function formatDate(
  date: Date,
  style?: {
    /**
     * If true, the date will be formatted as "1/1/2021".
     * Overrides `short` and `weekday` options.
     * @default false
     */
    numeric?: boolean;
    /**
     * If true, the date will be formatted as "1 Jan 2021".
     * @default false
     */
    short?: boolean;
    /**
     * If true, the date will be formatted as "Monday 1 January 2021".
     * If `short` is also true, the day and month names will be shortened to 3 characters.
     * @default false
     */
    weekday?: boolean;
  }
) {
  if (typeof date === 'string') {
    console.warn(
      `Expected date to be a Date object, but received a string. Attempting to parse the string as a date. If this is not the desired behaviour, pass a Date object instead.`
    );
    date = new Date(date);
  }

  if (!date || isNaN(date.getTime())) {
    console.warn('Invalid date passed to formatDate', date);
    return 'Invalid date';
  }

  if (style?.numeric) {
    // 1/1/2021
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  if (style?.weekday) {
    if (style?.short) {
      // Mon 1 Jan 2021
      return `${getNameOfDay(date).substr(
        0,
        3
      )} ${date.getDate()} ${getNameOfMonth(date, {
        short: true,
      })} ${date.getFullYear()}`;
    }

    // Monday 1 January 2021
    return `${getNameOfDay(date)} ${date.getDate()} ${getNameOfMonth(
      date
    )} ${date.getFullYear()}`;
  }

  if (style?.short) {
    // 1 Jan 2021
    return `${date.getDate()} ${getNameOfMonth(date, {
      short: true,
    })} ${date.getFullYear()}`;
  }

  // 1 January 2021
  return `${date.getDate()} ${getNameOfMonth(date)} ${date.getFullYear()}`;
}
