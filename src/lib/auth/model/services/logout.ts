import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@app/store'
import { UserLoginProps } from '@lib/user'

import { USER_LOCALSTORAGE_KEY } from '@lib/user/model/consts/user.ts'

export const logout = createAsyncThunk<void, void, ThunkConfig<string>>(
  'auth/logout',
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    } catch (e: any) {
      console.log(e)
      return rejectWithValue(e?.message)
    }
  }
)
