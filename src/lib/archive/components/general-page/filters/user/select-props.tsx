import { ConfigProvider, SelectProps } from 'antd'
import { ReactNode } from 'react'
import cn from 'classnames'

export const getSelectProps = ({
  options,
  placeholder = 'Выберете значение',
}: {
  options: SelectProps['options']
  placeholder: string
}): SelectProps => ({
  mode: 'multiple',
  rootClassName: cn('flex-1 max-w-screen-sm'),
  options,
  placeholder,
  maxTagCount: 'responsive',
})

export const FilterWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            controlHeight: 45,
            /* here is your component tokens */
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
