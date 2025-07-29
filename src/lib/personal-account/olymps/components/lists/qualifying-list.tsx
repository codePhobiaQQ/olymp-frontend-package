import { Card, CardsLayout } from '@lib/olymps'
import { Typography } from 'antd'
import { getQualifyingResultsRoute, getQualifyingRoute } from '@app/lib/route'
import { useGetQualifyingStages } from './../../model/provider/qualifying-api'
import { PageTitle } from './../../../shared/components/page-title'
import { PageWrapper } from '@shared/components/page-wrapper'
import { PageDescription } from './../../../shared/components/page-description'
import { PageSubmenu } from './../../../shared/components/page-submenu'
import { getQualifyingTaskRoute } from '@app/lib/route/model/routes'
import { warning } from '@app/lib/notification'
import { qualDesirableStatuses } from '@lib/olymps/model/consts'

export const QualifyingList = () => {
  const { data: qualifyingOlymps, isLoading, error } = useGetQualifyingStages()

  let content
  if (isLoading) {
    content = new Array(6).fill('').map((_, index) => <Card key={index} loading />)
  } else if (error) {
    content = (
      <div className="flex flex-col items-center gap-6">
        <Typography.Text>{JSON.stringify(error)}</Typography.Text>
      </div>
    )
  } else if (qualifyingOlymps && qualifyingOlymps?.length) {
    // Создаем объект для быстрого доступа к приоритетам
    const statusPriority = Object.fromEntries(
      qualDesirableStatuses.map((item, index) => [item.status, index + 1])
    )

    // Сортируем олимпиады по желаемым статусам
    const sortedQualifyingOlymps = [...qualifyingOlymps].sort((a, b) => {
      const priorityA = statusPriority[a.status?.code] ?? Infinity
      const priorityB = statusPriority[b.status?.code] ?? Infinity
      return priorityA - priorityB
    })

    content = sortedQualifyingOlymps?.map((qual, index) => {
      let path: string | undefined
      let clickHandler = undefined

      if (qual.status?.code === 'user_not_started_olymp_started') {
        // Navigate to start page
        path = getQualifyingRoute() + `/${qual.slug}`
      } else if (qual.status?.code === 'olymp_finished') {
        // Navigate to result details page
        path = getQualifyingResultsRoute() + `/${qual.slug}?year=[2024-2025]`
      } else if (qual.status?.code === 'user_not_registered') {
        // Navigate to result details page
        path = getQualifyingRoute() + `/${qual.slug}`
      } else if (qual.status?.code === 'user_started_not_finished') {
        // Navigate to the test page
        path = getQualifyingTaskRoute() + `/${qual.slug}`
      } else if (qual.status?.code === 'user_finished_olymp_not_finished') {
        clickHandler = () => {
          warning({ text: 'Дождитесь окончания отборочного этапа' })
        }
      }

      return (
        <Card
          title={qual.title}
          key={index}
          status={qual.status}
          path={path}
          onClick={clickHandler}
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
    <section id="qualifyign-stages-list">
      <PageWrapper>
        <PageTitle title="Отборочные этапы" />
        <PageDescription text="В данном разделе Вы можете зарегистрироваться на отборочные этапы олимпиад,  по которым у Вас успешно пройден отборочный этап, либо подать апелляцию в случае несогласия с выставленными баллами." />
        <PageSubmenu
          activeKey="list"
          items={[
            {
              key: 'list',
              label: 'Отборочные этапы',
              path: getQualifyingRoute(),
            },
            {
              key: 'results',
              label: ' Результаты',
              path: getQualifyingResultsRoute(),
            },
          ]}
        />
        <CardsLayout>{content}</CardsLayout>
      </PageWrapper>
    </section>
  )
}
