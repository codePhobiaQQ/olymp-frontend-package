import { downloadFile } from './shared/download-file.ts'
import { generateQr } from './shared/generate-qr.ts'

/**
 * Генерация PDF с QR-кодом
 * @param {string} data - Данные для QR-кода
 * @param {Uint8Array} inputPdfBytes - Входной PDF в виде массива байтов
 * @param {number} qrSize - Размер QR-кода (по умолчанию 100)
 * @returns {Promise<Uint8Array>} Модифицированный PDF
 */
export async function generatePdfWithQr(
  data: string,
  inputPdfBytes: Uint8Array,
  qrSize = 100
): Promise<void> {
  // Динамически импортируем pdf-lib
  const { PDFDocument } = await import('pdf-lib')

  // Загружаем PDF
  const pdfDoc = await PDFDocument.load(inputPdfBytes)
  const qrCodeImage = await generateQr(data, pdfDoc)

  // Рассчитываем размеры QR-кода
  const qrWidth = qrSize
  const qrHeight = qrSize

  // Обрабатываем каждую страницу PDF
  const pages = pdfDoc.getPages()
  for (const page of pages) {
    const { width, height } = page.getSize()

    // Вставляем QR-код в правый верхний угол
    page.drawImage(qrCodeImage, {
      x: width - qrWidth - 10, // Отступ 10px от правого края
      y: height - qrHeight - 10, // Отступ 10px от верхнего края
      width: qrWidth,
      height: qrHeight,
    })
  }

  // Сохраняем PDF
  const pdfBytes = await pdfDoc.save()

  // Возвращаем модифицированный PDF
  downloadFile(pdfBytes)
}
