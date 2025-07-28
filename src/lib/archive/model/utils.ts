export const getYears = (from: number) => {
  // Проверка, что текущий год больше или равен from
  if (new Date().getFullYear() < from) {
    throw new Error('From year must be less than or equal to the current year')
  }

  // Создаем объект Date, используя год от
  let currentDate = new Date(from, 0)

  // Получаем количество лет от from до текущего года
  const yearsToCurrent = new Date().getFullYear() - from

  // Перебираем годы от заданного года до текущего
  return Array.from({ length: yearsToCurrent + 1 }, (_, i) => {
    // Устанавливаем год для текущего элемента массива
    currentDate.setFullYear(from + i)
    return currentDate.getFullYear()
  }).reverse()
}
