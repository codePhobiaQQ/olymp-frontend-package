import { Buffer } from 'buffer'

export const generateQr = async (data: string, pdfDoc: any) => {
  const QRCode = await import('qrcode')
  const qrCodeDataUrl = await QRCode.toDataURL(data)
  const qrCodeImageBytes = qrCodeDataUrl.split(',')[1]
  const qrCodeBuffer = Buffer.from(qrCodeImageBytes, 'base64')
  const qrCodeImage = await pdfDoc.embedPng(qrCodeBuffer)
  return qrCodeImage
}
