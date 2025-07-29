import { PageWrapper } from '@shared/components/page-wrapper'
import { PageTitle } from './../../shared/components/page-title'
import { PageDescription } from './../../shared/components/page-description'
import { Issues } from './issues'

export const SupportPage = () => {
  return (
    <section id="support">
      <PageWrapper>
        <PageTitle title="Поддержка" />
        <PageDescription text="В данном разделе Вы можете написать свое обращение в орг. комитет, задать свои вопросы и многое другое." />
        <Issues />
      </PageWrapper>
    </section>
  )
}
