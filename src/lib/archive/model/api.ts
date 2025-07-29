import { wordpressApi } from '@shared/api'
import { SubjectRubric, SubjectRubricBackend, TaskBackendI } from './types'
import { TaskProps } from './../components/tasks/Task'
import { error, warning } from '@app/lib/notification'
import { messagesSignal } from '@app/model/state'
import { Dispatch, SetStateAction } from 'react'

const archiveApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    getArchiveTasksList: builder.query<
      { count: number; data: TaskProps[] },
      {
        subject: string
        grades?: string[]
        categories?: string[]
        years?: string[]
        page?: number
        limit?: number
      }
    >({
      query: ({ subject, years, grades, categories, page, limit }) => {
        let url = `archive/tasks/list?subject=${subject}`

        if (grades && grades?.length > 0) {
          url += `&class=${grades?.join(',')}`
        }

        if (categories && categories?.length > 0) {
          url += `&category=${categories?.join(',')}`
        }

        if (years && years?.length > 0) {
          url += `&year=${years.map((el) => `[${el}-${Number(el) + 1}]`).join(',')}`
        }

        if (page) {
          url += `&_page=${page}`
        }

        if (limit) {
          url += `&_limit=${limit}`
        }

        return {
          url,
          method: 'GET',
        }
      },

      transformResponse: (response: TaskBackendI) => {
        console.log('response', response)

        if (!response) {
          warning({ text: 'Fail while getting data' })
          return {
            count: 0,
            data: [],
          }
        }

        return {
          count: response?.count ?? 0,
          data:
            response?.data?.map((task) => ({
              id: task.id.toString(),
              title: task.task_name,
              rate: Number(task.rating),
              isFavourite: task.isFavourite,
              state: task.task_condition_text_condition,
              answer: task.answer_text_answer,
              clue: task.hint?.filter(Boolean).join(''),
              solution: task.solution,
              active: true,
            })) ?? [],
        }
      },
      keepUnusedDataFor: 0,
    }),

    getArchiveTask: builder.query<TaskProps, { id: string | number }>({
      query: ({ id }) => ({
        url: `archive/tasks/${id}`,
        method: 'GET',
      }),

      transformResponse: (task: TaskBackendI['data'][number]) => {
        return {
          id: task.id.toString(),
          title: task.task_name,
          rate: Number(task.rating),
          isFavorite: false,
          state: task.task_condition_text_condition,
          answer: task.answer_text_answer,
          clue: task?.hint?.filter(Boolean).join(''),
          solution: task.solution,
          active: true,
        }
      },
    }),

    getArchiveSubjects: builder.query<{ label: string; slug: string }[], void>({
      query: () => ({
        url: 'archive/subjects',
        method: 'GET',
      }),
    }),

    addArchiveTaskToggleFavorite: builder.mutation<
      void,
      { id: string | number; setIsFavorite: Dispatch<SetStateAction<boolean>> }
    >({
      query: ({ id }) => ({
        url: `/archive/tasks/toggle_favor`,
        method: 'POST',
        body: {
          id,
        },
      }),
      // @ts-ignore
      onQueryStarted: async (
        { setIsFavorite },
        {
          queryFulfilled,
        }: { queryFulfilled: Promise<{ data: { favourite: boolean; message: string } }> }
      ) => {
        try {
          const res = await queryFulfilled

          console.log(res, res.data, res.data.favourite, res.data.message)

          setIsFavorite(res.data.favourite)

          messagesSignal.value?.success({
            content: res.data.message,
          })
        } catch (e) {
          error({ text: 'Ошибка во время добавления задачи в "Избранное"' })
        }
      },
    }),

    rateArchiveTask: builder.mutation<
      void,
      { id: string | number; mark: number; setRate: Dispatch<SetStateAction<number | undefined>> }
    >({
      query: ({ id, mark }) => ({
        url: `/archive/rating`,
        method: 'POST',
        body: {
          id,
          mark,
        },
      }),
      // @ts-ignore
      onQueryStarted: async (
        { setRate, mark },
        {
          queryFulfilled,
        }: { queryFulfilled: Promise<{ data: { message: string } }> }
      ) => {
        try {
          const res = await queryFulfilled

          setRate(mark)

          messagesSignal.value?.success({
            content: res.data.message,
          })
        } catch (e) {
          error({ text: 'Ошибка во время выставления рейтинга' })
        }
      },
    }),

    getSubjectRubrics: builder.query<SubjectRubric[], { slug: string }>({
      query: ({ slug }) => ({
        url: `archive/subject_categories?slug=${slug}`,
        method: 'GET',
      }),

      transformResponse: (res: SubjectRubricBackend[]) => {
        return res.map(el => ({
          label: el.label,
          value: el.slug
        }))
      }
    }),
  }),
})

export const useAddArchiveTaskToggleFavorite = archiveApi.useAddArchiveTaskToggleFavoriteMutation
export const useRateArchiveTask = archiveApi.useRateArchiveTaskMutation
export const useGetArchiveTasksList = archiveApi.useGetArchiveTasksListQuery
export const useGetArchiveTask = archiveApi.useGetArchiveTaskQuery
export const useGetArchiveSubjects = archiveApi.useGetArchiveSubjectsQuery
export const useGetSubjectRubrics = archiveApi.useGetSubjectRubricsQuery
