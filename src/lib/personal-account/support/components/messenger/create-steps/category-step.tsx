import { Dispatch, SetStateAction, useEffect } from 'react'
import { Button, Skeleton } from 'antd'
import { showMessageLine, showedPinFile } from '../../../model/provider'
import { Message } from '../message.tsx'
import { Data, Step } from '../create-issue'
import { ResetForm } from './reset-form'
import { useGetSupportCategories } from './../../../model/api'
import { ChosenDataInfo } from './../../shared/chosen-data-info'

type Category = { label: string; name: string }

export const CategoryStep = ({
  setStep,
  setData,
  data,
}: {
  setStep: Dispatch<SetStateAction<Step>>
  setData: Dispatch<SetStateAction<Data>>
  data: Data
}) => {
  const { data: generalCategories, isLoading } = useGetSupportCategories({
    topic: data.generalCategory?.value?.name,
  })

  useEffect(() => {
    showMessageLine.value = false
    showedPinFile.value = false
  }, [])

  const chooseCategoryHandler = (category: Category) => () => {
    setData((prev) => ({
      generalCategory: { value: prev['generalCategory']?.value },
      category: {
        value: category,
      },
    }))

    setTimeout(() => {
      setStep('title')
    }, 300)
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <>
      <Message
        name="Бот v-olymp"
        text={<ChosenDataInfo data={data} title="Выберите категорию Вашего обращения" />}
        timestamp={Date.now()}
      />

      <div style={{ maxWidth: '60%' }} className="ml-auto mt-10 flex flex-wrap justify-end gap-2">
        {generalCategories?.map((category) => {
          return (
            <Button
              onClick={chooseCategoryHandler(category)}
              key={category.name}
              className={'cursor-pointer'}
            >
              {category.label}
            </Button>
          )
        })}
      </div>

      <ResetForm setStep={setStep} setData={setData} />
    </>
  )
}
