import { CardProps } from './../Card'
import { Typography } from 'antd'
import cn from 'classnames'
import { EqualHeightElement } from 'react-equal-height'

export const Title = (props: CardProps) => {
  const { title, status } = props

  let className: string = ''
  if (status != undefined) {
    className = 'text-primary'
  }

  return (
    <div className="title z-10">
      <EqualHeightElement name="card_title">
        <Typography.Title level={4} className={cn(className, 'font-monsterat text-lg card-title')}>{title}</Typography.Title>
      </EqualHeightElement>
    </div>
  )
}
