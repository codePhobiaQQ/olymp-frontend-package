import { __LEGACY_BACKEND__LINK__ } from '@shared/consts/api'

export const prefixImgSrc = (html: string): string =>
  html?.toString()
    // 1. Префикс для <img src="...">
    .replace(
      /(<img[^>]+src=['"])(?!https?:\/\/)([^'"]+)/gi,
      (_, start, path) => {
        if (path.startsWith('data:image')) return `${start}${path}`
        return `${start}${__LEGACY_BACKEND__LINK__}${path}`
      }
    )
    // 2. Удалить все @font-face CSS блоки
    .replace(/@font-face\s*{[^}]*}/gi, '')
    // 3. Удалить атрибуты face="..." и size="..." из любых <font> тегов
    .replace(/<font\b([^>]*)>/gi, (_, attrs) => {
      const cleanAttrs = attrs
        .replace(/\sface=['"][^'"]*['"]/gi, '')
        .replace(/\ssize=['"][^'"]*['"]/gi, '')
      return `<font${cleanAttrs}>`
    });