import { createAsyncThunk } from '@reduxjs/toolkit'
import { initAuthData, UserLoginProps } from '@lib/user'
import axios from 'axios'
import { UserSchema } from '@lib/user/model/types/user'
import { USER_LOCALSTORAGE_KEY } from '@lib/user/model/consts/user'
import { notification } from 'antd'
import { useErrorText } from '@shared/hooks/useErrorText'
import { ThunkConfig } from '@app/lib/store'

export const login = createAsyncThunk<UserSchema, UserLoginProps, ThunkConfig<string>>(
  'auth/login',
  async (authData, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    try {
      const { token } = await axios
        .post<{ token: string }>(`${import.meta.env.VITE_BACKEND_URL}/wp-json/jwt-auth/v1/token`, authData)
        .then((res) => {
          console.log(res)
          return res.data
        })

      // Wordpress Token
      localStorage.setItem(USER_LOCALSTORAGE_KEY, token)
      // TODO: FIX IT
      // @ts-ignore
      notification.success({ message: 'Авторизация успешно пройдена' })

      const userData = await dispatch(initAuthData()).then((res) => {
        if (typeof res.payload === 'string' || !res.payload) {
          return rejectWithValue('Ошибка во время получения данных пользователя')
        }
        return res.payload
      })

      return userData
    } catch (e: any) {
      console.log('e', e)
      const message = useErrorText(e)
      return rejectWithValue(message)
    }
  }
)
