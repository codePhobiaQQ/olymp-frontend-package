import { OlympSlug } from '@shared/types/olymps'

export const slugNameOlymp: Record<OlympSlug, string> = {
  cryptography: 'Криптография',
  math: 'Математика',
}

// export const nameSlugOlymp: Record<string, OlympSlug> = Object.fromEntries(
//   Object.entries(slugNameOlymp).map(([key, value]) => [value, key])
// )
