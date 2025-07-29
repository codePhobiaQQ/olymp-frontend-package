import { StateSchema } from '@app/lib/store'

export const getAuthInited = (state: StateSchema) => state.auth._inited
export const getIsUserLogin = (state: StateSchema) =>
  !state.auth._inited ? undefined : !!state.auth.authData
export const getIsAuthPopupOpen = (state: StateSchema) => state.auth.authPopupOpen ?? false
export const getAuthData = (state: StateSchema) => state.auth.authData
