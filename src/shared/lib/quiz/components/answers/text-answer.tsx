import { Input } from '@shared/components/input'
import { changeUserAnswer } from './../../model/provider/provider'
import { ChangeEvent } from 'react'
import cn from 'classnames'

export const TextAnswer = ({
  value,
  id,
  questionId,
  isCorrect,
}: {
  value?: string
  id?: number
  questionId?: string
  isCorrect?: boolean
}) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!id || !questionId) return
    changeUserAnswer(id, questionId, e.target.value)
  }

  let incorrect: boolean | undefined
  if (isCorrect === false) {
    incorrect = true
  }

  return (
    <Input
      className={cn({ ['border border-red-500']: incorrect })}
      onChange={onChange}
      value={value}
      placeholder="Напишите свой ответ"
    />
  )
}
