import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/lib/store'
import { InfoProps, QuestionI } from './../../model/types'
import {
  currentQuestion,
  finishQuizTime,
  inited,
  QUESTION_URL_KEY,
  questions,
} from './../../model/provider/provider'

type initType = {
  initQuestions: QuestionI[]
  info?: InfoProps
}

export const init = createAsyncThunk<void, initType, ThunkConfig<string>>(
  'quiz/init',
  async (props) => {
    const { initQuestions, info } = props

    // Questions
    questions.value = initQuestions

    // Finish Quiz Time
    finishQuizTime.value = info?.finish_time

    // Init question
    const currentSearchParams = new URLSearchParams(window.location.search)
    let questionNumber = currentSearchParams.get(QUESTION_URL_KEY)
    if (
      questionNumber &&
      Number(questionNumber) <= initQuestions.length &&
      Number(questionNumber) >= 1
    ) {
      currentQuestion.value = Number(questionNumber)
    } else {
      currentQuestion.value = 1
    }

    inited.value = true
  }
)
