import { Dispatch, SetStateAction, useEffect } from 'react'
import { Data, Step } from '../create-issue.tsx'
import { issueId, messengerStatus, showedPinFile, showMessageLine } from '../../../model/provider'
import { Message } from '../message.tsx'
import { Button, Spin } from 'antd'
import { useCreateTicket } from '../../../model/api'
import { ResetForm } from './reset-form'
import { ChosenDataInfo } from './../../shared/chosen-data-info'

export const FinalStep = ({
  setStep,
  setData,
  data,
}: {
  setStep: Dispatch<SetStateAction<Step>>
  setData: Dispatch<SetStateAction<Data>>
  data: Data
}) => {
  const [createTicket, { isLoading }] = useCreateTicket()

  useEffect(() => {
    showMessageLine.value = false
    showedPinFile.value = false
  }, [])

  const send = () => {
    createTicket({
      category: data?.category?.value?.name ?? '',
      title: data?.title?.value ?? '',
      description: data?.description?.value ?? '',
    }).then(() => {
      messengerStatus.value = undefined
      issueId.value = undefined
    })
  }

  return (
    <>
      <Message
        name="Бот v-olymp"
        text={
          <ChosenDataInfo
            title="Проверьте данные, если все хорошо, отправляйте обращение"
            data={data}
          />
        }
        timestamp={Date.now()}
      />
      <div style={{ maxWidth: '60%' }} className="ml-auto mt-10 flex flex-wrap justify-end gap-2">
        <ResetForm setStep={setStep} setData={setData} />
        <Button className="border-green-500 text-green-500" onClick={send}>
          Отправить обращение
        </Button>
      </div>

      {isLoading && <Spin className="mt-4" />}
    </>
  )
}
