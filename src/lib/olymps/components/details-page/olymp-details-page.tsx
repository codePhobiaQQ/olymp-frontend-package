import { useLocation } from 'react-router-dom'
import { useGetOlympDetails } from './../../model/api'
import { NotFoundPage } from '@app/components/not-found-page'
import { PageWrapper } from '@shared/components/page-wrapper'
import { Container } from '@/app/components/layouts/container'
import { GeneralInfo } from './general-info.tsx'
import { init } from './../../model/details-page/functions'
import { useEffect } from 'react'
import { News } from './news'
import { OfficialInfo } from './official-info'
import { OlympPreparation } from './olymp-preparation'
import { FinalStageResults } from './final-stage-results'
import { AboutOlymp } from './about-olymp'
import { Organizers } from './organizers'

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
        <News />
        <OfficialInfo olympDetails={olympDetails?.['official_information']} />
        <OlympPreparation slug={slug} />
        <FinalStageResults slug={slug} />
        <Organizers />
        <AboutOlymp />
      </>
    )
  }

  return (
    <PageWrapper id="olymp-details" className="section-padding-first scroll-smooth bg-section1">
      <Container>{content}</Container>
    </PageWrapper>
  )
}
