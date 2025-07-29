import { effect, signal } from '@preact/signals-react'
import { QuestionI } from './../types'
import { setUri } from '@shared/utils'
import { warning } from '@app/lib/notification'

export const QUESTION_URL_KEY = 'question'

export const inited = signal<boolean>(false)

export const quizDuration = signal<number | undefined>(240)
export const finishQuizTime = signal<number | undefined>()

export const questions = signal<QuestionI[]>([])
export const currentQuestion = signal<number | undefined>(undefined)

export const userAnswers = signal<
  Record<number, { questionId: string; value: string; needUpdate?: boolean }>
>({})
export const changeUserAnswer = (id: number, questionId: string, value: string) => {
  userAnswers.value = {
    ...userAnswers.value,
    [id]: {
      questionId,
      value,
      needUpdate: true,
    },
  }
}
export const updateUserAnswer = (id: number): number | undefined => {
  if (userAnswers.value[id].needUpdate === false) {
    warning({ text: 'Вы не изменили ответ на вопрос' })
    return -1
  }
  userAnswers.value = {
    ...userAnswers.value,
    [id]: {
      ...userAnswers.value[id],
      needUpdate: false,
    },
  }
  console.log(userAnswers.value)
}

effect(() => {
  const uri = new URLSearchParams(window.location.search)
  if (currentQuestion.value === undefined) {
    return
  }
  uri.set(QUESTION_URL_KEY, currentQuestion.value?.toString())
  setUri(uri)
})

export const isFullScreen = signal<boolean>(false)

export const isFinalPage = signal<boolean>(false)

// Functions
export const destroy = () => {
  inited.value = false
  quizDuration.value = undefined
  questions.value = []
  currentQuestion.value = undefined
  isFullScreen.value = false
  isFinalPage.value = false
  userAnswers.value = {}
}
