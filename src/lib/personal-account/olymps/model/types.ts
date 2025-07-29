export type QuestionBackendType = 'Multiple Choice'

export type QuestionAnswer = {
  id: string
  type: QuestionBackendType
  title: string
  description: string
  images: { path: string; description: string }[]
  answers: string[]
  user_answer: string
}
