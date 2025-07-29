import { downloadFile } from './shared/download-file'
import { generateQr } from './shared/generate-qr'
import { writeTextInCells } from './shared/write-text-in-ceils'
import { error } from '@app/lib/notification'
import ClipSvg from '/svg/decore/clip.png'
import { justifyText } from './shared/justify-text'

const DOC_TITLE = 'Анкета участника'
const FILE_NAME = 'Aнкета_Участника.pdf'
const CELL_SIZE = 16
const MARGIN = 30
const QR_SIZE = 200

export const generateBlank = async (props: {
  classSpecific: string
  name: string
  lastName: string
  secondName: string
  passport: string
  birth_date: string
  school: string
  snils: string
  phone: string
  email: string
}) => {
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

  let fontUrl = '/fonts/Montserrat-Regular.ttf'
  let response = await fetch(fontUrl)
  if (!response.ok) {
    error({ text: 'Не удалось загрузить файл шрифта...' })
    return
  }
  let fontBytes = await response.arrayBuffer()
  const customFont = await pdfDoc.embedFont(fontBytes)

  const fontMediumUrl = '/fonts/Montserrat-Bold.ttf'
  response = await fetch(fontMediumUrl)

  if (!response.ok) {
    error({ text: 'Не удалось загрузить файл шрифта...' })
    return
  }
  fontBytes = await response.arrayBuffer()
  const customMediumFont = await pdfDoc.embedFont(fontBytes)

  const LINE_LENGTH = 100

  page.drawLine({
    start: { x: 0, y: height - LINE_LENGTH },
    end: { x: LINE_LENGTH, y: height },
    color: rgb(0.5, 0.5, 0.5),
    thickness: 1,
  })

  const clipIconBytes = await fetch(ClipSvg).then((res) => res.arrayBuffer())
  const clipImage = await pdfDoc.embedPng(clipIconBytes)
  const clipIconWidth = 30
  const clipIconHeight = 30

  page.drawImage(clipImage, {
    x: 13,
    y: height - clipIconHeight - 13,
    width: clipIconWidth,
    height: clipIconHeight,
  })

  // -----------------
  // --- Заголовок ---
  // -----------------

  const title = 'Диагностические контрольные работы\n(2 тур)\nАнкета участника\n\n3585 5088 9720'
  let fontSize = 12
  let lineInterval = 5

  const lines = title.split('\n')
  let titleYPosition = height - 30 // Начальная вертикальная позиция для первого ряда

  for (const line of lines) {
    const lineWidth = customMediumFont.widthOfTextAtSize(line, fontSize)
    const xPosition = (width - lineWidth) / 2
    page.drawText(line, {
      x: xPosition - QR_SIZE * 0.25,
      y: titleYPosition,
      size: fontSize,
      font: customMediumFont,
      color: rgb(0, 0, 0),
    })
    titleYPosition -= fontSize + lineInterval
  }

  // ----------------------
  // Параметры текста
  // ----------------------
  fontSize = 12
  lineInterval = 14

  // ----------------------
  // ВУЗ проведения олимпиады
  // ----------------------
  titleYPosition -= 20

  const olympiadUniversityLabel = 'ВУЗ проведения олимпиады:'
  const olympiadUniversityValue = 'Академия ФСБ России'

  page.drawText(olympiadUniversityLabel, {
    x: MARGIN,
    y: titleYPosition,
    size: fontSize,
    font: customMediumFont,
    color: rgb(0, 0, 0),
  })

  const universityValueY = titleYPosition - lineInterval

  page.drawText(olympiadUniversityValue, {
    x: MARGIN,
    y: universityValueY,
    size: fontSize,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // Подчеркивание
  const universityValueWidth = customFont.widthOfTextAtSize(olympiadUniversityValue, fontSize)
  page.drawLine({
    start: { x: MARGIN, y: universityValueY - 2 },
    end: { x: MARGIN + universityValueWidth, y: universityValueY - 2 },
    thickness: 1,
    color: rgb(0, 0, 0),
  })

  // ----------------------
  // Организатор олимпиады
  // ----------------------
  titleYPosition -= fontSize + lineInterval * 2 // Смещаем ниже

  const organizerLabel = 'Организатор олимпиады:'
  const organizerValue = 'Академия ФСБ России'

  page.drawText(organizerLabel, {
    x: MARGIN,
    y: titleYPosition,
    size: fontSize,
    font: customMediumFont,
    color: rgb(0, 0, 0),
  })

  const organizerValueY = titleYPosition - lineInterval

  page.drawText(organizerValue, {
    x: MARGIN,
    y: organizerValueY,
    size: fontSize,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // Подчеркивание
  const organizerValueWidth = customFont.widthOfTextAtSize(organizerValue, fontSize)
  page.drawLine({
    start: { x: MARGIN, y: organizerValueY - 2 },
    end: { x: MARGIN + organizerValueWidth, y: organizerValueY - 2 },
    thickness: 1,
    color: rgb(0, 0, 0),
  })
  // ------------------
  // ----- Данные -----
  // ------------------

  const DATA_PADDING = 32
  const DATA_GAP = 12

  let i = 0

  // Surname
  await writeTextInCells({
    cellSize: CELL_SIZE,
    font: customFont,
    fontSize: CELL_SIZE,
    page,
    label: 'Фамилия',
    chars: props.secondName.split(''),
    position: {
      x: MARGIN,
      y: height - QR_SIZE - DATA_PADDING,
    },
    fullLine: true,
  })

  // Name
  await writeTextInCells({
    cellSize: CELL_SIZE,
    font: customFont,
    fontSize: CELL_SIZE,
    page,
    label: 'Имя',
    chars: props.name.split(''),
    position: {
      x: MARGIN,
      y: height - QR_SIZE - DATA_PADDING - CELL_SIZE * ((i + 1) * 2) - DATA_GAP * (i + 1),
    },
    fullLine: true,
  })
  i++

  // Patronymic
  await writeTextInCells({
    cellSize: CELL_SIZE,
    font: customFont,
    fontSize: CELL_SIZE,
    page,
    label: 'Отчество',
    chars: props.lastName.split(''),
    position: {
      x: MARGIN,
      y: height - QR_SIZE - DATA_PADDING - CELL_SIZE * ((i + 1) * 2) - DATA_GAP * (i + 1),
    },
    fullLine: true,
  })
  i++

  // Passport Data
  await writeTextInCells({
    cellSize: CELL_SIZE,
    font: customFont,
    fontSize: CELL_SIZE,
    page,
    label: 'Паспортные данные',
    chars: props.passport.split(''),
    position: {
      x: MARGIN,
      y: height - QR_SIZE - DATA_PADDING - CELL_SIZE * ((i + 1) * 2) - DATA_GAP * (i + 1),
    },
    cellLimit: 11,
  })

  // Birth Date
  const birth_date = props.birth_date

  await writeTextInCells({
    cellSize: CELL_SIZE,
    font: customFont,
    fontSize: CELL_SIZE,
    page,
    label: 'Дата рождения',
    chars: birth_date.split(''),
    position: {
      x: MARGIN + CELL_SIZE * (birth_date.length + 9.5),
      y: height - QR_SIZE - DATA_PADDING - CELL_SIZE * ((i + 1) * 2) - DATA_GAP * (i + 1),
    },
    cellLimit: 10,
  })
  i++

  // SNILS
  const snils = props.snils

  await writeTextInCells({
    cellSize: CELL_SIZE,
    font: customFont,
    fontSize: CELL_SIZE,
    page,
    label: 'СНИЛС',
    chars: snils.split(''),
    position: {
      x: MARGIN,
      y: height - QR_SIZE - DATA_PADDING - CELL_SIZE * ((i + 1) * 2) - DATA_GAP * (i + 1),
    },
    cellLimit: 14,
  })
  i++

  // Phone Number
  const phone = props.phone

  await writeTextInCells({
    cellSize: CELL_SIZE,
    font: customFont,
    fontSize: CELL_SIZE,
    page,
    label: 'Телефон',
    chars: phone.split(''),
    position: {
      x: MARGIN,
      y: height - QR_SIZE - DATA_PADDING - CELL_SIZE * ((i + 1) * 2) - DATA_GAP * (i + 1),
    },
    cellLimit: 17,
  })
  i++

  // ------------------
  // ----- EMAIL ------
  // ------------------

  const emailLabel = 'E-mail: '
  const emailValue =  props.email
  const data_font_size = 12
  const data_gap = 20

  const labelWidth = customMediumFont.widthOfTextAtSize(emailLabel, data_font_size)
  const xPosition = MARGIN
  let yPosition =
    height - QR_SIZE - DATA_PADDING - CELL_SIZE * ((i + 1) * 2) - DATA_GAP * (i + 1) - 10

  // "E-mail:"
  page.drawText(emailLabel, {
    x: xPosition,
    y: yPosition,
    size: data_font_size,
    font: customMediumFont,
    color: rgb(0, 0, 0),
  })

  // Email
  page.drawText(emailValue, {
    x: xPosition + labelWidth,
    y: yPosition,
    size: data_font_size,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // ----------------------
  // Образовательное учреждение
  // ----------------------
  yPosition -= data_gap // Смещаем текст ниже

  const schoolLabel = 'Образовательное учреждение: '
  const schoolValue = props.school

  const schoolLabelWidth = customMediumFont.widthOfTextAtSize(schoolLabel, data_font_size)

  // "Образовательное учреждение:"
  page.drawText(schoolLabel, {
    x: xPosition,
    y: yPosition,
    size: data_font_size,
    font: customMediumFont,
    color: rgb(0, 0, 0),
  })

  // Значение (гимназия)
  page.drawText(schoolValue, {
    x: xPosition + schoolLabelWidth,
    y: yPosition,
    size: data_font_size,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // ----------------------
  // Класс
  // ----------------------
  yPosition -= data_gap // Еще ниже

  const classLabel = 'Класс: '
  const classValue = '11A'

  const classLabelWidth = customMediumFont.widthOfTextAtSize(classLabel, data_font_size)

  // "Класс:"
  page.drawText(classLabel, {
    x: xPosition,
    y: yPosition,
    size: data_font_size,
    font: customMediumFont,
    color: rgb(0, 0, 0),
  })

  // Значение (номер класса)
  page.drawText(classValue, {
    x: xPosition + classLabelWidth,
    y: yPosition,
    size: data_font_size,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // ----------------------
  // Профиль класса
  // ----------------------
  yPosition -= data_gap

  const profileLabel = 'Профиль класса: '
  const profileValue = props.classSpecific

  const profileLabelWidth = customMediumFont.widthOfTextAtSize(profileLabel, data_font_size)

  // "Профиль класса:"
  page.drawText(profileLabel, {
    x: xPosition,
    y: yPosition,
    size: data_font_size,
    font: customMediumFont,
    color: rgb(0, 0, 0),
  })

  // Значение (профиль класса)
  page.drawText(profileValue, {
    x: xPosition + profileLabelWidth,
    y: yPosition,
    size: data_font_size,
    font: customFont,
    color: rgb(0, 0, 0),
  })

  // -----------------
  // Генерация QR-кода
  // -----------------

  const qrImage = await generateQr(
    JSON.stringify({
      test: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cumque facilis hic in iure maxime minima modi officiis sapiente voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cumque facilis hic in iure maxime minima modi officiis sapiente voluptates.',
    }),
    pdfDoc
  )

  page.drawImage(qrImage, {
    x: width - QR_SIZE,
    y: height - QR_SIZE,
    width: QR_SIZE,
    height: QR_SIZE,
  })

  const BOTTOM_PADDING = QR_SIZE >= 220 ? 15 : 220 - QR_SIZE + 15

  page.drawImage(qrImage, {
    x: 20,
    y: 20 + BOTTOM_PADDING,
    width: QR_SIZE,
    height: QR_SIZE,
  })

  // -----------------
  // Текст рядом с QR
  // -----------------

  const BOTTOM_QR_GAP = 15
  const BOTTOM_TEXT_GAP = 18
  const BOTTOM_TEXT_SIZE = 10
  const BOTTOM_CONTENT_WIDTH = width - QR_SIZE - BOTTOM_QR_GAP - MARGIN - 10
  i = 0

  page.drawText('В какие ВУЗы Вы планируете поступать?', {
    x: 20 + QR_SIZE + BOTTOM_QR_GAP,
    y: QR_SIZE + BOTTOM_PADDING,
    size: BOTTOM_TEXT_SIZE,
    font: customMediumFont,
    color: rgb(0, 0, 0),
  })
  i++

  page.drawRectangle({
    x: 20 + QR_SIZE + BOTTOM_QR_GAP,
    y: QR_SIZE + BOTTOM_PADDING - BOTTOM_TEXT_GAP * i,
    width: BOTTOM_CONTENT_WIDTH,
    height: 0,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  })
  i++
  page.drawRectangle({
    x: 20 + QR_SIZE + BOTTOM_QR_GAP,
    y: QR_SIZE + BOTTOM_PADDING - BOTTOM_TEXT_GAP * i,
    width: BOTTOM_CONTENT_WIDTH,
    height: 0,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  })
  i++

  const formattedLines = justifyText(
    'Участник, а в случае его несовершеннолетия родитель (законный представитель), ознакомлен с Порядком проведения олимпиады, а также предоставляет организаторам согласие на сбор, хранение, использование, распространение (передачу) и публикацию персональных данных и олимпиадной работы.',
    BOTTOM_CONTENT_WIDTH,
    customFont,
    BOTTOM_TEXT_SIZE
  )

  formattedLines.forEach((line: string, index: number) => {
    page.drawText(line, {
      x: 20 + QR_SIZE + BOTTOM_QR_GAP,
      y: QR_SIZE + BOTTOM_PADDING - BOTTOM_TEXT_GAP * i - index * BOTTOM_TEXT_SIZE * 1.5,
      size: BOTTOM_TEXT_SIZE,
      font: customFont,
      color: rgb(0, 0, 0),
    })
  })

  const footerTexts = [
    'Подпись участника/родителя      Расшифровка',
    '____________________/______________________/___________________',
    'Всего листов сдано - ______ (чистовик) , ______ (черновик)',
    'Ответственный по аудитории',
    '_______________________________/_______________________________',
  ]

  i = 8
  footerTexts.forEach((text, index) => {
    page.drawText(text, {
      x: 20 + QR_SIZE + BOTTOM_QR_GAP,
      y: QR_SIZE + BOTTOM_PADDING - BOTTOM_TEXT_GAP * i - index * BOTTOM_TEXT_SIZE * 1.5,
      size: BOTTOM_TEXT_SIZE,
      font: customMediumFont,
      color: rgb(0, 0, 0),
    })
  })

  // -----------------

  const pdfBytes = await pdfDoc.save()
  downloadFile(pdfBytes, FILE_NAME)
}
