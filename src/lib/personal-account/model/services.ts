import { wordpressApi } from '@shared/lib/api/rtkApi'
import { QualifyingStageRegistrationProps } from '@lib/personal-account/lib/qualifying-stage'

interface QualifyingResult {
  result_id: string
  quiz_id: string
  quiz_name: string
  point_score: string
  correct_score: string
  correct: string
  total: string
  date: string
}

type QualifyingResultsResponse = QualifyingResult[]

const personalAccountApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    regMetadata: builder.query<void, QualifyingStageRegistrationProps>({
      query: (regData) => ({
        url: `/user/set-metadata`,
        body: regData,
        method: 'GET',
      }),
    }),

    getQualifyingResults: builder.query<
      QualifyingResultsResponse,
      QualifyingStageRegistrationProps
    >({
      query: () => ({
        url: `/olymps/qualifying/results`,
        method: 'GET',
      }),
      transformResponse: (response: QualifyingResultsResponse) => {
        return response
      },
    }),

    getAvailableFinals: builder.query<QualifyingResultsResponse, QualifyingStageRegistrationProps>({
      query: () => ({
        url: `/olymps/available-final-stages`,
        method: 'GET',
      }),
      transformResponse: (response: QualifyingResultsResponse) => {
        return response
      },
    }),

    getOlympOrganizations: builder.query<[], { olymp_slug: string }>({
      query: ({ olymp_slug }: { olymp_slug: string }) => ({
        url: `/olymp-organizations/${olymp_slug}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response
      },
    }),

    regFinal: builder.mutation<void, { olymp_slug: string; organization_id: number }>({
      query: ({
        organization_id,
        olymp_slug,
      }: {
        olymp_slug: string
        organization_id: number
      }) => ({
        url: `/olymps/reg-final-stage/${olymp_slug}`,
        body: { organization_id },
        method: 'POST',
      }),
      transformResponse: (response) => {
        return response
      },
    }),
  }),
})

export const useRegMetadata = personalAccountApi.useRegMetadataQuery
export const useGetQualifyingResults = personalAccountApi.useGetQualifyingResultsQuery
export const useGetAvailableFinals = personalAccountApi.useGetAvailableFinalsQuery
export const useGetOlympOrganizations = personalAccountApi.useGetOlympOrganizationsQuery
export const useRegFinal = personalAccountApi.useRegFinalMutation
