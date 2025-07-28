import { useGetQualifyingStage } from './../model/services'
import { Skeleton, Typography } from 'antd'
import { ReactNode } from 'react'
// import { Quiz } from '@lib/personal-account/lib/qualifying-stage'

type QualifyingTaskProps = {
  olympSlug: string
}

export const QualifyingTask = (props: QualifyingTaskProps) => {
  const { olympSlug } = props
  // @ts-ignore
  const { data: task, isLoading, error } = useGetQualifyingStage(olympSlug)

  let content: ReactNode
  if (isLoading) {
    content = <Skeleton />
  } else if (error) {
    content = <Typography.Text>{JSON.stringify(error || '')}</Typography.Text>
  } else {
    content = 'quiz'
    // content = <Quiz questions={task} />
  }

  return <>{content}</>
}
