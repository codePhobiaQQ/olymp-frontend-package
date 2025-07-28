import { NewsPreviewItemI } from './../../model/types'
import { NewsItem } from './NewsItem'
import { useEffect, useState } from 'react'
import { Button } from '@shared/components/button'

interface ContentProps {
  filters?: {
    olymp_categories?: string[]
  }
}

const mock_data = [
  {
    id: '1',
    date: '6 мая 2023',
    olymp: {
      name: 'Математика',
      slug: 'math',
    },
    preview_title: 'Награждение призеров и победителей  олимпиады  по русскому языку...',
    preview_description:
      '8 апреля 2023 г. состоится награждение участников межрегиональной олимпиады школьников ...' +
      '8 апреля 2023 г. состоится награждение участников межрегиональной олимпиады школьников ...' +
      '8 апреля 2023 г. состоится награждение участников межрегиональной олимпиады школьников ...',
  },
  {
    id: '2',
    date: '6 мая 2023',
    olymp: {
      name: 'Криптография',
      slug: 'cryptography',
    },
    preview_title: 'Награждение призеров и победителей  олимпиады  по русскому языку...',
    preview_description:
      '8 апреля 2023 г. состоится награждение участников межрегиональной олимпиады школьников ...',
  },
  {
    id: '3',
    date: '6 мая 2023',
    olymp: {
      name: 'Криптография',
      slug: 'cryptography',
    },
    preview_title: 'Награждение призеров и победителей  олимпиады  по русскому языку...',
    preview_description:
      '8 апреля 2023 г. состоится награждение участников межрегиональной олимпиады школьников  ' +
      '8 апреля 2023 г. состоится награждение участников межрегиональной олимпиады школьников  ',
  },
]

export const NewsContent = (props: ContentProps) => {
  const { filters } = props

  useEffect(() => {
    console.log(filters)
  }, [filters])

  const [data, _] = useState<NewsPreviewItemI[]>(mock_data)

  return (
    <article className="flex flex-1 flex-col" id="news-content-items">
      <div className="flex flex-1 flex-wrap gap-4">
        {data.map((newsPreviewItem) => (
          <NewsItem key={newsPreviewItem.id} {...newsPreviewItem} />
        ))}
      </div>
      <Button className="m-auto mt-10">Загрузить</Button>
    </article>
  )
}
