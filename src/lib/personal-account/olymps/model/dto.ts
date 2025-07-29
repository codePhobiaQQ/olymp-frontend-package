import { QuestionAnswer, QuestionBackendType } from './types'
import { QuestionI, QuestionType } from '@shared/lib/quiz'

const questionTypeMapper = (questionType: QuestionBackendType): QuestionType => {
  if (questionType === 'Multiple Choice') {
    return 'multi_choose'
  }
  return 'short_answer'
}

export const questionsMapper = (questions: QuestionAnswer[]): QuestionI[] => {
  return questions?.map((question, index) => {
    return {
      question_id: question.id,
      id: index + 1,
      title: question.title,
      description: question.description,
      type: questionTypeMapper(question.type),
      userAnswer: question.user_answer,
      answers: question.answers,
    }
  })
}
