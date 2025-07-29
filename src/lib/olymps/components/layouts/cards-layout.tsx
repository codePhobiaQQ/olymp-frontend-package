import { ReactNode } from 'react'
import cn from 'classnames'
import { EqualHeight } from 'react-equal-height'

type Props = {
  className?: string
  children?: ReactNode
}

export const CardsLayout = (props: Props) => {
  return (
    <EqualHeight>
      <div className={cn('flex flex-wrap gap-2', props.className)}>{props.children}</div>
    </EqualHeight>
  )
}
