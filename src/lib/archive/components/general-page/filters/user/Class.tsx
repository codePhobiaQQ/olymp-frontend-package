import { Select, Typography } from 'antd'
import { FilterWrapper, getSelectProps } from './select-props'
import { changeClassHandler } from '../../../../model/functions.ts'
import { gradesSignal } from '../../../../model/provider.ts'
import { selectCls } from '../../../../model/consts.ts'
import { classOptions } from '@shared/consts/user'

export const Class = () => {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <Typography.Text className="text-lg">Класс <sup>*</sup></Typography.Text>
      <FilterWrapper>
        <Select
          {...getSelectProps({ options: classOptions, placeholder: 'Выберете класс' })}
          onChange={changeClassHandler}
          value={gradesSignal.value}
          className={selectCls}
        />
      </FilterWrapper>
    </div>
  )
}
