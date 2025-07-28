import { OlympsScreen } from '../OlympsScreen'
import { AboutScreen } from '../about'
import { WinnersScreen } from '../WinnersScreen'
import { FAQ } from '../FAQ.tsx'
import { Diplomas } from '../Diplomas'
import { Organizers } from '../organizers'
import { Subscribe } from '../Subscribe'
import { Stages } from '../stages'
import { PageWrapper } from '@shared/components/page-wrapper'

const MainPage = () => {
  return (
    <PageWrapper id="main-page">
      <OlympsScreen />
      <AboutScreen />
      <Stages />
      <WinnersScreen />
      <Diplomas />
      <Organizers />
      <FAQ />
      <Subscribe />
    </PageWrapper>
  )
}

export default MainPage
