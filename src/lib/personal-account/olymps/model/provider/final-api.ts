import { wordpressApi } from '@shared/api/rtkApi'
import { Application, FinalStageItem, VenuesType } from './../../../shared/model/types'

export const finalApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----- LIST ------
    getFinalStages: builder.query<FinalStageItem[], void>({
      query: () => ({
        url: `olymps/final/list`,
        method: 'GET',
      }),
      transformResponse: (response: FinalStageItem[]) => {
        console.log('response', response)
        return response
      },
    }),

    // ----- VENUES ------
    getFinalStageVenues: builder.query<VenuesType, { slug: string }>({
      query: ({ slug }) => ({
        url: `olymps/final/venues?slug=${slug}`,
        method: 'GET',
      }),
      transformResponse: (response: VenuesType) => {
        console.log('getFinalStageVenues', response)
        return response
      },
    }),

    // ----- CREATE APPLICATION ------
    createFinalStageApplication: builder.mutation<void, { slug: string; place_id: number }>({
      query: ({ slug, place_id }) => ({
        url: `olymps/final/application`,
        method: 'POST',
        body: {
          slug,
          place_id,
        },
      }),
    }),

    // ----- DELETE APPLICATION ------
    deleteApplication: builder.mutation<void, { slug: string; }>({
      query: ({ slug }) => ({
        url: `olymps/final/application`,
        method: 'DELETE',
        body: {
          slug,
        },
      }),
    }),

    // ------- GET APPLICATION ------
    getFinalStageApplication: builder.query<Application, { slug: string; year: string }>({
      query: ({ slug, year }) => ({
        url: `olymps/final/application?slug=${slug}&year=${year}`,
        method: 'GET',
      }),
      transformResponse: (response: Application[]) => {
        console.log('getFinalStageApplication', response)
        return response[0]
      },
    }),

    // ------- APPLICATION ACTIONS --------
    setPrintDocumentsRequest: builder.mutation<void, { slug: string; value: boolean }>({
      query: ({ slug, value }) => ({
        url: `olymps/final/application/set-print-documents-request`,
        method: 'POST',
        body: {
          slug,
          value
        },
      }),
    }),

  }),
  overrideExisting: false,
})

export const useGetFinalStages = finalApi.useGetFinalStagesQuery
export const useGetFinalStageVenues = finalApi.useGetFinalStageVenuesQuery
export const useCreateFinalStageApplication = finalApi.useCreateFinalStageApplicationMutation
export const useDeleteApplication = finalApi.useDeleteApplicationMutation
export const useGetFinalStageApplication = finalApi.useGetFinalStageApplicationQuery
export const useSetPrintDocumentsRequest = finalApi.useSetPrintDocumentsRequestMutation
