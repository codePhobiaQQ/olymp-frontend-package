import { signal } from '@preact/signals-react'
import { FormInstance } from 'antd'
import { MessengerStatus } from './types'

export const issueId = signal<number | undefined>()
export const messengerStatus = signal<MessengerStatus>()
export const showMessageLine = signal<boolean>(true)
export const showedPinFile = signal<boolean>(false)

export const actionSignal = signal<((props: { value: string; file?: File }) => void) | undefined>()
export const formSignal = signal<FormInstance<{ message: string }> | undefined>()
