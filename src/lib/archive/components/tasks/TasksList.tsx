import { Task, TaskProps } from './Task'
import { Pagination, Spin, Typography } from 'antd'
import { useGetArchiveTasksList } from './../../model/api'
import { limitSignal, pageSignal, subjectSignal } from './../../model/provider'
import cn from 'classnames'
import cls from './Task.module.scss'
import { changeArchivePageHandler } from './../../model/functions'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getIsUserLogin } from '@lib/auth/model/selectors/auth'
import { FAVORITES_FILTER_KEY } from './../../model/consts.ts'

interface TasksListProps {
  className?: string
  subject: string
  grades?: string[]
  categories?: string[]
  years?: string[]
}

export const TasksList = (props: TasksListProps) => {
  const { className, subject, grades, years, categories } = props
  const [tasks, setTasks] = useState<TaskProps[] | undefined>([])
  const isLoggedIn = useSelector(getIsUserLogin)

  const subjectRef = useRef<string>()
  const gradesRef = useRef<string>()
  const categoriesRef = useRef<string>()
  const yearsRef = useRef<string>()

  const [loadingUi, setIsLoadingUi] = useState<boolean>(false)

  const loadUiHandler = () => {
    setIsLoadingUi(true)
    setTimeout(() => {
      setIsLoadingUi(false)
    }, 500)
  }

  const { data, isLoading } = useGetArchiveTasksList({
    limit: limitSignal.value,
    page: pageSignal.value,
    subject,
    grades,
    categories,
    years,
  }, {})

  // ------------------------
  // Sync Params
  // ------------------------

  useEffect(() => {
    if (!subject) {
      setTasks([])
      pageSignal.value = 1
      return
    }

    if (!subjectRef.current || !gradesRef.current || !categoriesRef.current || !yearsRef.current) {
      subjectRef.current = subject
      gradesRef.current = JSON.stringify(grades)
      categoriesRef.current = JSON.stringify(categories)
      yearsRef.current = JSON.stringify(years)
      return
    }

    if (
      subjectRef.current !== subject ||
      gradesRef.current !== JSON.stringify(grades) ||
      yearsRef.current !== JSON.stringify(years) ||
      categoriesRef.current !== JSON.stringify(categories)
    ) {
      loadUiHandler()
      setTasks([])
      pageSignal.value = 1
    }
  }, [subject, grades, years, categories])

  // ------------------------
  // Sync Tasks
  // ------------------------

  useEffect(() => {
    if (JSON.stringify(data?.data) === JSON.stringify(tasks)) {
      return
    }
    loadUiHandler()
    setTasks(data?.data)
  }, [data?.data, tasks, subject])

  // ------------------------
  
  const notLoggedInAndFavorite = !isLoggedIn && subjectSignal.value === FAVORITES_FILTER_KEY

  let count
  if (data?.count) {
    count = data?.count
  }

  if (!props.subject) {
    return (
      <div>
        <Typography.Text>Пожалуйста выберете интересующую вас олимпиаду</Typography.Text>
      </div>
    )
  }

  // ---------------------------

  let content
  if (isLoading || loadingUi) {
    content = (
      <div className="w-full h-32 flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }
  else if (notLoggedInAndFavorite) {
    content = (
      <div>
        <Typography.Text className="text-lg">Для того, чтобы иметь возможность сохранять задачи, нужно авторизоваться</Typography.Text>
      </div>
    )
  }
  else if (!tasks?.length) {
    content = (
      <div>
        <Typography.Text className="text-lg">К сожалению таких задач пока нет...</Typography.Text>
      </div>
    )
  } else {
    content = <>
      {tasks?.map((task) => <Task key={task.id} {...task} />)}
    </>
  }

  return (
    <div className={cn('flex flex-col gap-5', cls.TaskList, className)}>
      {content}

      {!notLoggedInAndFavorite &&
        <Pagination
          className="mt-4"
          current={pageSignal.value}
          pageSize={limitSignal.value}
          align="center"
          total={count}
          onChange={changeArchivePageHandler}
        />
      }
    </div>
  )
}
