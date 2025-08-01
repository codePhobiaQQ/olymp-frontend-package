export type OlympSlug = 'cryptography' | 'math'

export type OlympType = {
  id: number
  name: string
  description?: string

  path?: string
  slug?: string
}
