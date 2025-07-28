import { UserSchema } from '@lib/user/model/types/user.ts'

export interface AuthSchema {
  _inited: boolean
  authPopupOpen?: boolean
  authData?: UserSchema
}
