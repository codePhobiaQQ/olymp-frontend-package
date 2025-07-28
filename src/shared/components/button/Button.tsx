import { FC } from 'react'
import { Button as ButtonAntd, ButtonProps as ButtonPropsAntd } from 'antd'
import cls from './Button.module.scss'
import cn from 'classnames'

type Variant = 'blue'

export interface ButtonProps extends ButtonPropsAntd {
  className?: string
  variant?: Variant
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, variant = 'blue', ...otherProps } = props

  return <ButtonAntd {...otherProps} type="primary" rootClassName={cn(className, cls.Button)} />
}
