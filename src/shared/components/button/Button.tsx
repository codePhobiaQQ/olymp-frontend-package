import { FC } from 'react'
import { Button as ButtonAntd, ButtonProps as ButtonPropsAntd } from 'antd'
import cls from './Button.module.scss'
import cn from 'classnames'

export interface ButtonProps extends ButtonPropsAntd {
  className?: string
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, ...otherProps } = props

  return <ButtonAntd {...otherProps} type="primary" rootClassName={cn(className, cls.Button)} />
}
