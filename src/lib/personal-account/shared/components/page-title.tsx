import { Typography } from 'antd'
import cn from 'classnames'

export const PageTitle = ({ title, rootClassName }: { title: string, rootClassName?: string }) => {
  return (
    <Typography.Title rootClassName={cn('mb-8 text-2xl', rootClassName)} level={3}>
      {title}
    </Typography.Title>
  )
}
