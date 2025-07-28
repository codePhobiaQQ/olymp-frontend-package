import { ReactNode } from 'react'
import { ResetForm } from '@lib/auth/components/forms/reset-form/ResetForm.tsx'

export type ResetPasswordPayload = {
  content?: ReactNode
}

export const useResetPassword = (): ResetPasswordPayload => {
  const content = <ResetForm />

  return {
    content,
  }
}
