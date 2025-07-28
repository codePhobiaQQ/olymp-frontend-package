import { AxiosInstance } from 'axios'
import { AuthSchema } from '@lib/auth'
import { wordpressApi } from '@shared/lib/api/rtkApi.ts'

export interface StateSchema {
  auth: AuthSchema
  [wordpressApi.reducerPath]: ReturnType<typeof wordpressApi.reducer>
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ThunkExtraArg {
  api: AxiosInstance
  api_wordpress: AxiosInstance
  // navigate?: (to: any, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
