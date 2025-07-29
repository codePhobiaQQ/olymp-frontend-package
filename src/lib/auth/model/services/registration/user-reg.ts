import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserRegistrationProps, UserSchema } from '@lib/user/model/types/user'
import { notification } from 'antd'
import { useErrorText } from '@shared/hooks/useErrorText'
import { initAuthData, USER_LOCALSTORAGE_KEY } from '@lib/user'
import { ThunkConfig } from '@app/lib/store'

export const userReg = createAsyncThunk<UserSchema, UserRegistrationProps, ThunkConfig<string>>(
  'auth/user-reg',
  async (regData, thunkApi) => {
    const { rejectWithValue, extra, dispatch } = thunkApi

    try {
      if (regData.password !== regData.passwordRepeat) {
        notification.warning({ message: 'Введенные пароли не совпадают' })
        throw new Error('Введенные пароли не совпадают')
      }

      const { token } = await extra.api_wordpress
        .post<{ token: string }>('/auth/registration', { ...regData, role: 'um_custom_role_1' })
        .then((res: any) => {
          return res.data
        })

      localStorage.setItem(USER_LOCALSTORAGE_KEY, token)
      notification.success({ message: 'Ваш аккаунт был успешно зарегистрирован' })

      const userData = await dispatch(initAuthData()).then((res) => {
        if (typeof res.payload === 'string' || !res.payload) {
          return rejectWithValue('Ошибка во время получения данных пользователя')
        }
        return res.payload
      })

      return userData
    } catch (e: any) {
      const message = useErrorText(e)
      return rejectWithValue(message)
    }
  }
)
