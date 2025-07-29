import { wordpressApi } from '@shared/api/rtkApi'
import { QualifyingStageItem } from '../../../shared/model/types'
import { QuestionAnswer } from './../../model/types'
import { QuestionI, QuestionType } from '@shared/lib/quiz'
import { questionsMapper } from './../../model/dto'
import { error, success } from '@app/lib/notification'
import { detectErrorMessage } from '@shared/utils/error'

import { getQualifyingResultsRoute } from '@app/lib/route'
import {
  QualifyingResultDetails,
  QualifyingResultDetailsBackend,
} from '@shared/lib/quiz/model/types'
import { SelectProps } from 'antd'
import { DataType } from './../../components/results/shared/results-table'

export type RegQualifyingProps = {
  slug: string
  grade: number
  processPD: boolean
  agreeRules: boolean
}

const qualifyingApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----- INFO -----
    getOlympQualifyingData: builder.query<
      {
        quiz_name: string
        description: string
        questions_count: number
        duration: number
        class: string
        quiz_start: string
        quiz_end: string
        is_available: boolean
      },
      { subject: string }
    >({
      query: ({ subject }) => ({
        url: `olymps/qualifying-stage/about-quiz?subject=${subject}`,
        method: 'GET',
      }),
    }),

    getIsRegistered: builder.query<boolean, string>({
      query: (slug) => ({
        url: `olymps/qualifying-stage/check-registration?olymp_slug=${slug}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: boolean }): boolean => {
        return response.data
      },
    }),

    // ----- LIST -----
    getQualifyingStages: builder.query<QualifyingStageItem[], void>({
      query: () => ({
        url: `olymps/qualifying-stage/list`,
        method: 'GET',
      }),
      transformResponse: (response: QualifyingStageItem[]) => {
        console.log('response', response)
        return response
      },
    }),

    // ----- START QUIZ -----
    registerQualifying: builder.mutation<string, RegQualifyingProps>({
      query: (body) => ({
        url: `olymps/qualifying-stage/register`,
        body,
        method: 'POST',
      }),
    }),

    // ----- MAKING QUIZ -----
    getQuizData: builder.query<
      { finish_time: number; quiz_title: string; questions: QuestionI[] },
      { subject: string }
    >({
      query: ({ subject }) => ({
        url: `olymps/qualifying-stage/quiz/answers-data?subject=${subject}`,
        method: 'GET',
      }),
      transformResponse: (response: {
        finish_time: string
        quiz_title: string
        questions_and_answers: QuestionAnswer[]
      }) => {
        return {
          quiz_title: response.quiz_title,
          finish_time: Number(response.finish_time),
          questions: questionsMapper(response.questions_and_answers),
        }
      },
    }),

    getOlympAvailableClasses: builder.query<SelectProps['options'], string>({
      query: (slug) => ({
        url: `olymps/qualifying-stage/available-classes?slug=${slug}`,
        method: 'GET',
      }),
      transformResponse: (response: string[]) => {
        return response?.map((grade) => ({
          label: grade + 'класс',
          value: grade,
        }))
      },
    }),

    answerQuiz: builder.mutation<void, { subject: string; question_id: string; answer: string }>({
      query: ({ subject, question_id, answer }) => ({
        url: `olymps/qualifying-stage/quiz/answer-update`,
        method: 'POST',
        body: {
          subject,
          question_id,
          answer,
        },
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled
          success({ text: `Ответ на задание успешно сохранен` })
        } catch (res) {
          console.log('res', res)

          error({
            text: detectErrorMessage(
              (res as { error?: { data?: { message?: string } } })?.error?.data,
              'Ошибка'
            ),
          })
        }
      },
    }),

    getQualResults: builder.query<DataType[], void>({
      query: () => ({
        url: `olymps/qualifying-stage/results`,
        method: 'GET',
      }),
      transformResponse: (
        data: {
          passed_academic_year: string
          quiz_name: string
          slug: string
          title: string
          is_passed: boolean
        }[]
      ) => {
        return data?.map((result) => {
          return {
            name: result?.['title'],
            result: result?.['is_passed'] ? 'Пройден' : 'Не пройден',
            path:
              getQualifyingResultsRoute() +
              '/' +
              result?.['slug'] +
              '?year=' +
              result?.['passed_academic_year'],
            date: result?.['passed_academic_year'],
            key: result?.['title'] + result?.['passed_academic_year'],
          }
        })
      },
    }),

    getQualResultsDetails: builder.query<QualifyingResultDetails, { slug: string; year: string }>({
      query: ({ slug, year }) => ({
        url: `olymps/qualifying-stage/results/details?olymp_slug=${slug}&date=${year}`,
        method: 'GET',
      }),
      transformResponse: (response: QualifyingResultDetailsBackend) => {
        console.log(response)

        return {
          ...response,
          quiz_data: {
            ...response.quiz_data,
            questions_and_answers: response.quiz_data.questions_and_answers.map((el) => {
              let type: QuestionType
              if (el.type === 'Multiple Choice') {
                type = 'multi_choose'
              } else if (el.type === 'Short Answer') {
                type = 'short_answer'
              } else {
                type = 'single_choose'
              }
              return {
                ...el,
                type,
              }
            }),
          },
        }
      },
    }),

    // ----- FINISH QUIZ -----
    finishQuiz: builder.mutation<string, string>({
      query: (slug) => ({
        url: `olymps/qualifying-stage/finish`,
        body: {
          slug,
        },
        method: 'POST',
      }),
    }),
  }),

  overrideExisting: false,
})

export const useGetOlympQualifyingData = qualifyingApi.useGetOlympQualifyingDataQuery
export const useGetIsRegistered = qualifyingApi.useGetIsRegisteredQuery
export const useRegisterQualifying = qualifyingApi.useRegisterQualifyingMutation
export const useGetQualifyingStages = qualifyingApi.useGetQualifyingStagesQuery
export const useGetOlympAvailableClasses = qualifyingApi.useGetOlympAvailableClassesQuery

export const useGetQualResults = qualifyingApi.useGetQualResultsQuery
export const useGetQualResultsDetails = qualifyingApi.useGetQualResultsDetailsQuery

export const useGetQuizData = qualifyingApi.useGetQuizDataQuery
export const useAnswerQuiz = qualifyingApi.useAnswerQuizMutation
export const useFinishQuiz = qualifyingApi.useFinishQuizMutation
