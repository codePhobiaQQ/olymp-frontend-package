import { NewsItem } from './NewsItem'
import { useGetNews } from './../../model/api'
import { Pagination, Skeleton, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { NewsPreviewItemI } from './../../model/types'
import { DEFAULT_LIMIT, pageSignal, selected_news_categories } from './../../model/provider'

interface ContentProps {
  subject?: string
}

export const NewsContent = ({ subject }: ContentProps) => {
  const [dataView, setDataView] = useState<NewsPreviewItemI[]>([])
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const selectedCategoriesRef = useRef<string | undefined>(undefined)

  const { data, isLoading, error } = useGetNews({
    page: pageSignal.value,
    categories: subject ? [subject] : selected_news_categories.value,
  })

  const changePageHandler = (page_: number) => {
    if (contentContainerRef.current) {
      window.scrollTo({
        top: contentContainerRef.current?.offsetTop - 80,
        behavior: 'smooth',
      })
    }
    pageSignal.value = page_
  }

  // ----------------------
  // Sync Data
  // ----------------------

  useEffect(() => {
    if (!selectedCategoriesRef.current) {
      selectedCategoriesRef.current = JSON.stringify(selected_news_categories.value)
      return
    }
    if (selectedCategoriesRef.current === JSON.stringify(selected_news_categories.value)) {
      return
    }
    pageSignal.value = 1
    selectedCategoriesRef.current = JSON.stringify(selected_news_categories.value)
  }, [selected_news_categories.value])

  useEffect(() => {
    if (JSON.stringify(data?.data) === JSON.stringify(dataView)) {
      return
    }
    setDataView(data?.data ? data.data : [])
  }, [data?.data])

  let content

  if (error) {
    content = <>{JSON.stringify(error)}</>
  } else if (isLoading) {
    content = (
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    )
  } else if (dataView?.length) {
    content = (
      <>
        {dataView.map((newsPreviewItem, index) => (
          <NewsItem key={newsPreviewItem.id + '_' + index} {...newsPreviewItem} />
        ))}
      </>
    )
  } else {
    content = (
      <>
        <Typography.Paragraph>Новостей пока нет...</Typography.Paragraph>
      </>
    )
  }

  return (
    <article className="flex flex-1 flex-col overflow-hidden" id="news-content-items">
      <div ref={contentContainerRef} className="flex flex-1 flex-wrap gap-4">
        {content}
      </div>

      <Pagination
        className="mt-16"
        current={pageSignal.value}
        defaultPageSize={DEFAULT_LIMIT}
        align="center"
        total={data?.count}
        onChange={changePageHandler}
        showSizeChanger={false}
      />

    </article>
  )
}
