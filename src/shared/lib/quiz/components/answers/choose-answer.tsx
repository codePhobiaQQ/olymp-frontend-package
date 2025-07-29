import { Radio, RadioChangeEvent } from 'antd'
import { changeUserAnswer } from './../../model/provider/provider'
import cn from 'classnames'

export const ChooseAnswer = ({
  answers,
  value,
  id,
  questionId,
  isCorrect,
}: {
  answers?: string[]
  value?: string
  id?: number
  questionId?: string
  isCorrect?: boolean
}) => {
  const onChange = (e: RadioChangeEvent) => {
    if (!id || !questionId) return
    changeUserAnswer(id, questionId, e.target.value)
  }

  return (
    <Radio.Group onChange={onChange} value={value} className="flex flex-col gap-2">
      {answers?.map((answer, index) => {
        let incorrect: boolean | undefined
        if (answer === value && isCorrect === false) {
          incorrect = true
        }

        return (
          <Radio
            rootClassName={cn({ ['border-red-500 border p-2 rounded-lg']: incorrect })}
            key={index}
            value={answer}
          >
            {answer}
          </Radio>
        )
      })}
    </Radio.Group>
  )
}
