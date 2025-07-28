import { wordpressApi } from '@shared/lib/api/rtkApi.ts'
import { OlympDataExtended, OlympData } from './types.ts'

export type GetOlympDetailsPayload = OlympDataExtended & {
  qualifyingActive: boolean
  finishingActive: boolean
}

const olympsApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    getOlymps: builder.query<OlympData[], void>({
      query: () => ({
        url: `/olymps`,
        method: 'GET',
      }),
    }),

    getOlympDetails: builder.query<GetOlympDetailsPayload, string>({
      query: (slug) => ({
        url: `/olymps/${slug}`,
        method: 'GET',
      }),
      transformResponse: (response: OlympDataExtended): GetOlympDetailsPayload => {
        const now = new Date()

        const qualifyingStart = response.start_qualifying_date
          ? new Date(response.start_qualifying_date)
          : null
        const qualifyingEnd = response.end_qualifying_date
          ? new Date(response.end_qualifying_date)
          : null
        const finishingStart = response.start_finishing_date
          ? new Date(response.start_finishing_date)
          : null
        const finishingEnd = response.end_finishing_date
          ? new Date(response.end_finishing_date)
          : null

        const qualifyingActive =
          qualifyingStart && qualifyingEnd ? now >= qualifyingStart && now <= qualifyingEnd : false

        const finishingActive =
          finishingStart && finishingEnd ? now >= finishingStart && now <= finishingEnd : false

        return { ...response, qualifyingActive, finishingActive }
      },
    }),
  }),
})

export const useGetOlymps = olympsApi.useGetOlympsQuery
export const useGetOlympDetails = olympsApi.useGetOlympDetailsQuery
