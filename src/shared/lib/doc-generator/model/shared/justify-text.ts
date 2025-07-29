export const justifyText = (
  text: string,
  maxWidth: number,
  font: any,
  fontSize: number,
  firstLineIndent = 0 // Отступ первой строки (красная строка)
) => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  let isFirstLine = true; // Флаг первой строки

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const lineWidth = font.widthOfTextAtSize(testLine, fontSize);

    // Учитываем отступ первой строки
    const effectiveMaxWidth = isFirstLine ? maxWidth - firstLineIndent : maxWidth;

    if (lineWidth < effectiveMaxWidth) {
      currentLine = testLine;
    } else {
      if (isFirstLine && currentLine) {
        // Добавляем отступ в первую строку
        currentLine = ' '.repeat(Math.round(firstLineIndent / font.widthOfTextAtSize(' ', fontSize))) + currentLine;
      }
      lines.push(currentLine);
      currentLine = word;
      isFirstLine = false; // Следующие строки уже без отступа
    }
  }
  if (currentLine) lines.push(currentLine);

  // Растягивание строк (кроме последней)
  return lines.map((line, index) => {
    if (index === lines.length - 1) return line; // Последнюю строку не растягиваем

    const wordsInLine = line.split(' ');
    if (wordsInLine.length === 1) return line; // Если слово одно — не растягиваем

    const totalSpaces = wordsInLine.length - 1;
    const extraSpace = (maxWidth - font.widthOfTextAtSize(line, fontSize)) / totalSpaces;

    return wordsInLine.join(' '.repeat(Math.max(1, Math.round(extraSpace / font.widthOfTextAtSize(' ', fontSize)))));
  });
};
