export type UserSchema = {
  username: string
  role?: string
  isApproval?: boolean
}

export type UserLoginProps = {
  username: string
  password: string
}

export type UserRegistrationProps = {
  username: string
  password: string
  passwordRepeat: string
}

export type UserApproveProps = {
  email: string
  id: string
}

export type UserResetProps = {
  username: string
}
