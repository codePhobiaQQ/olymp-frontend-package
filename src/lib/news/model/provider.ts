import { signal } from '@preact/signals-react'
import { setUri } from '@shared/utils'
import { effect } from '@preact/signals-react'
import { FilterI } from '@lib/news/model/types.ts'
import { PAGE_URL_KEY } from '@shared/consts/url.ts'

// CONST
export const NEWS_CATEGORY_URL_KEY = 'news_category'
export const ALL_CATEGORIES_VALUE = 'all'

// SIGNALS
export const inited = signal<boolean>(false)

export const DEFAULT_LIMIT = 15
export const pageSignal = signal<number | undefined>()
export const news_categories = signal<FilterI[] | undefined>()
export const selected_news_categories = signal<string[]>()

export const destroy = () => {
  console.log('destroy')
  inited.value = false
  pageSignal.value = undefined
  news_categories.value = []
  selected_news_categories.value = []
}

// ----------------
// Sync URL
// ----------------

effect(() => {
  const uri = new URLSearchParams(window.location.search)
  if (!selected_news_categories.value?.length) {
    return
  }
  uri.set(NEWS_CATEGORY_URL_KEY, selected_news_categories.value.join(','))
  setUri(uri)
})

effect(() => {
  const uri = new URLSearchParams(window.location.search)
  if (!pageSignal.value) {
    return
  }
  uri.set(PAGE_URL_KEY, pageSignal.value?.toString())
  setUri(uri)
})
