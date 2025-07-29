import { Card, CardsLayout } from '@lib/olymps'
import { PageTitle } from './../../../shared/components/page-title'
import { PageDescription } from './../../../shared/components/page-description'
import { PageSubmenu } from './../../../shared/components/page-submenu'
import { PageWrapper } from '@shared/components/page-wrapper'
import { getIntroduceResultsRoute, getIntroduceRoute } from '@app/lib/route'
import { useGetIntroduceOlympsList } from './../../model/provider/introduce-api'
import { Typography } from 'antd'

export const IntroduceList = () => {
  const { data: introduceOlymps, isLoading, error } = useGetIntroduceOlympsList()

  let content
  if (isLoading) {
    content = new Array(6).fill('').map((_, index) => <Card key={index} loading />)
  } else if (error) {
    content = (
      <div className="flex flex-col items-center gap-6">
        <Typography.Text>{JSON.stringify(error)}</Typography.Text>
      </div>
    )
  } else if (introduceOlymps && introduceOlymps?.length) {
    content = introduceOlymps?.map((introduce, index) => {
      const path = getIntroduceRoute() + `/${introduce.slug}`
      return (
        <Card
          title={introduce.name}
          key={index}
          path={path}
        />
      )
    })
  }

  return (
    <section id="introduce-olymps-list">
      <PageWrapper>
        <PageTitle title="Ознакомительные этапы" />
        <PageDescription text="В этом разделе Вы можете подготовиться к отборочному этапу, пройдя ознакомительные этапы предыдущих лет." />

        <PageSubmenu
          activeKey="list"
          items={[
            {
              key: 'list',
              label: 'Ознакомительные этапы',
              path: getIntroduceRoute(),
            },
            {
              key: 'results',
              label: 'Результаты',
              path: getIntroduceResultsRoute(),
            },
          ]}
        />

        <CardsLayout className="pb-10 pt-10">{content}</CardsLayout>
      </PageWrapper>
    </section>
  )
}
