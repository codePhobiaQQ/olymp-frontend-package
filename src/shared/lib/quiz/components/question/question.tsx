import { Typography } from 'antd'
import { QuestionI } from './../../model/types'
import { Answer } from './../answers/answer'
import { Button } from '@shared/components/button'
import cls from './../Quiz.module.scss'
import cn from 'classnames'
import { isFullScreen, updateUserAnswer, userAnswers } from './../../model/provider/provider'
import { warning } from '@app/lib/notification'
import { QuizProps } from './../Quiz'
import { lazy } from 'react'

// Динамический импорт компонента Latex
const Latex = lazy(() => import('react-latex-next'))

export const Question = (props: { question: QuestionI; onAnswer?: QuizProps['onAnswer'] }) => {
  const { question, onAnswer } = props

  const answerQuestionHandler = () => {
    const answer = userAnswers.value?.[question.id]?.value
    if (!answer) {
      warning({ text: `Вы не ответили на задание` })
      return
    }
    const code = updateUserAnswer(question.id)
    if (code === -1) {
      return
    }

    // Backend
    onAnswer?.({ question_id: question.question_id, answer })
  }

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div
        className={cn('relative flex h-80 w-full flex-col gap-6 overflow-y-auto', cls.Question, {
          [cls.fullScreen]: isFullScreen.value,
        })}
      >
        {/* Title */}
        <div className="flex flex-col">
          <Typography.Title rootClassName="mb-0" level={4}>
            {question.title}
          </Typography.Title>
        </div>

        {/* Description */}
        {question?.description && (
          <div className="flex flex-col">
            <Latex>{question?.description}</Latex>
          </div>
        )}

        {/* Answers */}
        <Answer />
      </div>

      {/* Make an answer */}
      <div>
        <Button onClick={answerQuestionHandler}>Ответить</Button>
      </div>
    </div>
  )
}
