import { Input as InputAntd, InputProps, Typography, Flex } from 'antd'
import { TextProps } from 'antd/lib/typography/Text'
import { useId, useRef } from 'react'

interface Props extends InputProps {
  labelProps?: TextProps
}

export const Input = (props: Props) => {
  const { placeholder = 'Введите данные', labelProps, ...otherProps } = props

  const inputRef = useRef<any>(null)
  const inputId = useId()

  // -------- Label -----------
  let label
  if (labelProps) {
    label = (
      <Typography.Text
        {...labelProps}
        onClick={() => inputRef.current?.focus()}
        className="cursor-pointer"
      />
    )
  }

  // -------- input -----------
  const commonProps = {
    id: inputId,
    ref: inputRef,
    placeholder,
    ...otherProps,
  }

  const input =
    otherProps.type === 'password' ? (
      <InputAntd.Password {...commonProps} />
    ) : (
      <InputAntd {...commonProps} />
    )

  return (
    <Flex gap="small" vertical>
      {label}
      {input}
    </Flex>
  )
}
