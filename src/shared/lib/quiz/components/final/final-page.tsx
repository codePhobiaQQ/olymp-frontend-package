import { questions, userAnswers } from './../../model/provider/provider'
import { Typography } from 'antd'
import cn from 'classnames'

export const FinalPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className={cn('flex items-center justify-between border-b pb-4 pt-4')}>
        <Typography.Title level={5}>Вопрос</Typography.Title>
        <Typography.Title className="mt-0" level={5}>
          Ответ
        </Typography.Title>
      </div>

      {questions.value?.map((question, index) => {
        let answer: string | undefined
        if (
          userAnswers.value?.[question.id]?.value &&
          userAnswers.value?.[question.id]?.needUpdate === false
        ) {
          answer = userAnswers.value?.[question.id]?.value
        } else if (question.userAnswer) {
          answer = question.userAnswer
        } else {
          answer = 'Нет ответа'
        }

        return (
          <div
            key={index}
            className={cn('flex items-start justify-between pb-2', {
              ['border-b']: index + 1 !== questions.value?.length,
            })}
          >
            <div className="flex items-center gap-2">
              <Typography.Text className="font-bold">{index + 1}.</Typography.Text>
              <Typography.Text>{question.title}</Typography.Text>
            </div>

            <div className="max-w-48">
              <Typography.Text>{answer}</Typography.Text>
            </div>
          </div>
        )
      })}
    </div>
  )
}
