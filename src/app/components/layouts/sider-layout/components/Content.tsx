import cn from 'classnames'
import { ReactNode } from 'react'

interface ContentProps {
  children?: ReactNode
}

export const Content = (props: ContentProps) => {
  const { children } = props

  return <div className={cn('absolute top-0 left-20 p-10 w-10/12')}>{children}</div>
}
