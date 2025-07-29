import cn from 'classnames'
import { Typography } from 'antd'

export const SectionTitle = ({ title }: { title: string }) => {
  return (
    <Typography.Title className={cn('gradient-text mb-8 inline-block w-fit text-2xl md:text-3xl')} level={4}>
      {title}
    </Typography.Title>
  )
}
