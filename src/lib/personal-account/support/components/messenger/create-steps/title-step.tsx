import { Dispatch, SetStateAction, useEffect } from 'react'
import { actionSignal, showMessageLine, showedPinFile } from '../../../model/provider'
import { warning } from '@app/lib/notification'
import { Message } from '../message'
import { Data, Step } from '../create-issue'
import { ResetForm } from './reset-form'
import { ChosenDataInfo } from './../../shared/chosen-data-info.tsx'

export const TitleStep = ({
  setStep,
  setData,
  data,
}: {
  setStep: Dispatch<SetStateAction<Step>>
  setData: Dispatch<SetStateAction<Data>>
  data: Data
}) => {
  useEffect(() => {
    showMessageLine.value = true
    showedPinFile.value = false

    actionSignal.value = ({ value }: { value: string }) => {
      if (!value) {
        warning({ text: 'Вы не ввели тему обращения' })
        return
      }

      setData((prev) => {
        return {
          generalCategory: { value: prev['generalCategory']?.value },
          category: { value: prev['category']?.value },
          title: { value },
        }
      })

      setStep('description')
    }
  }, [])

  return (
    <>
      <Message
        name="Бот v-olymp"
        text={<ChosenDataInfo data={data} title="Напишите тему Вашего обращения" />}
        timestamp={Date.now()}
      />
      <ResetForm setStep={setStep} setData={setData} />
    </>
  )
}
