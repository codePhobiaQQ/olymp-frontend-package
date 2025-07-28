import {
  CATEGORY_URL_KEY,
  categorySignal,
  CLASS_URL_KEY,
  classSignal,
  DEFAULT_SUBJECT,
  SUBJECT_URL_KEY,
  subjectSignal,
  YEAR_URL_KEY,
  yearSignal,
} from './../../model/general-page/provider'
import { effect } from '@preact/signals-react'
import { setUri } from '@shared/lib/utils'
import { RadioChangeEvent } from 'antd'

export const init = () => {
  const currentSearchParams = new URLSearchParams(window.location.search)

  // Subject
  let subject = currentSearchParams.get(SUBJECT_URL_KEY)
  if (!subject) {
    subject = DEFAULT_SUBJECT
  }
  subjectSignal.value = subject

  // Class
  let class_ = currentSearchParams.get(CLASS_URL_KEY)
  console.log(class_)
  if (class_) {
    classSignal.value = class_.split('_')
  }

  // Category
  let category = currentSearchParams.get(CATEGORY_URL_KEY)
  console.log(category)
  if (category) {
    categorySignal.value = category.split('_')
  }

  // Year
  let years = currentSearchParams.get(YEAR_URL_KEY)
  if (years) {
    yearSignal.value = years.split('_')
  }
}

export const destroy = () => {
  subjectSignal.value = undefined
}

// ----------------------------
// ------ Subject filter ------
// ----------------------------
export const changeSubjectHandler = (subject: RadioChangeEvent) => {
  subjectSignal.value = subject.target.value
}

effect(() => {
  if (!subjectSignal.value) {
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
  yearSignal.value = years
}

effect(() => {
  if (!yearSignal.value) {
    return
  }
  const uri = new URLSearchParams(window.location.search)
  uri.set(YEAR_URL_KEY, yearSignal.value.join('_'))
  setUri(uri)
})

// -----------------------
// --- Category filter ---
// -----------------------

export const changeCategoryHandler = (categories: string[]) => {
  categorySignal.value = categories
}

effect(() => {
  if (!categorySignal.value) {
    return
  }
  const uri = new URLSearchParams(window.location.search)
  uri.set(CATEGORY_URL_KEY, categorySignal.value.join('_'))
  setUri(uri)
})

// -----------------------
// ----- Class filter ----
// -----------------------

export const changeClassHandler = (classes: string[]) => {
  console.log(classes)
  classSignal.value = classes
}

effect(() => {
  if (!classSignal.value) {
    return
  }
  const uri = new URLSearchParams(window.location.search)
  uri.set(CLASS_URL_KEY, classSignal.value.join('_'))
  setUri(uri)
})
