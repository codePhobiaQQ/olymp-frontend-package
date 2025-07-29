import { PageTitle } from '@shared/components/page-title'
import { Container } from '@/app/components/layouts/container'
import { PageWrapper } from '@shared/components/page-wrapper'
import { Filters } from './../filters/Filters'
import { NewsContent } from './../content/NewsContent'
import { useEffect } from 'react'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { init } from './../../model/services/init'
import { destroy, inited } from './../../model/provider'
import { Skeleton, Spin } from 'antd'
import { NewsLayout } from './../shared/layout'

const NewsPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(init({}))
    return () => {
      destroy()
    }
  }, [])

  let filters
  let content
  if (!inited.value) {
    filters = <Skeleton />
    content = (
      <>
        <Spin />
      </>
    )
  } else {
    filters = <Filters />
    content = (
      <>
        <NewsContent />
      </>
    )
  }

  return (
    <PageWrapper id="news" className="section-padding-first bg-section1">
      <Container containerInnerClassname="gap-16 flex flex-col">
        <PageTitle text="Новости" />
        <NewsLayout filters={filters} content={content} />
      </Container>
    </PageWrapper>
  )
}

export default NewsPage
