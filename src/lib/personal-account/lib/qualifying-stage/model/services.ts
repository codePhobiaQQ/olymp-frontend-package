import { wordpressApi } from '@shared/lib/api/rtkApi'
import { QualifyingStageRegistrationProps } from './types'

const qualifyingStageApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    getQualifyingStage: builder.query<string, string>({
      query: (olympSlug) => ({
        url: `/olymps/qualifying/${olympSlug}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response.data.map(el => ({
          // general: el,
          settings: el?.['question_settings'],
          answers: el?.['answer_array']
        }))
      }
    }),
    regMetadata: builder.query<void, QualifyingStageRegistrationProps>({
      query: (regData) => ({
        url: `/user/set-metadata`,
        body: regData,
        method: 'POST',
      }),
    }),
  }),
})

export const useGetQualifyingStage = qualifyingStageApi.useGetQualifyingStageQuery
export const useRegMetadata = qualifyingStageApi.useRegMetadataQuery
