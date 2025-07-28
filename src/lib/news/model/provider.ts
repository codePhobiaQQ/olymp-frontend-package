import { signal } from '@preact/signals-react'
import { setUri } from '@shared/lib/utils'
import { effect } from '@preact/signals-react'

// CONST
export const NEWS_CATEGORY_URL_KEY = 'news_category'
export const ALL_CATEGORIES_VALUE = 'all'

// SIGNALS
export const selected_news_categories = signal<string[]>()

// FUNCTIONS
effect(() => {
  const uri = new URLSearchParams(window.location.search)
  if (!selected_news_categories.value?.length) {
    return
  }
  uri.set(NEWS_CATEGORY_URL_KEY, selected_news_categories.value.join('_'))
  setUri(uri)
})
