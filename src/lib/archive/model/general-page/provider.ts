import { signal } from '@preact/signals-react'

export const SUBJECT_URL_KEY = 'subject'
export const DEFAULT_SUBJECT = 'cryptography'
export const subjectSignal = signal<string | undefined>()

export const YEAR_URL_KEY = 'year'
export const yearSignal = signal<string[] | undefined>()

export const CATEGORY_URL_KEY = 'category'
export const categorySignal = signal<string[] | undefined>()

export const CLASS_URL_KEY = 'grade'
export const classSignal = signal<string[] | undefined>()
