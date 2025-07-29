import { Button, Checkbox, Typography } from 'antd'
import type { GetProp } from 'antd'
import { Pointer } from '@shared/components/pointer'
import cn from 'classnames'
import {
  ALL_CATEGORIES_VALUE,
  news_categories,
  selected_news_categories,
} from './../../model/provider'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { setNewsCategory } from '../../model/services/set-news-category.ts'

export const Filters = () => {
  const dispatch = useAppDispatch()

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (chosenCategories) => {
    if (!news_categories.value?.length) return
    dispatch(
      setNewsCategory({
        categories: chosenCategories as string[],
        allCategoriesCount: news_categories.value.length,
      })
    )
  }

  const resetHandler = () => {
    selected_news_categories.value = [ALL_CATEGORIES_VALUE]
  }

  const isResetDisable =
    selected_news_categories.value?.length === 1 &&
    selected_news_categories.value?.[0] === ALL_CATEGORIES_VALUE

  let content
  if (news_categories.value?.length) {
    content = (
      <>
        <Checkbox.Group
          className="flex flex-col gap-3"
          value={selected_news_categories.value}
          onChange={onChange}
        >
          {[
            {
              name: 'Все олимпиады',
              slug: ALL_CATEGORIES_VALUE,
            },
            ...news_categories.value,
          ]?.map((filter) => {
            return (
              <Checkbox key={filter.slug} value={filter.slug}>
                <Typography.Text>{filter.name}</Typography.Text>
              </Checkbox>
            )
          })}
        </Checkbox.Group>

        <Button
          disabled={isResetDisable}
          onClick={resetHandler}
          className="mt-10 w-40 flex items-center justify-center bg-accentBlue text-secondary"
          iconPosition="end"
          icon={<Pointer variant="white-transparent" className="h-4 w-4" />}
        >
          Сбросить
        </Button>
      </>
    )
  }

  return (
    <div id="news-filters" className={cn('sider-menu')}>
      {content}
    </div>
  )
}
