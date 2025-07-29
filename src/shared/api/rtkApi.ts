import { createApi, fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query'
import { __API__WORDPRESS__ } from '@shared/consts/api'
import { USER_LOCALSTORAGE_KEY } from '@lib/user/model/consts/user'
import { warning } from '@app/lib/notification'
import { logout } from '@lib/auth'

const baseQuery = fetchBaseQuery({
  baseUrl: __API__WORDPRESS__,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// TODO: Fix types
// @ts-ignore
const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      console.error('API Error:', result.error);

      if (result.error.status === 401) {
        try {
          api.dispatch(logout())
          warning({ text: 'Ваша сессия была прервана. Пожалуйста, авторизуйтесь снова.' })
        } catch (error) {
          console.error('Error clearing auth token:', error);
        }
      }

      // Возвращаем ошибку в формате, ожидаемом RTK Query
      return { error: result.error };
    }

    return { data: result.data };

  } catch (error) {
    console.error('Unexpected error:', error);

    return {
      error: {
        status: 'CUSTOM_ERROR',
        data: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    };
  }
};

export let wordpressApi = createApi({
  reducerPath: 'wordpressApi',
  tagTypes: ['wordpress'],
  // @ts-ignore
  baseQuery: customBaseQuery,
  // baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({}),
})
