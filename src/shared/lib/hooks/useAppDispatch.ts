import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction } from 'redux'
import { StateSchema } from '@app/store'

export type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>
export type UseAppDispatch = TypedDispatch<StateSchema>
export const useAppDispatch = () => useDispatch<UseAppDispatch>()
