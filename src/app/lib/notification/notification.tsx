import { notificationSignal } from '@app/model/state'
import { Middleware } from '@reduxjs/toolkit'
import { Typography } from 'antd'
import cn from 'classnames'
import { ReactNode } from 'react'
import { AnyAction } from 'redux'

type NotificationProps = {
  text: ReactNode
  transactionLink?: string
}

const description = ({ text, transactionLink }: Pick<NotificationProps, 'text' | 'transactionLink'>) => {
  let description
  if (transactionLink) {
    description = (
      <div className='flex flex-col gap-3 w-full'>
        <Typography.Text className={cn('notification-text text-md')}>{text}</Typography.Text>
        <Typography.Link target='_blank' href={transactionLink}>
          Transaction Link
        </Typography.Link>
      </div>
    )
  } else {
    description = <Typography.Text className={cn('notification-text text-md')}>{text}</Typography.Text>
  }
  return description
}

export const success = (props: NotificationProps) => {
  const { text, transactionLink } = props
  notificationSignal.value?.success({ message: 'Успешно', description: description({ text, transactionLink }) })
}

export const warning = (props: NotificationProps) => {
  const { text, transactionLink } = props
  notificationSignal.value?.warning({ message: 'Предупреждение', description: description({ text, transactionLink }) })
}

export const error = (props: NotificationProps) => {
  const { text, transactionLink } = props
  notificationSignal.value?.error({ message: 'Ошибка', description: description({ text, transactionLink }) })
}

// TODO:
// @ts-ignore
export const errorMiddleware: Middleware = () => (next) => (action: AnyAction) => {
  // if (action.type.endsWith('/rejected')) {
  // }
  // if (action.type.endsWith('/fulfilled')) {
  //   console.log('RTK Query Fulfilled:', action)
  // }
  return next(action)
}
