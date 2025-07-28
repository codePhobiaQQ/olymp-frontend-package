import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/lib/store'
import { ALL_CATEGORIES_VALUE, selected_news_categories } from './../provider'

type ChangeNewsCategoryType = {
  categories: string[]
  allCategoriesCount: number
}

export const changeNewsCategory = createAsyncThunk<
  void,
  ChangeNewsCategoryType,
  ThunkConfig<string>
>('news/change-category', async (props) => {
  const { categories, allCategoriesCount } = props

  // Select ALL_CATEGORIES
  if (
    categories.includes(ALL_CATEGORIES_VALUE) &&
    !selected_news_categories.value.includes(ALL_CATEGORIES_VALUE)
  ) {
    selected_news_categories.value = [ALL_CATEGORIES_VALUE]
  }
  // Selected NO items
  else if (categories.length === 0) {
    selected_news_categories.value = [ALL_CATEGORIES_VALUE]
  }
  // Selected ALL items
  else if (allCategoriesCount === categories.length) {
    selected_news_categories.value = [ALL_CATEGORIES_VALUE]
  }
  // Selected SOME items
  else {
    selected_news_categories.value = categories.filter(
      (category) => category !== ALL_CATEGORIES_VALUE
    )
  }
})
