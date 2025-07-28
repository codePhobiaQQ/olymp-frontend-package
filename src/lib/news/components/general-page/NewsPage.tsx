import { PageTitle } from '@shared/components/page-title'
import { Container } from '@app/components/layouts/Container'
import { PageWrapper } from '@shared/components/page-wrapper'
import { Filters } from './../filters/Filters'
import { NewsContent } from './../content/NewsContent'
import { useEffect } from 'react'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { init } from './../../model/services/init'

const NewsPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(init())
  }, [])

  return (
    <PageWrapper id="news" className="section-padding bg-section1">
      <Container containerInnerClassname="gap-16 flex flex-col">
        <PageTitle text="Новости" />

        <div className="menu-content-gap flex flex-col md:flex-row">
          <Filters />
          <NewsContent />
        </div>
      </Container>
    </PageWrapper>
  )
}

export default NewsPage
