import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/store'
import { initAuthData, UserLoginProps } from '@lib/user'
import axios, { AxiosError } from 'axios'
import { UserSchema } from '@lib/user/model/types/user.ts'
import { USER_LOCALSTORAGE_KEY } from '@lib/user/model/consts/user.ts'
import { notification } from 'antd'
import { useErrorText } from '@shared/lib/hooks/useErrorText.ts'

export const login = createAsyncThunk<UserSchema, UserLoginProps, ThunkConfig<string>>(
  'auth/login',
  async (authData, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    try {
      const { token } = await axios
        .post<{ token: string }>('http://localhost:9090/wp-json/jwt-auth/v1/token', authData)
        .then((res) => {
          console.log(res)
          return res.data
        })
        .catch((e: AxiosError) => {
          console.log(e)
          const errorMessage = (e.response?.data as any)?.['message']
          throw new Error(errorMessage ?? 'Ошибка в данных')
        })

      // Wordpress Token
      localStorage.setItem(USER_LOCALSTORAGE_KEY, token)
      // TODO: FIX IT
      // @ts-ignore
      notification.success({ message: 'Авторизация успешно пройдена' })

      dispatch(initAuthData())
    } catch (e: any) {
      const message = useErrorText(e)
      return rejectWithValue(message)
    }
  }
)
