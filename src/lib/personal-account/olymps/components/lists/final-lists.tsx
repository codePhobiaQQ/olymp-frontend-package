import { Card, CardsLayout } from '@lib/olymps'
import { Typography } from 'antd'
import { getFinalStageRoute, getFinalStageResultsRoute } from '@app/lib/route'
import { PageTitle } from './../../../shared/components/page-title'
import { PageWrapper } from '@shared/components/page-wrapper'
import { PageDescription } from './../../../shared/components/page-description'
import { PageSubmenu } from './../../../shared/components/page-submenu'
import { useGetFinalStages } from './../../model/provider/final-api'
import { useEffect, useRef } from 'react'
import { Button } from '@shared/components/button'
import { useReactToPrint } from 'react-to-print'

export const FinalList = () => {
  const { data: finalOlympsList, isLoading, error, refetch } = useGetFinalStages()

  const printAreaRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef: printAreaRef, bodyClass: 'bg-red' })

  useEffect(() => {
    refetch()
  }, [])

  let content
  if (isLoading) {
    content = new Array(6).fill('').map((_, index) => <Card key={index} loading />)
  } else if (error) {
    content = (
      <div className="flex flex-col items-center gap-6">
        <Typography.Text>{JSON.stringify(error)}</Typography.Text>
      </div>
    )
  } else if (finalOlympsList && finalOlympsList?.length) {
    content = finalOlympsList?.map((qual, index) => {
      return (
        <Card
          title={qual.title}
          key={index}
          status={qual.status}
          path={getFinalStageRoute() + `/${qual.slug}`}
        />
      )
    })
  } else {
    content = (
      <div className="flex flex-col items-center gap-6">
        <Typography.Text>Проблема во время получения олимпиад</Typography.Text>
      </div>
    )
  }

  return (
    <section id="final-stages-list">
      <PageWrapper>
        <PageTitle title="Залкючительные этапы" />
        <PageDescription text="В данном разделе Вы можете зарегистрироваться на заключительные этапы олимпиад,  по которым у Вас успешно пройден отборочный этап, либо подать апелляцию в случае несогласия с выставленными баллами." />
        <PageSubmenu
          activeKey="list"
          items={[
            {
              key: 'list',
              label: 'Заключительные этапы',
              path: getFinalStageRoute(),
            },
            {
              key: 'results',
              label: ' Результаты',
              path: getFinalStageResultsRoute(),
            },
          ]}
        />
        <CardsLayout>{content}</CardsLayout>
      </PageWrapper>

      <div style={{ display: 'none' }}>
        <div ref={printAreaRef} className="h-96 w-96 p-10">
          <Typography.Text>test bro nafig fads fasdfsa</Typography.Text>
        </div>
      </div>

      <Button onClick={reactToPrintFn}>Print</Button>
    </section>
  )
}
