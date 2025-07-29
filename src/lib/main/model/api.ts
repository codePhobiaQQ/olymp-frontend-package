import { wordpressApi } from '@shared/api/rtkApi'
import { MainPageData } from './types'

const mainpageApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    getMainPageData: builder.query<MainPageData, void>({
      query: () => ({
        url: `info/mainpage`,
        method: 'GET',
      }),
      transformResponse: (response: MainPageData): MainPageData => {
        console.log(response)
        return response
      },
    }),

    subscribeNews: builder.mutation<void, { email: string; category: string }>({
      query: ({ email, category }) => ({
        url: ``,
        method: 'POST',
        body: {
          email,
          category
        },
      }),
    }),
  }),
  overrideExisting: false,
})

export const useGetMainPageData = mainpageApi.useGetMainPageDataQuery
export const useSubscribeNews = mainpageApi.useSubscribeNewsMutation
