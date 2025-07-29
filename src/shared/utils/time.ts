import dayjs from 'dayjs'

export function dateToUnixWithLastMinute(dateString: string) {
  let date = dayjs(dateString).hour(23).minute(59).second(59)
  return date.unix()
}

export const formatTime = (milliseconds: number): string => {
  const date = new Date(milliseconds)
  // Форматируем дату
  const day = date.getUTCDate().toString().padStart(2, '0')
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0') // Месяцы от 0 до 11
  const year = date.getUTCFullYear()
  // Форматируем время
  const hours = date.getUTCHours().toString().padStart(2, '0')
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  // Возвращаем дату и время в формате DD.MM.YYYY HH:MM
  return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const getGradeFromGraduationYear = (graduationYear: number): number | null => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const currentYear = month >= 9 ? now.getFullYear() : now.getFullYear() - 1;
  const grade = 11 - (graduationYear - currentYear);
  if (grade < 1 || grade > 11) return null; // вне школьных рамок
  return grade;
};

export const getGraduationYearFromGrade = (grade: number): number | null => {
  if (grade < 1 || grade > 11) return null;
  const now = new Date();
  const month = now.getMonth() + 1;
  const currentYear = month >= 9 ? now.getFullYear() : now.getFullYear() - 1;
  return currentYear + (11 - grade);
};