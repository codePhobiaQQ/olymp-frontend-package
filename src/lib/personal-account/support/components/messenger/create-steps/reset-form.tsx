import { Dispatch, SetStateAction } from 'react'
import { Data, Step } from './../create-issue'
import { Button } from 'antd'

export const ResetForm = ({
  setData,
  setStep,
}: {
  setStep: Dispatch<SetStateAction<Step>>
  setData: Dispatch<SetStateAction<Data>>
}) => {
  const resetHandler = () => {
    setData({})
    setStep('generalCategory')
  }

  return (
    <div className="ml-auto">
      <Button danger onClick={resetHandler}>
        Сбросить данные
      </Button>
    </div>
  )
}
