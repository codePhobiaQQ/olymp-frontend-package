import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/lib/store'
import { NEWS_CATEGORY_URL_KEY, selected_news_categories } from './../provider'

export const init = createAsyncThunk<void, void, ThunkConfig<string>>('news/init', async () => {
  const currentSearchParams = new URLSearchParams(window.location.search)
  let searchedNewsCategory = currentSearchParams.get(NEWS_CATEGORY_URL_KEY) as string

  if (searchedNewsCategory && searchedNewsCategory.split('_')?.length) {
    selected_news_categories.value = searchedNewsCategory.split('_')
    return
  }

  selected_news_categories.value = ['all']
})
