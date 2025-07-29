import cn from 'classnames'
import cls from './Segment.module.scss'
import { Segmented, SegmentedProps } from 'antd'

interface SegmentProps extends Pick<SegmentedProps, 'options' | 'value' | 'onChange'> {
  className?: string
}

export const Segment = ({ options, value, onChange, className }: SegmentProps) => {
  return (
    <Segmented
      options={options}
      value={value}
      onChange={onChange}
      className={cn(cls.Segment, className)}
    />
  )
}
