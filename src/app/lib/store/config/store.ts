import { configureStore } from '@reduxjs/toolkit'
import { $api_wordpress } from '@shared/api/api'
import { authReducer } from '@lib/auth'
import { wordpressApi } from '@shared/api/rtkApi'
import { StateSchema } from './StateSchema'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'

export const store = configureStore<StateSchema>({
  reducer: {
    auth: authReducer,
    [wordpressApi.reducerPath]: wordpressApi.reducer,
  },

  devTools: true,
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: {
          api_wordpress: $api_wordpress,
        },
      },
    }).concat([wordpressApi.middleware]),
})

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>
export type AppDispatch = TypedDispatch<StateSchema>