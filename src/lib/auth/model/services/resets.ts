import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/store'
import { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { UserResetProps, UserSchema } from '@lib/user/model/types/user.ts'

import { USER_LOCALSTORAGE_KEY } from '@lib/user/model/consts/user.ts'

export const reset = createAsyncThunk<UserSchema, UserResetProps, ThunkConfig<string>>(
  'auth/reset',
  async (resetData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
      const { token } = await extra.api_wordpress
        .post<{ token: string }>('/auth/reset-password', resetData)
        .then((res) => {
          console.log('res', res)
          return res.data
        })
        .catch((e: AxiosError) => {
          const errorMessage = (e.response?.data as any)?.['message']
          throw new Error(errorMessage ?? 'Ошибка в данных')
        })

      localStorage.setItem(USER_LOCALSTORAGE_KEY, token)
      const userData: UserSchema = jwtDecode(token)

      return userData
    } catch (e: any) {
      console.log(e)
      return rejectWithValue(e?.message)
    }
  }
)
