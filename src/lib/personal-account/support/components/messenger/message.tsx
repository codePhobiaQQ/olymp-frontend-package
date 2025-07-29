import { Typography } from 'antd'
import cn from 'classnames'
import { formatTime } from '@shared/utils/time'
import { ReactNode } from 'react'

export const Message = ({
  text,
  isUser = false,
  timestamp,
  name,
  textCls,
}: {
  text?: ReactNode
  isUser?: boolean
  timestamp?: number
  name?: string
  textCls?: string
}) => {
  return (
    <div
      className={cn('flex w-full flex-shrink-0 rounded-xl', {
        ['justify-end']: isUser,
        ['justify-start']: !isUser,
      })}
    >
      <div
        style={{ maxWidth: '75%' }}
        className={cn('flex min-w-80 flex-col gap-4 rounded-md p-5', {
          ['bg-secondary']: !isUser,
          ['bg-accentBlueLight']: isUser,
        })}
      >
        {name && (
          <div>
            <Typography.Text className="font-medium">{name}</Typography.Text>
          </div>
        )}

        {text && <Typography.Text className={cn(textCls)}>{text}</Typography.Text>}

        {timestamp && (
          <div className="flex justify-end">
            <Typography.Text className="text-gray-500">{formatTime(timestamp)}</Typography.Text>
          </div>
        )}
      </div>
    </div>
  )
}
