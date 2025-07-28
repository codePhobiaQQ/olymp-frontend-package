import { Select, SelectProps, Typography } from 'antd'
import { FilterWrapper, getSelectProps } from './select-props'
import { changeCategoryHandler } from './../../../../model/general-page/functions'
import { categorySignal } from './../../../../model/general-page/provider'
import { selectCls } from './../../../../model/general-page/consts.ts'

export const Rubric = () => {
  const options: SelectProps['options'] = [
    { value: 'geometry', label: 'Геометрия' },
    { value: 'ariphmetic', label: 'Арифметика' },
    { value: 'teory', label: 'Теория вероятности' },
  ]

  return (
    <div className="flex flex-1 flex-col gap-1">
      <Typography.Text className="text-lg">Рубрика</Typography.Text>
      <FilterWrapper>
        <Select
          {...getSelectProps({ options, placeholder: 'Выберете рубрику' })}
          onChange={changeCategoryHandler}
          value={categorySignal.value}
          className={selectCls}
        />
      </FilterWrapper>
    </div>
  )
}
