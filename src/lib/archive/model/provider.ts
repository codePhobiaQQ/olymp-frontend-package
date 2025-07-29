import { signal } from '@preact/signals-react'

// GENERAL PAGE
export const initSignal = signal<boolean | undefined>(false)

export const pageSignal = signal<number | undefined>()

export const DEFAULT_LIMIT = 15
export const limitSignal = signal<number | undefined>()

export const SUBJECT_URL_KEY = 'subject'
export const subjectSignal = signal<string | undefined>()

export const YEAR_URL_KEY = 'year'
export const yearsSignal = signal<string[] | undefined>([])

export const CATEGORY_URL_KEY = 'category'
export const categoriesSignal = signal<string[] | undefined>([])

export const CLASS_URL_KEY = 'grade'
export const gradesSignal = signal<string[] | undefined>([])