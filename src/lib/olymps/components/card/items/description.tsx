import { CardProps } from './../Card'
import { Typography } from 'antd'
import { HtmlParse } from '@shared/lib/html-parse'

export const Description = (props: CardProps) => {
  const { status, description } = props

  if (!description) {
    return null
  }

  if (status !== undefined) {
    return null
  }

  return (
    <div className="description z-10 max-w-60">
      <Typography.Text className="text-xs">{<HtmlParse stringifyHTML={description} />}</Typography.Text>
    </div>
  )
}
