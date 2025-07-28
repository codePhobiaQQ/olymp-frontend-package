import { PageWrapper } from '@shared/components/page-wrapper'
import { Container } from '@app/components/layouts/Container'
import { Task, TaskProps } from './../tasks/Task'
import { Typography } from 'antd'

export const TaskDetailsPage = () => {
  const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]

  const task: TaskProps = {
    id: '2',
    title: 'Сумма квадратов делителей',
    isFavorite: true,
    rate: 0.8,
    answer: '10',
    decision: 'decision',
    clue: 'clue',
    state:
      'Из центра O сферы радиуса R проведены три луча, пересекающие сферу в точках A, B и C. Известно, что ∠AOB=∠AOC=∠BOC=60°. Найдите площадь части сферы, ограниченной плоскостями (AOB), (AOC) и (BOC).',
  }

  return (
    <PageWrapper id="archive-tasks-detail-page" className="section-padding bg-section1">
      <Container containerInnerClassname="flex flex-col gap-20">
        <div className="flex flex-col gap-10">
          <Typography.Title level={2}>Задача {id}</Typography.Title>
          <Task {...task} />
        </div>
        <div className="flex flex-col gap-10">
          <Typography.Title level={2}>Похожие задачи</Typography.Title>
          <Task {...task} />
        </div>
      </Container>
    </PageWrapper>
  )
}
