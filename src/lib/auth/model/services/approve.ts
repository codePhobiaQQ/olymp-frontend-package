import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { UserApproveProps } from '@lib/user/model/types/user'
import { notification } from 'antd'
import { useErrorText } from '@shared/hooks/useErrorText'
import { initAuthData, USER_LOCALSTORAGE_KEY } from '@lib/user'
import { ThunkConfig } from '@app/lib/store'

export const approve = createAsyncThunk<void, UserApproveProps, ThunkConfig<string>>(
  'auth/approve',
  async (approveData, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi
    try {
      await extra.api_wordpress
        .post<{ token: string }>('/auth/approve-email', {
          email: approveData.email,
          acception_email_id: approveData.id,
        })
        .then((res) => {
          console.log('res', res)
          return res.data
        })
        .catch((e: AxiosError) => {
          const errorMessage = (e.response?.data as any)?.['message']
          throw new Error(errorMessage ?? 'Ошибка в данных')
        })

      notification.success({ message: 'Подтверждение email успешно выполнено' })
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)

      dispatch(initAuthData())
    } catch (e: any) {
      const message = useErrorText(e)
      return rejectWithValue(message)
    }
  }
)
