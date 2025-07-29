export const downloadFile = (file: Uint8Array, name: string = 'updated-document.pdf') => {
  // Скачиваем обновлённый PDF
  const blob = new Blob([file], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  URL.revokeObjectURL(url)
}
