import { configureStore } from '@reduxjs/toolkit'
import { $api_wordpress } from '@shared/lib/api/api'
import { authReducer } from '@lib/auth'
import { wordpressApi } from '@shared/lib/api/rtkApi.ts'
import { StateSchema } from '@app/store'

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

export type AppDispatch = typeof store.dispatch
