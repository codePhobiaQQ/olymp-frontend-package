import { SelectProps, Select, Typography } from 'antd'
import { FilterWrapper, getSelectProps } from './select-props'
import { changeYearHandler } from './../../../../model/general-page/functions'
import { getYears } from './../../../../model/utils'
import { yearSignal } from './../../../../model/general-page/provider'
import { selectCls } from './../../../../model/general-page/consts'

export const Year = () => {
  const options: SelectProps['options'] = getYears(2000).map((year) => ({
    value: year,
    label: year,
  }))

  return (
    <div className="flex flex-1 flex-col gap-1">
      <Typography.Text className="text-lg">Год</Typography.Text>
      <FilterWrapper>
        <Select
          {...getSelectProps({ options, placeholder: 'Выберете год' })}
          onChange={changeYearHandler}
          value={yearSignal.value}
          className={selectCls}
        />
      </FilterWrapper>
    </div>
  )
}
