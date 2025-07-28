import { FC } from 'react'
import cls from './Switcher.module.scss'
import cn from 'classnames'
import { Segmented, SegmentedProps } from 'antd'
import type { SegmentedValue as RcSegmentedValue } from 'rc-segmented'

export interface SwitcherProps<ValueType = RcSegmentedValue> extends SegmentedProps<ValueType> {}

export const Switcher: FC<SwitcherProps> = (props) => {
  const { className, onChange, value, options, ...otherProps } = props

  return (
    // @ts-ignore
    <Segmented
      {...otherProps}
      options={options}
      value={value}
      onChange={onChange}
      className={cn(className, cls.Switcher)}
    />
  )
}
