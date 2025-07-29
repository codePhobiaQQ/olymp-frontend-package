import { ChooseAnswer, QuestionType, TextAnswer } from '@shared/lib/quiz'

interface AnswerProps {
  answer?: string[]
  answers?: string[]
  type?: QuestionType
  is_correct?: boolean
}

export const Answer = (props: AnswerProps) => {
  const { answer, answers, type, is_correct } = props

  if (type === 'multi_choose') {
    return <ChooseAnswer isCorrect={is_correct} answers={answers} value={answer?.[0]} />
  } else if (type === 'short_answer') {
    return <TextAnswer isCorrect={is_correct} value={answer?.[0]} />
  }

  return (
    <div>
      {answer}
      {JSON.stringify(answers)}
      {type}
      {is_correct}
    </div>
  )
}
