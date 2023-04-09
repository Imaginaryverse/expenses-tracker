export function getNumDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function formatDate(date: Date, now: Date = new Date()) {
  const nameOfDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
    date.getDay()
  ];

  const nameOfMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ][date.getMonth()];

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return `Today ${date.getDate()} ${nameOfMonth} ${date.getFullYear()}`;
  }

  return `${nameOfDay} ${date.getDate()} ${nameOfMonth} ${date.getFullYear()}`;
}
