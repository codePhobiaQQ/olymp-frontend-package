import { createAsyncThunk } from '@reduxjs/toolkit'

import { USER_LOCALSTORAGE_KEY } from '@lib/user/model/consts/user.ts'
import { ThunkConfig } from '@app/lib/store'

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
