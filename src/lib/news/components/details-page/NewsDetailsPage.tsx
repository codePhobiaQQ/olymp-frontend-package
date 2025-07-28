import { PageTitle } from '@shared/components/page-title'
import { Container } from '@app/components/layouts/Container'
import { PageWrapper } from '@shared/components/page-wrapper'

const NewsDetailsPage = () => {
  return (
    <PageWrapper id="news" className="section-padding bg-section1">
      <Container containerInnerClassname="gap-16 flex flex-col">
        <PageTitle text="Новость 1" />
      </Container>
    </PageWrapper>
  )
}

export default NewsDetailsPage
