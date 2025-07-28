import { ReactNode } from 'react'
import cn from 'classnames'

type Props = {
  className?: string
  children?: ReactNode
};

export const CardsLayout = (props: Props) => {
  return (
    <div className={cn('flex flex-wrap gap-4', props.className)}>
      {props.children}
    </div>
  )
}