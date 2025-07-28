import { StateSchema } from '@app/store'

export const getIsUserLogin = (state: StateSchema) => !!state.auth.authData
export const getAuthInited = (state: StateSchema) => state.auth._inited
export const getIsAuthPopupOpen = (state: StateSchema) => state.auth.authPopupOpen ?? false
export const getAuthData = (state: StateSchema) => state.auth.authData
