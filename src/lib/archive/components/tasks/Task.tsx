import { Button, Collapse, Rate, Spin, Typography } from 'antd'
import FavoriteSvg from '/public/svg/tasks/favorite.svg?react'
import ShareSvg from '/public/svg/tasks/share.svg?react'
import cls from './Task.module.scss'
import cn from 'classnames'
import { lazy, MouseEvent, Suspense, useState } from 'react'
import { useSelector } from 'react-redux'
import { getIsUserLogin } from '@lib/auth/model/selectors/auth'
import { ShareLink } from '@shared/components/share-link'
import { useAddArchiveTaskToggleFavorite, useRateArchiveTask } from './../../model/api'
import { prefixImgSrc } from '@lib/latex'

const Latex = lazy(() => import('react-latex-next'))

export interface TaskProps {
  id: string
  title: string
  rate?: number
  isFavourite?: boolean
  state: string
  answer: string
  clue?: string
  solution?: string
  active?: boolean
}

export const Task = (props: TaskProps) => {
  const { title, rate, active, id, answer, clue, solution, isFavourite, state } = props

  return (
    <Collapse
      rootClassName={cn(cls.Task)}
      ghost
      defaultActiveKey={active ? id : undefined}
      items={[
        {
          id,
          showArrow: false,
          label: <TaskHeader id={id} title={title} rate={rate} isFavourite={isFavourite} />,
          children: <TaskBody answer={answer} clue={clue} solution={solution} state={state} />,
        },
      ]}
    />
  )
}

const TaskHeader = (props: Pick<TaskProps, 'isFavourite' | 'rate' | 'title' | 'id'>) => {
  const { title, rate, id, isFavourite } = props
  const isAuth = useSelector(getIsUserLogin)

  const [toggleFavor] = useAddArchiveTaskToggleFavorite()
  const [rateTask] = useRateArchiveTask()

  const [currentRate, setCurrentRate] = useState<number | undefined>(rate)
  const [favorite, setIsFavorite] = useState<boolean>(isFavourite ?? false)

  const rateHandler = (stars: number) => {
    rateTask({ id, mark: stars * 2, setRate: setCurrentRate })
  }

  const toggleFavoriteHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    toggleFavor({ id, setIsFavorite })
  }

  return (
    <div className="flex w-full flex-col flex-wrap items-start justify-between gap-4 border-b-2 border-gray1 pb-4 pt-4 md:flex-row md:items-center">
      <div className="max-w-96">
        <Typography.Title ellipsis level={4} className="text-xl font-medium">
          {title}
        </Typography.Title>
      </div>

      <div className="flex items-start gap-4 md:gap-8">
        <div
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className="flex flex-col items-start gap-2"
        >
          <div className="flex w-48 items-center gap-3">
            {Boolean(Number(rate)) && (
              <Typography.Text className="text-nowrap font-normal italic">
                {Number(rate) / 2}
              </Typography.Text>
            )}
            <Rate
              rootClassName="cursor-pointer"
              onChange={rateHandler}
              value={currentRate ? currentRate / 2 : 0}
              allowHalf
              defaultValue={rate ? rate / 2 : 0}
            />
          </div>
          {Boolean(Number(currentRate)) && (
            <Typography.Paragraph>Ваша оценка: {currentRate! / 2}</Typography.Paragraph>
          )}
        </div>

        <div
          className={cn('flex items-center gap-2', { ['pointer-events-none opacity-55']: !isAuth })}
          onClick={toggleFavoriteHandler}
        >
          <FavoriteSvg
            className={cn('h-6 w-4 stroke-gray1 transition-all', {
              ['stroke-gray1']: !favorite,
              ['fill-gray1']: favorite,
            })}
          />
          <Typography.Text className="text-nowrap italic underline">В избранное</Typography.Text>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <ShareLink
            className="flex items-center gap-2"
            url={window.location.href.split('?')[0] + `/${id}`}
          >
            <ShareSvg className="h-6 w-5 fill-gray1" />
            <Typography.Text className="text-nowrap italic underline">Поделиться</Typography.Text>
          </ShareLink>
        </div>
      </div>
    </div>
  )
}

type ActionType = 'answer' | 'clue' | 'solution'

const TaskBody = (props: Pick<TaskProps, 'state' | 'clue' | 'solution' | 'answer'>) => {
  const { state, answer, solution, clue } = props
  const [action, setAction] = useState<ActionType | undefined>()

  const changeActionHandler = (actionType: ActionType) => () => {
    if (actionType === action) {
      setAction(undefined)
    } else {
      setAction(actionType)
    }
  }

  let actionValue: any
  // let actionTitle

  if (action === 'solution') {
    actionValue = solution
    // actionTitle = 'Решение'
  } else if (action === 'answer') {
    actionValue = answer
    // actionTitle = 'Ответ'
  } else if (action === 'clue') {
    actionValue = clue
    // actionTitle = 'Подсказка'
  }

  return (
    <div className="flex flex-col gap-6 pb-16 pt-10">
      <Suspense fallback={<Spin />}>
        <Typography.Title className="text-2xl font-medium">Условие</Typography.Title>

        <Typography.Text className="text-xl font-light">
          <Latex>{prefixImgSrc(state)}</Latex>
        </Typography.Text>

        <div className="flex items-center gap-2">
          <Button
            type={action === 'answer' ? 'primary' : 'default'}
            onClick={changeActionHandler('answer')}
          >
            Ответ
          </Button>

          {!!clue &&
            <Button
              type={action === 'clue' ? 'primary' : 'default'}
              onClick={changeActionHandler('clue')}
            >
              Подсказка
            </Button>
          }
          <Button
            type={action === 'solution' ? 'primary' : 'default'}
            onClick={changeActionHandler('solution')}
          >
            Решение
          </Button>
        </div>

        <div className="mt-5 flex flex-col gap-6">
          {/*<Typography.Title className="mb-0 text-xl font-medium">{actionTitle}</Typography.Title>*/}

          <Typography.Text className="text-lg font-light">
            {actionValue && <Latex>{prefixImgSrc(actionValue)}</Latex>}
          </Typography.Text>
        </div>
      </Suspense>
    </div>
  )
}
