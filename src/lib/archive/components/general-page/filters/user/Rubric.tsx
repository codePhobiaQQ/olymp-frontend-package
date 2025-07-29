import { Select, Typography } from 'antd'
import { FilterWrapper, getSelectProps } from './select-props'
import { changeCategoryHandler } from '../../../../model/functions'
import { categoriesSignal, subjectSignal } from '../../../../model/provider'
import { selectCls } from '../../../../model/consts'
import { useGetSubjectRubrics } from '@lib/archive/model/api'
import { useEffect, useState } from 'react'
import { SubjectRubric } from './../../../../model/types'

export const Rubric = () => {
  const [rubrics, setRubrics] = useState<SubjectRubric[]>()
  const { data, isLoading } = useGetSubjectRubrics({ slug: subjectSignal.value! }, { skip: !subjectSignal.value })

  useEffect(() => {
    if (JSON.stringify(data) === JSON.stringify(rubrics)) {
      return
    }
    setRubrics(data)
    categoriesSignal.value = undefined
  }, [data, rubrics])

  return (
    <div className="flex flex-1 flex-col gap-1">
      <Typography.Text className="text-lg">Рубрика</Typography.Text>

      <FilterWrapper>
        <Select
          {...getSelectProps({ options: rubrics, placeholder: 'Выберете рубрику' })}
          onChange={changeCategoryHandler}
          value={categoriesSignal.value}
          className={selectCls}
          loading={isLoading}
        />
      </FilterWrapper>
    </div>
  )
}
