import { FC, ReactNode } from 'react'
import { AuthModal } from '@lib/auth/components/auth-modal.tsx'

export type AuthProviderProps = {
  children?: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props
  return (
    <>
      {children}
      <AuthModal />
    </>
  )
}
