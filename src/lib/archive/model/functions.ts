import {
  CATEGORY_URL_KEY,
  categoriesSignal,
  CLASS_URL_KEY,
  gradesSignal,
  DEFAULT_LIMIT,
  limitSignal,
  pageSignal,
  SUBJECT_URL_KEY,
  subjectSignal,
  YEAR_URL_KEY,
  yearsSignal, initSignal,
} from './provider'
import { effect } from '@preact/signals-react'
import { setUri } from '@shared/utils'
import { RadioChangeEvent } from 'antd'
import { LIMIT_URL_KEY, PAGE_URL_KEY } from '@shared/consts/url'

export const init = () => {
  const currentSearchParams = new URLSearchParams(window.location.search)

  // Page
  let page = currentSearchParams.get(PAGE_URL_KEY)
  if (page) {
    pageSignal.value = Number(page)
  } else {
    pageSignal.value = 1
  }

  // Limit
  let limit = currentSearchParams.get(LIMIT_URL_KEY)
  if (limit) {
    limitSignal.value = Number(limit)
  } else {
    console.log('limit', limit, DEFAULT_LIMIT)
    limitSignal.value = DEFAULT_LIMIT
  }

  // Subject
  let subject = currentSearchParams.get(SUBJECT_URL_KEY)
  if (subject) {
    subjectSignal.value = subject
  }

  // Class
  let class_ = currentSearchParams.get(CLASS_URL_KEY)
  console.log(class_)
  if (class_) {
    gradesSignal.value = [...class_.split('_')]
  }

  // Category
  let category = currentSearchParams.get(CATEGORY_URL_KEY)
  console.log(category)
  if (category) {
    categoriesSignal.value = [...category.split('_')]
  }

  // Year
  let years = currentSearchParams.get(YEAR_URL_KEY)
  if (years) {
    yearsSignal.value = [...years.split('_')]
  }

  initSignal.value = true
}

export const destroy = () => {
  initSignal.value = false
  subjectSignal.value = undefined
  gradesSignal.value = []
  categoriesSignal.value = []
  yearsSignal.value = []
}

// ----------------------------
// ------ Subject filter ------
// ----------------------------
export const changeSubjectHandler = (subject: RadioChangeEvent) => {
  subjectSignal.value = subject.target.value
}

effect(() => {
  if (!initSignal.value) {
    return
  }
  if (subjectSignal.value === undefined) {
    return
  }
  const uri = new URLSearchParams(window.location.search)
  uri.set(SUBJECT_URL_KEY, subjectSignal.value)
  setUri(uri)
})

// ----------------------------
// -------- Year filter -------
// ----------------------------
export const changeYearHandler = (years: string[]) => {
  yearsSignal.value = years
}

effect(() => {
  if (!initSignal.value) {
    return
  }
  if (yearsSignal.value === undefined) {
    return
  }
  const uri = new URLSearchParams(window.location.search)
  uri.set(YEAR_URL_KEY, yearsSignal.value.join('_'))
  setUri(uri)
})

// -----------------------
// --- Category filter ---
// -----------------------

export const changeCategoryHandler = (categories: string[]) => {
  categoriesSignal.value = categories
}

effect(() => {
  if (!initSignal.value) {
    return
  }
  if (categoriesSignal.value === undefined) {
    return
  }
  const uri = new URLSearchParams(window.location.search)
  uri.set(CATEGORY_URL_KEY, categoriesSignal.value.join('_'))
  setUri(uri)
})

// -----------------------
// ----- Grade filter ----
// -----------------------

export const changeClassHandler = (classes: string[]) => {
  console.log(classes)
  gradesSignal.value = classes
}

effect(() => {
  if (!initSignal.value) {
    return
  }
  if (gradesSignal.value === undefined) {
    return
  }
  const uri = new URLSearchParams(window.location.search)
  uri.set(CLASS_URL_KEY, gradesSignal.value.join('_'))
  setUri(uri)
})

// -----------------
// ----- Pages -----
// -----------------

export const changeArchivePageHandler = (page_: number) => {
  console.log('page_', page_)
  pageSignal.value = page_
  console.log('pageSignal.value', pageSignal.value)
}

effect(() => {
  if (!initSignal.value) {
    return
  }
  if (pageSignal.value === undefined) {
    return
  }
  const uri = new URLSearchParams(window.location.search)
  uri.set(PAGE_URL_KEY, pageSignal.value.toString())
  setUri(uri)
})

// -----------------------
// ----- Rest Filters ----
// -----------------------

export const resetFilters = () => {
  subjectSignal.value = ''
  yearsSignal.value = []
  categoriesSignal.value = []
  gradesSignal.value = []
}