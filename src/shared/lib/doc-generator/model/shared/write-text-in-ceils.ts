interface WriteTextInCellsProps {
  page: any
  chars: string[]
  position: {
    x: number
    y: number
  }
  font: any

  cellLimit?: number
  padding?: number
  fontSize?: number
  cellSize?: number
  fullLine?: boolean
  rightPadding?: number
  label?: string
}

export const writeTextInCells = async (props: WriteTextInCellsProps) => {
  const { rgb } = await import('pdf-lib')

  const {
    page,
    chars,
    position,
    padding = 4,
    fontSize = 12,
    font,
    cellSize = 20,
    cellLimit,
    fullLine = false,
    rightPadding = 0,
    label = '',
  } = props

  let x = position.x
  const y = position.y

  // Определяем фиксированный размер клетки (ширина и высота одинаковые)
  const fixedCellSize = cellSize || font.widthOfTextAtSize('M', fontSize)

  let totalWidth = 0
  const limit = cellLimit ? cellLimit : chars.length

  if (label) {
    page.drawText(label, {
      x: position.x - font.widthOfTextAtSize('М', fontSize) * 0.25,
      y: position.y + cellSize / 2,
      size: fontSize * 0.6,
      font: font,
      color: rgb(0, 0, 0),
    })
  }

  for (let i = 0; i < limit; i++) {
    const char = chars[i] || ' '
    totalWidth += fixedCellSize + padding * 2

    page.drawRectangle({
      x: x - padding,
      y: y - fixedCellSize - padding,
      width: fixedCellSize + 2 * padding,
      height: fixedCellSize + 2 * padding,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    })

    if (char !== ' ') {
      page.drawText(char, {
        x: x + (fixedCellSize - font.widthOfTextAtSize(char, fontSize)) / 2,
        y: y - fixedCellSize + fixedCellSize * 0.1,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      })
    }

    x += fixedCellSize + padding * 2
  }

  // Если параметр fullLine, дорисовываем клетки до конца строки
  if (fullLine) {
    const pageWidth = page.getWidth()
    const remainingWidth = pageWidth - totalWidth - position.x - rightPadding

    if (remainingWidth > 0) {
      const cellsToAdd = Math.floor(remainingWidth / (fixedCellSize + padding * 2))

      for (let i = 0; i < cellsToAdd; i++) {
        page.drawRectangle({
          x: x - padding,
          y: y - fixedCellSize - padding,
          width: fixedCellSize + 2 * padding,
          height: fixedCellSize + 2 * padding,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        })
        x += fixedCellSize + padding * 2
      }
    }
  }
}
