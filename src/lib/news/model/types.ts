export interface NewsPreviewItemI {
  id: string | number
  olymp?: {
    name: string
    slug: string
  }
  date?: string
  preview_title?: string
  preview_description?: string
}

export interface NewsItemI {
  id: string | number
  olymp?: {
    name: string
    slug: string
  }
  date?: string
  title?: string
  description?: string
}

export interface FilterI {
  olymp_name: string
  slug: string
}
