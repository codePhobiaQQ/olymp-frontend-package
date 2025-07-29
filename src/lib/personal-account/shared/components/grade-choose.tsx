import { Select, SelectProps, Typography } from 'antd'
import { classOptions } from '@shared/consts/user'
import { TextProps } from 'antd/lib/typography/Text'

export const GradeChoose = (props: SelectProps & { labelProps?: TextProps }) => {
  const { labelProps, ...otherProps } = props

  // -------- Label -----------
  let label
  if (labelProps) {
    label = <Typography.Text {...labelProps} />
  }

  return (
    <div className="flex flex-col gap-2">
      {label}
      <Select
        allowClear
        placeholder="Выберите класс"
        options={otherProps.options ?? classOptions}
        value={otherProps.value}
        onChange={otherProps.onChange}
        {...otherProps}
      />
    </div>
  )
}