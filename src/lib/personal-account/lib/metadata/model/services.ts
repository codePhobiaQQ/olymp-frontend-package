import { wordpressApi } from '@shared/lib/api/rtkApi'
import { QualifyingStageRegistrationProps } from '@lib/personal-account/lib/qualifying-stage'

const userMetadataApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    regMetadata: builder.query<void, Partial<QualifyingStageRegistrationProps>>({
      query: (regData) => ({
        url: `/user/set-metadata`,
        body: regData,
        method: 'POST',
      }),
    }),
  }),
})

export const useRegMetadata = userMetadataApi.useRegMetadataQuery
