import { Button, Checkbox, Typography } from 'antd'
import cls from './Filters.module.scss'
import type { GetProp } from 'antd'
import { FilterI } from './../../model/types'
import { Pointer } from '@shared/components/pointer'
import cn from 'classnames'
import { ALL_CATEGORIES_VALUE, selected_news_categories } from './../../model/provider'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { changeNewsCategory } from './../../model/services/changeNewsCategory'

export const Filters = () => {
  const dispatch = useAppDispatch()

  const filters: FilterI[] = [
    // added by frontend
    {
      olymp_name: 'Все олимпиады',
      slug: ALL_CATEGORIES_VALUE,
    },
    // -----------------
    {
      olymp_name: 'Криптография',
      slug: 'cryptography',
    },
    {
      olymp_name: 'Информатика и компьютерная безопасность',
      slug: 'infoDefence',
    },
    {
      olymp_name: 'Иностранный язык',
      slug: 'foreignLanguage',
    },
    {
      olymp_name: 'Математика',
      slug: 'math',
    },
  ]

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (chosenCategories) => {
    dispatch(
      changeNewsCategory({
        categories: chosenCategories as string[],
        // Without ALL_CATEGORY
        allCategoriesCount: filters.length - 1,
      })
    )
  }

  const resetHandler = () => {
    selected_news_categories.value = [ALL_CATEGORIES_VALUE]
  }

  const isResetDisable =
    selected_news_categories.value?.length === 1 &&
    selected_news_categories.value?.[0] === ALL_CATEGORIES_VALUE

  return (
    <div id="news-filters" className={cn('sider-menu', cls.Filters)}>
      <Checkbox.Group
        className="flex flex-col gap-3"
        value={selected_news_categories.value}
        onChange={onChange}
      >
        {filters.map((filter) => {
          return (
            <Checkbox rootClassName={cn(cls.FilterItem)} key={filter.slug} value={filter.slug}>
              <Typography.Text>{filter.olymp_name}</Typography.Text>
            </Checkbox>
          )
        })}
      </Checkbox.Group>

      <Button
        disabled={isResetDisable}
        onClick={resetHandler}
        className="flex items-center justify-center bg-accentBlue text-secondary"
        iconPosition="end"
        icon={<Pointer variant="white-transparent" className="h-4 w-4" />}
      >
        Сбросить
      </Button>
    </div>
  )
}
