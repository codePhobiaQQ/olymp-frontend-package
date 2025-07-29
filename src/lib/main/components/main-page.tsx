import { Olymps } from './olymps/olymps.tsx'
import { AboutScreen } from './about'
import { Winners } from './winners.tsx'
import { Faq } from './faq'
import { Diplomas } from './diplomas.tsx'
import { Organizers } from './organizers'
import { Subscribe } from './subscribe.tsx'
import { Stages } from './stages'
import { PageWrapper } from '@shared/components/page-wrapper'
import { useGetMainPageData } from '../model/api.ts'
// import { Spin, Typography } from 'antd'

export const MainPage = () => {
  const { data, /*isLoading, error*/ } = useGetMainPageData()

  let content = (
    <>
      <Olymps olymps={data?.olymps} />
      <AboutScreen data={data?.advantages} />
      <Stages
        data={data?.stages}
      />
      <Winners data={data?.winners} />
      <Diplomas />
      <Organizers />
      <Faq data={data?.faq} />
      <Subscribe />
    </>
  )

  // if (error) {
  //   content = (
  //     <PageWrapper>
  //       <Typography.Text>Ошибка во время загрузки данных</Typography.Text>
  //     </PageWrapper>
  //   )
  // }
  //
  // if (isLoading) {
  //   return (
  //     <PageWrapper>
  //       <div style={{ minHeight: '100vh' }} className='flex items-center justify-center'>
  //         <Spin />
  //       </div>
  //     </PageWrapper>
  //   )
  // }

  return <PageWrapper id="main-page">{content}</PageWrapper>
}