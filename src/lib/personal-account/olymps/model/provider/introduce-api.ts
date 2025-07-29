import { wordpressApi } from '@shared/api/rtkApi'

const introduceApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    getIntroduceOlympsList: builder.query<
      {
        name: string
        slug: string
      }[],
      void
    >({
      query: () => ({
        url: `olymps/introductory/list`,
        method: 'GET',
      }),
    }),

    getIntroduceResults: builder.query<
      any,
      void
    >({
      query: () => ({
        url: `olymps/introductory/results`,
        method: 'GET',
      }),
    }),

    getIntroduceOlympVariants: builder.query<
      Record<string, { variant: string; passed: boolean }[]>,
      {
        slug: string
        grade: number
      }
    >({
      query: ({ slug, grade }) => ({
        url: `olymps/introductory/get-variants?slug=${slug}&grade=${grade}`,
        method: 'GET',
      }),
    }),

    startIntroduceQuiz: builder.mutation<
      void,
      {
        slug: string
        variant: string
        grade: number
      }
    >({
      query: (body) => ({
        url: `olymps/introductory/start`,
        body: {
          ...body,
          processPD: true,
          agreeRules: true
        },
        method: 'POST',
      }),
    }),
  }),
  overrideExisting: false,
})

export const useGetIntroduceOlympVariants = introduceApi.useGetIntroduceOlympVariantsQuery
export const useGetIntroduceResults = introduceApi.useGetIntroduceResultsQuery
export const useGetIntroduceOlympsList = introduceApi.useGetIntroduceOlympsListQuery
export const useStartIntroduceQuiz = introduceApi.useStartIntroduceQuizMutation