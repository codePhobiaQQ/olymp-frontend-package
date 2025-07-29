import { wordpressApi } from '@shared/api/rtkApi'
import { BackendMetadata, Metadata } from './../model/types'
import dayjs from 'dayjs'
import { BIRTH_DATE_LS_KEY, dateFormat } from './../model/const'
import { error, success } from '@app/lib/notification'
import { detectErrorMessage } from '@shared/utils/error'
import { getGradeFromGraduationYear } from '@shared/utils/time.ts'

const profileApi = wordpressApi.injectEndpoints({
  endpoints: (builder) => ({
    setMetadata: builder.mutation<{ message: string }, BackendMetadata>({
      query: (regData) => {
        console.log('regData', regData)
        return {
          url: `/user/set-metadata`,
          body: regData,
          method: 'POST',
        }
      },
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          console.log('here')
          localStorage.setItem(BIRTH_DATE_LS_KEY, arg?.['birth_date'])
          await queryFulfilled
        } catch (error) {
          console.error('Error setting metadata:', error)
        }
      },
    }),

    getMetadata: builder.query<Metadata, void>({
      query: () => ({
        url: `/user/metadata`,
        method: 'GET',
      }),
      transformResponse: (response: { data: BackendMetadata }): Metadata => {
        const birth_date = localStorage.getItem(BIRTH_DATE_LS_KEY)

        return {
          ...response.data,
          birth_date: birth_date ? dayjs(birth_date, dateFormat) : undefined,
          grade: String(getGradeFromGraduationYear(Number(response?.data.grade)))
        }
      },
    }),

    changePassword: builder.mutation<
      { message?: string },
      { prev_password: string; new_password: string }
    >({
      query: ({ prev_password, new_password }) => ({
        url: `/user/change-password`,
        method: 'POST',
        body: {
          prev_password,
          new_password,
        },
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled
          success({ text: 'Пароль был успешно сменен' })
        } catch (res) {
          error({
            text: detectErrorMessage(
              (res as { error?: { data?: { message?: string } } })?.error?.data,
              'Ошибка'
            ),
          })
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const useSetMetadata = profileApi.useSetMetadataMutation
export const useGetMetadata = profileApi.useGetMetadataQuery
export const useChangePassword = profileApi.useChangePasswordMutation
