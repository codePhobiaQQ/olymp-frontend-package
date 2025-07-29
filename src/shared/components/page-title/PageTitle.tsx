import { Typography } from 'antd'
import cn from 'classnames'

export const PageTitle = ({ text }: { text: string }) => {
  return (
    <Typography.Title
      className={cn('gradient-text flex font-semibold text-3xl md:text-4xl')}
      level={2}
    >
      {text}
    </Typography.Title>
  )
}
