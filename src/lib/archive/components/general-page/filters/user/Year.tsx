import { SelectProps, Select, Typography } from 'antd'
import { FilterWrapper, getSelectProps } from './select-props'
import { changeYearHandler } from '../../../../model/functions.ts'
import { getYears } from './../../../../model/utils'
import { yearsSignal } from '../../../../model/provider.ts'
import { selectCls } from '../../../../model/consts.ts'

export const Year = () => {
  const options: SelectProps['options'] = getYears(2000).map((year) => ({
    value: year,
    label: year,
    key: year
  }))

  return (
    <div className="flex flex-1 flex-col gap-1">
      <Typography.Text className="text-lg">Год</Typography.Text>
      <FilterWrapper>
        <Select
          {...getSelectProps({ options, placeholder: 'Выберете год' })}
          onChange={changeYearHandler}
          value={yearsSignal.value}
          className={selectCls}
        />
      </FilterWrapper>
    </div>
  )
}
