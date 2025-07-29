import { PageWrapper } from '@shared/components/page-wrapper'
import { Container } from '@/app/components/layouts/container'
import { Task } from './../tasks/Task'
import { Spin, Typography } from 'antd'
import { useGetArchiveTask } from './../../model/api'

export const TaskDetailsPage = () => {
  const id = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
  const { data: task, isLoading } = useGetArchiveTask({ id })

  console.log(task)

  let content
  if (isLoading) {
    content = <Spin />
  }
  else if (!task) {
    content = (
      <div className="flex justify-center">
        <Typography.Paragraph className="text-gray-500">Такой задачи не было найдено :(</Typography.Paragraph>
      </div>
    )
  } else {
    content = (
      <div className="flex flex-col gap-10">
        <Typography.Title level={2}>Задача {id}</Typography.Title>
        <Task {...task} />
      </div>
    )
  }

  return (
    <PageWrapper id="archive-tasks-detail-page" className="section-padding bg-section1">
      <Container containerInnerClassname="flex flex-col gap-20">
        {content}
      </Container>
    </PageWrapper>
  )
}
