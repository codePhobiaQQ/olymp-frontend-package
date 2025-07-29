import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/lib/store'
import {
  inited,
  news_categories,
  NEWS_CATEGORY_URL_KEY,
  pageSignal,
  selected_news_categories,
} from './../provider'
import { PAGE_URL_KEY } from '@shared/consts/url'
import { newsApi } from '@lib/news/model/api'

export const init = createAsyncThunk<void, { categories?: string[] }, ThunkConfig<string>>('news/init', async ({ categories }, thunkAPI) => {
  const { dispatch } = thunkAPI

  const currentSearchParams = new URLSearchParams(window.location.search)
  console.log('currentSearchParams', currentSearchParams)

  // Page
  let page = currentSearchParams.get(PAGE_URL_KEY) as string
  if (Number(page)) {
    pageSignal.value = Number(page)
  } else {
    pageSignal.value = 1
  }

  // Categories
  let searchedNewsCategory = currentSearchParams.get(NEWS_CATEGORY_URL_KEY) as string
  console.log('searchedNewsCategory', searchedNewsCategory)

  if (categories) {
    selected_news_categories.value = categories
  }
  else if (searchedNewsCategory && searchedNewsCategory.split(',')?.length) {
    selected_news_categories.value = searchedNewsCategory.split(',')
  } else {
    selected_news_categories.value = ['all']
  }

  // News Filters
  news_categories.value = await dispatch(newsApi.endpoints.getCategories.initiate()).unwrap()

  inited.value = true
})
