import { UserFilter } from './../general-page/filters/user/UserFilter'
import { useEffect } from 'react'
import { destroy, init } from './../../model/functions'
import { TasksList } from '@lib/archive'

type TasksSubjectPage = {
  subject: string
}

export const TasksSubjectPage = (props: TasksSubjectPage) => {
  const { subject } = props

  useEffect(() => {
    init()
    return () => {
      destroy()
    }
  }, [])

  return (
    <section id="task-subject-page" className="flex flex-col gap-4">
      <UserFilter showDescription={false} />
      <TasksList subject={subject} />
    </section>
  )
}