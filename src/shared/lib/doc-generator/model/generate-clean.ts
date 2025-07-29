import { downloadFile } from './shared/download-file'
import { generateQr } from './shared/generate-qr'
import { error } from '@app/lib/notification'
import ClipSvg from '/svg/decore/clip.png'

const DOC_TITLE = 'Олимпиада чистовик'
const FILE_NAME = 'Олимпиада_чистовик.pdf'
const MARGIN = 30 // Отступ от края страницы для клеточек

// CELLS
const CELL_SIZE = 20
const CELLS_TOP_PADDING = 190
const CELLS_BOTTOM_PADDING = 80

export const generateClean = async () => {
  const { PDFDocument, rgb } = await import('pdf-lib')
  const fontkit = await import('@pdf-lib/fontkit')

  const pdfDoc = await PDFDocument.create()
  pdfDoc.setTitle(DOC_TITLE)
  pdfDoc.registerFontkit(fontkit.default)

  const page = pdfDoc.addPage([595, 842])

  const { width, height } = page.getSize()

  // -------------------------
  // --- Настройка шрифтов ---
  // -------------------------

  let fontUrl = '/fonts/Montserrat-Regular.woff2' // Path to the font
  let response = await fetch(fontUrl)
  if (!response.ok) {
    error({ text: 'Не удалось загрузить файл шрифта...' })
    return
  }
  let fontBytes = await response.arrayBuffer()
  const customFont = await pdfDoc.embedFont(fontBytes)

  const fontMediumUrl = '/fonts/Montserrat-SemiBold.woff2' // Path to the font
  const responseMedium = await fetch(fontMediumUrl)
  if (!responseMedium.ok) {
    error({ text: 'Не удалось загрузить файл шрифта...' })
    return
  }
  const fontBytesMedium = await responseMedium.arrayBuffer()
  const customMediumFont = await pdfDoc.embedFont(fontBytesMedium)

  // -----------------------
  // ------ Клеточки -------
  // -----------------------

  for (let x = MARGIN; x < width - MARGIN; x += CELL_SIZE) {
    for (let y = CELLS_BOTTOM_PADDING; y < height - CELLS_TOP_PADDING; y += CELL_SIZE) {
      page.drawRectangle({
        x,
        y,
        width: CELL_SIZE,
        height: CELL_SIZE,
        borderColor: rgb(0.5, 0.5, 0.5),
        borderWidth: 0.5,
      })
    }
  }

  // --------------------------
  // ----- Номер варианта -----
  // --------------------------

  const variantText = 'Вариант № ____'
  const variantFontSize = 12 // Размер шрифта для текста "Вариант No ____"

  // Позиция по горизонтали (центрируем)
  const variantXPosition = MARGIN
  // Позиция по вертикали (немного выше клеточек)
  const variantYPosition = height - CELLS_TOP_PADDING + 30 // Отступаем от верхнего края клеточек

  // Добавляем текст "Вариант No ____"
  page.drawText(variantText, {
    x: variantXPosition,
    y: variantYPosition,
    size: variantFontSize,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // --------------------------
  // ---- Таблица проверки ----
  // --------------------------

  // Размеры ячеек таблицы
  const tableCellWidth = 20
  const tableCellHeight = 20
  const tableColumns = 8

  // Позиция для таблицы справа от клеточек
  let tableXPosition = width - MARGIN - tableCellWidth * tableColumns // Отступ от правого края страницы
  const tableYPosition = height - CELLS_TOP_PADDING + 30 // Немного выше клеточек
  // Размер шрифта для текста в ячейках
  const tableFontSize = 10

  // ----- ПОДПИСЬ -----
  const signText = 'Подпись'
  const lineWidth = customFont.widthOfTextAtSize(signText, tableFontSize)
  const signPadding = 3
  const signatureCellWidth = lineWidth + signPadding * 2

  page.drawText(signText, {
    x: width - MARGIN - lineWidth - signPadding,
    y: tableYPosition + tableCellHeight + tableCellHeight / 2 - tableFontSize * 0.33, // Центрируем по вертикали
    size: tableFontSize,
    font: customFont,
    color: rgb(0, 0, 0),
  })
  page.drawRectangle({
    x: width - MARGIN - signatureCellWidth,
    y: tableYPosition + tableCellHeight,
    width: signatureCellWidth,
    height: tableCellHeight,
    borderColor: rgb(0, 0, 0), // Цвет границ ячеек
    borderWidth: 0.5,
  })
  page.drawRectangle({
    x: width - MARGIN - signatureCellWidth,
    y: tableYPosition,
    width: signatureCellWidth,
    height: tableCellHeight,
    borderColor: rgb(0, 0, 0), // Цвет границ ячеек
    borderWidth: 0.5,
  })
  // --------------------

  // ------ OTHERS ------
  tableXPosition = width - MARGIN - tableCellWidth * tableColumns - signatureCellWidth

  // Рисуем подпись над таблицей
  const tableLabelText = 'Таблица проверки'
  // Добавляем текст "Таблица проверки" сверху таблицы
  page.drawText(tableLabelText, {
    x: tableXPosition,
    y: tableYPosition + 2 * tableCellHeight + 10, // Немного отступаем сверху
    size: tableFontSize,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // Рисуем верхнюю строку таблицы (с числами и "Подпись")
  const headers = ['1', '2', '3', '4', '5', '6', '7', '8']
  for (let i = 0; i < tableColumns; i++) {
    page.drawText(headers[i], {
      x: tableXPosition + (i + 0.5) * tableCellWidth - tableFontSize * 0.33,
      y: tableYPosition + tableCellHeight + tableCellHeight / 2 - tableFontSize * 0.33, // Немного отступаем сверху от ячейки
      size: tableFontSize,
      font: customFont,
      color: rgb(0, 0, 0),
    })

    page.drawRectangle({
      x: tableXPosition + i * tableCellWidth,
      y: tableYPosition + tableCellHeight,
      width: tableCellWidth,
      height: tableCellHeight,
      borderColor: rgb(0, 0, 0), // Цвет границ ячеек
      borderWidth: 0.5,
    })
  }

  // Рисуем нижнюю строку таблицы (пустые ячейки)
  for (let i = 0; i < tableColumns; i++) {
    page.drawRectangle({
      x: tableXPosition + i * tableCellWidth,
      y: tableYPosition,
      width: tableCellWidth,
      height: tableCellHeight,
      borderColor: rgb(0, 0, 0), // Цвет границ ячеек
      borderWidth: 0.5,
    })
  }

  // --------------------------
  // -- Текст под клеточками --
  // --------------------------

  const footerText = '* Работа выполняется только на лицевой стороне листа'
  const notificationSize = 10 // Размер шрифта для нижнего текста

  // Позиция по горизонтали (слева)
  const footerXPosition = MARGIN // Отступ от левого края страницы
  // Позиция по вертикали (недалеко от нижнего края)
  const footerYPosition = CELLS_BOTTOM_PADDING - 20 // Немного отступаем от нижнего края клеточек

  // Добавляем текст в нижнюю часть страницы
  page.drawText(footerText, {
    x: footerXPosition,
    y: footerYPosition,
    size: notificationSize,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // --------------------------
  // ----- Номер страницы -----
  // --------------------------

  const pageText = 'Страница ____ из ____'
  const pageLabelSize = 14 // Размер шрифта для нижнего текста

  // Добавляем текст "Страница ____ из ____" для каждой страницы
  const textWidth = customFont.widthOfTextAtSize(pageText, pageLabelSize)
  // Позиция по горизонтали (центрируем)
  const pageXPosition = (width - textWidth) / 2
  // Позиция по вертикали (недалеко от нижнего края страницы)
  const pageYPosition = CELLS_BOTTOM_PADDING - 55

  // Рисуем текст на странице
  page.drawText(pageText, {
    x: pageXPosition,
    y: pageYPosition,
    size: pageLabelSize,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // --------------------------
  // Линия в левом верхнем углу
  // --------------------------

  const LINE_LENGTH = 100 // Длина линии

  page.drawLine({
    start: { x: 0, y: height - LINE_LENGTH },
    end: { x: LINE_LENGTH, y: height },
    color: rgb(0.5, 0.5, 0.5), // Черный цвет линии
    thickness: 1, // Толщина линии
  })

  const clipIconBytes = await fetch(ClipSvg).then((res) => res.arrayBuffer())
  const clipImage = await pdfDoc.embedPng(clipIconBytes)
  const clipIconWidth = 30 // Ширина иконки
  const clipIconHeight = 30 // Высота иконки

  page.drawImage(clipImage, {
    x: 13, // Отступ от левого края
    y: height - clipIconHeight - 13, // Отступ от верхнего края
    width: clipIconWidth,
    height: clipIconHeight,
  })

  // -----------------
  // --- Заголовок ---
  // -----------------

  const title = 'Диагностические контрольные работы\n(2 тур)\nЧерновик'
  const fontSize = 12
  const lineInterval = 7

  // Разбиваем текст на строки
  const lines = title.split('\n')

  // Позиция для текста по вертикали
  let yPosition = height - 30 // Начальная вертикальная позиция для первого ряда

  // Добавляем текст на страницу
  for (const line of lines) {
    // Получаем ширину каждой строки
    const lineWidth = customMediumFont.widthOfTextAtSize(line, fontSize)
    // Позиция по горизонтали (центрируем)
    const xPosition = (width - lineWidth) / 2

    // Рисуем текст на странице
    page.drawText(line, {
      x: xPosition,
      y: yPosition,
      size: fontSize,
      font: customMediumFont,
      color: rgb(0, 0, 0),
    })

    // Обновляем вертикальную позицию для следующей строки
    yPosition -= fontSize + lineInterval
  }

  // -----------------
  // Генерация QR-кода
  // -----------------

  const qrImage = await generateQr(JSON.stringify({ test: 'Test' }), pdfDoc)
  const QR_SIZE = 70
  const QR_TOP_PADDING = 10

  page.drawImage(qrImage, {
    x: width - QR_SIZE - MARGIN + 10,
    y: height - QR_SIZE - QR_TOP_PADDING,
    width: QR_SIZE,
    height: QR_SIZE,
  })

  // -----------------

  // Сохраняем PDF в байты
  const pdfBytes = await pdfDoc.save()
  // Сохраняем PDF в файл
  downloadFile(pdfBytes, FILE_NAME)
}
