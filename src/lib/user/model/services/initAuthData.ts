import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserSchema } from '../types/user'
import { USER_LOCALSTORAGE_KEY } from '../consts/user'
import { jwtDecode } from 'jwt-decode'
import { ThunkConfig } from '@app/lib/store'

export const initAuthData = createAsyncThunk<UserSchema, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi

    const userToken = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    if (!userToken) {
      return rejectWithValue('')
    }

    // TODO: validate token
    // @ts-ignore
    const userData = jwtDecode(userToken)?.['data']?.['user']
    userData.isApproval = userData.isApproval === 'true' ? true : false
    userData.username = userData.email

    if (!userData) {
      return rejectWithValue('')
    }

    try {
      return userData as UserSchema
    } catch (e) {
      console.log(e)
      return rejectWithValue('')
    }
  }
)
