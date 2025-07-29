import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthSchema } from '../types/authSchema'
import { initAuthData } from '@lib/user'
import { logout } from './../services/logout.ts'
import { userReg } from './../services/registration/user-reg'
import { login } from './../services/login'

const initialState: AuthSchema = {
  _inited: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPopupVisible: (state, action: PayloadAction<boolean>) => {
      state.authPopupOpen = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTRATION USER
      .addCase(login.fulfilled, (state: AuthSchema) => {
        state.authPopupOpen = false
      })
      .addCase(userReg.fulfilled, (state: AuthSchema) => {
        state.authPopupOpen = false
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state: AuthSchema) => {
        state.authData = undefined
      })
      // INIT AUTH DATA
      .addCase(initAuthData.fulfilled, (state: AuthSchema, action) => {
        state._inited = true
        state.authData = action.payload
      })
      .addCase(initAuthData.rejected, (state: AuthSchema) => {
        state._inited = true
      })
  },
})

export const { actions: authActions } = authSlice
export const { reducer: authReducer } = authSlice
