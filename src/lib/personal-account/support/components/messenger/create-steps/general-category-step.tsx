import { Dispatch, SetStateAction, useEffect } from 'react'
import { Button, Skeleton } from 'antd'
import { Message } from '../message'
import { Data, Step } from '../create-issue'
import { showedPinFile, showMessageLine } from '../../../model/provider'
import { useGetSupportCategories } from './../../../model/api'
import { CategoryType } from './../../../model/types'

export const GeneralCategoryStep = ({
  setStep,
  setData,
}: {
  setStep: Dispatch<SetStateAction<Step>>
  setData: Dispatch<SetStateAction<Data>>
}) => {
  const { data: generalCategories, isLoading } = useGetSupportCategories({})
  console.log('generalCategories', generalCategories)

  useEffect(() => {
    showMessageLine.value = false
    showedPinFile.value = false
  }, [])

  const setGeneralCategoryHandler = (category: CategoryType) => () => {
    setData((_) => ({
      generalCategory: {
        value: category,
      },
    }))
    setTimeout(() => {
      setStep('category')
    }, 300)
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <>
      <Message
        name="Бот v-olymp"
        text="Выберите тему, по которой у Вас возник вопрос"
        timestamp={Date.now()}
        textCls="mb-2 text-lg font-medium"
      />
      <div style={{ maxWidth: '60%' }} className="ml-auto mt-10 flex flex-wrap justify-end gap-2">
        {generalCategories?.map((category) => {
          return (
            <Button
              onClick={setGeneralCategoryHandler(category)}
              key={category?.name}
              className="cursor-pointer"
            >
              {category?.label}
            </Button>
          )
        })}
      </div>
    </>
  )
}
