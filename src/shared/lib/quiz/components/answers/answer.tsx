import { QuestionI } from './../../model/types'
import { currentQuestion, questions, userAnswers } from './../../model/provider/provider'
import { ChooseAnswer } from './choose-answer'
import { TextAnswer } from './text-answer'

export const Answer = () => {
  let question: QuestionI | undefined
  if (currentQuestion.value !== undefined) {
    question = questions.value[currentQuestion.value - 1]
  }

  if (!question) {
    return null
  }

  let value: string = ''
  if (userAnswers.value[question.id]) {
    value = userAnswers.value[question.id].value
  } else if (question?.userAnswer) {
    value = question?.userAnswer
  }

  if (question?.answers?.length) {
    return (
      <ChooseAnswer
        id={question.id}
        questionId={question.question_id}
        value={value}
        answers={question?.answers}
      />
    )
  }

  return <TextAnswer id={question.id} questionId={question.question_id} value={value} />
}
