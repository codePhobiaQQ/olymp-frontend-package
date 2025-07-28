import { StoreProvider } from '@app/lib/store/components/StoreProvider'
import { store } from './config/store'
import type { AppDispatch } from './config/store'
import type { StateSchema, ThunkConfig } from './config/StateSchema'

export { StoreProvider, store, StateSchema, AppDispatch, ThunkConfig }
