import { HTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  containerClassname?: string
  containerInnerClassname?: string
  children?: ReactNode
  containerFluent?: boolean
}

export const Container = (props: Props) => {
  const {
    children,
    containerClassname,
    containerInnerClassname,
    containerFluent = false,
    ...otherProps
  } = props

  return (
    <div {...otherProps} className={cn('container-custom', containerClassname)}>
      <div
        className={cn('container-inner', containerInnerClassname, {
          ['container-fluent']: containerFluent,
        })}
      >
        {children}
      </div>
    </div>
  )
}
