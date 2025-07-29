import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { notification } from 'antd'
import { useErrorText } from '@shared/hooks/useErrorText'
import { getAuthData } from '@lib/auth'
import { ThunkConfig } from '@app/lib/store'

export const sendApprovalEmail = createAsyncThunk<void, void, ThunkConfig<string>>(
  'auth/sendApprovalEmail',
  async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi
    const authData = getAuthData(getState())

    try {
      if (!authData?.username) {
        throw new Error('Чтобы подтвердить e-mail - пожалуйста зайдите в свой аккаунт')
      }

      console.log('authData', authData)

      await extra.api_wordpress
        .post<{ message: string }>('/auth/send-approval-email', { email: authData?.username })
        .then((res) => {
          console.log('res', res)
          return res.data
        })
        .catch((e: AxiosError) => {
          const errorMessage = (e.response?.data as any)?.['message']
          throw new Error(errorMessage ?? 'Ошибка в данных')
        })

      notification.success({ message: 'Письмо было успешно отправлено Вам на почту' })
    } catch (e: any) {
      const message = useErrorText(e)
      return rejectWithValue(message)
    }
  }
)
