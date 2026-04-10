export function formatDate(dateTime: string | Date): string {
  if (!dateTime) return '';

  if (typeof dateTime === 'string') {
    const date = new Date(dateTime.includes('T') ? dateTime : `${dateTime}T00:00:00Z`);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }

  return dateTime.toLocaleTimeString('pt-BR', { timeZone: 'UTC' });
}

export function parseToISODate(dateString: string): string {
    if (!dateString) return '';
    const clean = dateString.replace(/\D/g, '');
    if (clean.length !== 8) return '';
    const day = clean.slice(0, 2);
    const month = clean.slice(2, 4);
    const year = clean.slice(4, 8);
    return new Date(`${year}-${month}-${day}T04:00:00.000Z`).toISOString();
}

export function formatMSqDate(date: string | Date | undefined) {
  if (!date) {
    return 'Não informado';
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return 'Data inválida';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} às ${hours}:${minutes}`;
}

/**
 * Calcula a idade com base na data de nascimento.
 * @param birthDate - A data de nascimento no formato Date ou string.
 * @returns A idade calculada.
 */
export function calculateAge(birthDate: Date | string): number {
  // Converte a string para Date se necessário
  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();

  // Ajusta a idade se o aniversário ainda não ocorreu neste ano
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * Checks if the end date is after the start date.
 *
 * @param params - An object containing the start and end month/year.
 * @param params.startMonth - The start month (0-based, 0 for January, 11 for December).
 * @param params.startYear - The start year.
 * @param params.endMonth - The end month (0-based, 0 for January, 11 for December).
 * @param params.endYear - The end year.
 * @returns `true` if the end date is after the start date, otherwise `false`.
 */
export function isEndDateAfterStartDate({
  startMonth,
  startYear,
  endMonth,
  endYear,
}: {
  startMonth: number;
  startYear: number;
  endMonth: number;
  endYear: number;
}) {
  const start = new Date(startYear, startMonth, 1);
  const end = new Date(endYear, endMonth, 1);
  return end > start;
}

export function getDifferenceInDays(publicationDate: string) {
  const now = new Date();
  const diff = Math.abs(now.getTime() - new Date(publicationDate).getTime());
  return Math.ceil(diff / (1000 * 3600 * 24) - 1);
}

export function getDifferenceInHours(startTime: string, endTime: string): number {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startDate = new Date();
  startDate.setHours(startHour, startMinute, 0);

  const endDate = new Date();
  endDate.setHours(endHour, endMinute, 0);

  const diffMs = endDate.getTime() - startDate.getTime(); // Ensure it's a number
  return diffMs / (1000 * 60 * 60); // Convert ms to hours
}

export const isLeapYear = (year: number): boolean =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const isValidDayMonth = (value: string): boolean => {
  const [dayStr, monthStr] = value.split('/');
  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  if (isNaN(day) || isNaN(month) || month < 1 || month > 12) return false;
  const maxDays = [
    31,
    isLeapYear(new Date().getFullYear()) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return day >= 1 && day <= maxDays[month - 1];
};
