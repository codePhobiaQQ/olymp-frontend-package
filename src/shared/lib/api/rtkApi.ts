import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { __API__WORDPRESS__ } from '@shared/vars/vars'
import { USER_LOCALSTORAGE_KEY } from '@lib/user/model/consts/user'
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'

export let wordpressApi = createApi({
  reducerPath: 'wordpressApi',
  tagTypes: ['wordpress'],
  baseQuery: fetchBaseQuery({
    baseUrl: __API__WORDPRESS__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_LOCALSTORAGE_KEY)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  } as FetchBaseQueryArgs),
  endpoints: () => ({}),
})
