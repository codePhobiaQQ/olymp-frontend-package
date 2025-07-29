import cn from 'classnames'
import { Card } from '@lib/olymps'

export const CardThin = (props: {
  className?: string
  title: string
  level?: string
  link: string
}) => {
  const { className, title, level, link } = props
  return (
    <Card
      classnames={{
        wrapperClassName: 'h-24 rounded-2xl',
        className: cn('olymp-card bg-[#AAB6DD4D]', className),
      }}
      description={level}
      title={title}
      path={link}
    />
  )
}
