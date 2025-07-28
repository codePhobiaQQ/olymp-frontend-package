import { useLocation } from 'react-router-dom'
import { useGetOlympDetails } from '@lib/olymps/model/services'
import { NotFoundPage } from '@app/components/not-found-page'
import { PageWrapper } from '@shared/components/page-wrapper'
import { Container } from '@app/components/layouts/Container'
import { ExtraInfo } from './extra-info/ExtraInfo'
import { GeneralInfo } from './general-info/GeneralInfo'
import { useEffect } from 'react'
import { init } from './../../model/details-page/functions'

export const OlympDetailsPage = () => {
  const location = useLocation()
  const slug = location.pathname.split('/').pop()
  const { isLoading, data: olympDetails } = useGetOlympDetails(slug!, { skip: !slug })

  useEffect(() => {
    init()
  }, [])

  let content
  if (!slug) {
    content = <NotFoundPage />
  } else if (isLoading) {
    content = 'Loading...'
  } else {
    content = (
      <>
        <GeneralInfo olympDetails={olympDetails} />
        <ExtraInfo />
      </>
    )
  }

  return (
    <PageWrapper id="olymp-details" className="section-padding bg-section1">
      <Container>{content}</Container>
    </PageWrapper>
  )
}
