import { ReactNode } from 'react'
import { LoginForm } from '@lib/auth'

export type loginPayload = {
  content?: ReactNode
}

export const useLogin = (): loginPayload => {
  const content = <LoginForm />

  return {
    content,
  }
}
