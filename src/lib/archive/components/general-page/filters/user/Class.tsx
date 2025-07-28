import { Select, SelectProps, Typography } from 'antd'
import { FilterWrapper, getSelectProps } from './select-props'
import { changeClassHandler } from './../../../../model/general-page/functions'
import { classSignal } from './../../../../model/general-page/provider'
import { selectCls } from './../../../../model/general-page/consts'

export const Class = () => {
  const options: SelectProps['options'] = [
    { value: '7', label: '7 класс' },
    { value: '8', label: '8 класс' },
    { value: '9', label: '9 класс' },
    { value: '10', label: '10 класс' },
    { value: '11', label: '11 класс' },
  ]

  return (
    <div className="flex flex-1 flex-col gap-1">
      <Typography.Text className="text-lg">Класс</Typography.Text>
      <FilterWrapper>
        <Select
          {...getSelectProps({ options, placeholder: 'Выберете класс' })}
          onChange={changeClassHandler}
          value={classSignal.value}
          className={selectCls}
        />
      </FilterWrapper>
    </div>
  )
}
