import { FC } from 'react'
import cls from './Dropdown.module.scss'
import cn from 'classnames'
import { Dropdown as DropdownAntd, DropdownProps as DropdownAntdProps } from 'antd'

export interface DropdownProps extends DropdownAntdProps {}

export const Dropdown: FC<DropdownProps> = (props) => {
  const { className, ...otherProps } = props
  return <DropdownAntd {...otherProps} className={cn(className, cls.Dropdown)} />
}
