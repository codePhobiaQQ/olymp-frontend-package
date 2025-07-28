import { Button, Collapse, Rate, Typography } from 'antd'
import FavoriteSvg from '@public/svg/tasks/favorite.svg?react'
import ShareSvg from '@public/svg/tasks/share.svg?react'
import cls from './Task.module.scss'
import cn from 'classnames'
import { useState } from 'react'
import { messagesSignal } from '@app/model/state.ts'
import { getTaskArchiveRoute } from '@app/lib/route/routes.tsx'

export interface TaskProps {
  id: string
  title: string
  rate?: number
  isFavorite?: boolean
  state: string
  answer: string
  clue?: string
  decision?: string
  active?: boolean
}

export const Task = (props: TaskProps) => {
  const { title, rate, active, id, answer, clue, decision, isFavorite, state } = props

  return (
    <Collapse
      rootClassName={cn(cls.Task)}
      ghost
      defaultActiveKey={active ? id : undefined}
      items={[
        {
          id,
          showArrow: false,
          label: <TaskHeader id={id} title={title} rate={rate} isFavorite={isFavorite} />,
          children: <TaskBody answer={answer} clue={clue} decision={decision} state={state} />,
        },
      ]}
    />
  )
}

const TaskHeader = (props: Pick<TaskProps, 'isFavorite' | 'rate' | 'title' | 'id'>) => {
  const { title, rate, id, isFavorite } = props
  const [favorite, setIsFavorite] = useState<boolean>(isFavorite ?? false)

  const toggleFavoriteHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    messagesSignal.value?.success({
      content: `Задача ${favorite ? 'удалена из избранных' : 'добавлена в избранное'}`,
    })
    setIsFavorite((prev) => {
      return !prev
    })
  }

  const shareHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    navigator.clipboard.writeText(window.location.hostname + getTaskArchiveRoute() + `/${id}`)
    messagesSignal.value?.info({
      content: `Ссылка на задачу скопирована`,
    })
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b-2 border-gray1 pb-4 pt-4">
      <Typography.Title level={4} className="text-xl font-medium">
        {title}
      </Typography.Title>

      <div className="flex items-center gap-16">
        {rate && (
          <div className="flex items-center gap-2">
            <Typography.Text className="font-normal italic">{rate}</Typography.Text>
            <Rate allowHalf disabled value={rate} defaultValue={rate} />
          </div>
        )}

        <div className="flex items-center gap-2" onClick={toggleFavoriteHandler}>
          <FavoriteSvg
            className={cn('h-6 w-4 stroke-gray1', {
              ['stroke-gray1']: !favorite,
              ['fill-gray1']: favorite,
            })}
          />
          <Typography.Text className="italic underline">В избранное</Typography.Text>
        </div>

        <div className="flex items-center gap-2" onClick={shareHandler}>
          <ShareSvg className="h-6 w-5 fill-gray1" />
          <Typography.Text className="italic underline">Поделиться</Typography.Text>
        </div>
      </div>
    </div>
  )
}

type ActionType = 'answer' | 'clue' | 'decision'

const TaskBody = (props: Pick<TaskProps, 'state' | 'clue' | 'decision' | 'answer'>) => {
  const { state, answer, decision, clue } = props
  const [action, setAction] = useState<ActionType | undefined>()

  const changeActionHandler = (actionType: ActionType) => () => {
    if (actionType === action) {
      setAction(undefined)
    } else {
      setAction(actionType)
    }
  }

  let actionValue
  let actionTitle
  if (action === 'decision') {
    actionValue = decision
    actionTitle = 'Решение'
  } else if (action === 'answer') {
    actionValue = answer
    actionTitle = 'Ответ'
  } else if (action === 'clue') {
    actionValue = clue
    actionTitle = 'Подсказка'
  }

  return (
    <div className="flex flex-col gap-6 pb-16 pt-10">
      <Typography.Title className="text-2xl font-medium">Условие</Typography.Title>
      <Typography.Text className="text-xl font-light">{state}</Typography.Text>
      <div className="flex items-center gap-2">
        <Button
          type={action === 'answer' ? 'primary' : 'default'}
          onClick={changeActionHandler('answer')}
        >
          Ответ
        </Button>
        <Button
          type={action === 'clue' ? 'primary' : 'default'}
          onClick={changeActionHandler('clue')}
        >
          Подсказка
        </Button>
        <Button
          type={action === 'decision' ? 'primary' : 'default'}
          onClick={changeActionHandler('decision')}
        >
          Решение
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <Typography.Title className="text-2xl font-medium">{actionTitle}</Typography.Title>
        <Typography.Text className="text-xl font-light">{actionValue}</Typography.Text>
      </div>
    </div>
  )
}
