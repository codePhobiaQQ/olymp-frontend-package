export function convertArabicToRoman(arabicNumber?: number): string {
  if (arabicNumber === undefined || isNaN(arabicNumber)) {
    return ''
  }

  const romanNumerals = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' },
  ]

  let result = ''

  for (const numeral of romanNumerals) {
    while (arabicNumber >= numeral.value) {
      result += numeral.symbol
      arabicNumber -= numeral.value
    }
  }

  return result
}
