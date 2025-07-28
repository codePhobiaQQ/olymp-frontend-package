import { FC, Suspense, useState } from 'react'
import cn from 'classnames'
import { Dialog, DialogProps } from '@shared/components/dialog'
import { useSelector } from 'react-redux'
import { getIsAuthPopupOpen } from '../model/selectors/auth'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { authActions } from '../model/slices/authSlice'
import { useLogin } from '../lib/hooks/useLogin.tsx'
import { Switcher } from '@shared/components/switcher'
import { authModalActions, AuthModalActionValues } from '../consts/authModal'
import { useResetPassword } from '../lib/hooks/useResetPassword'
import { useRegistration } from '../lib/hooks/useRegistration'
import { Skeleton } from 'antd'

export type AuthModalProps = {
  className?: string
}

export const AuthModal: FC<AuthModalProps> = (props) => {
  const { className } = props
  const dispatch = useAppDispatch()
  const open = useSelector(getIsAuthPopupOpen)

  const [authModalAction, setAuthModalAction] = useState<AuthModalActionValues>('login')
  const changeModalAction = (value: string | number) => {
    setAuthModalAction(value as AuthModalActionValues)
  }

  const closeHandler = () => {
    dispatch(authActions.setPopupVisible(false))
  }

  let content = null
  let dialogProps: DialogProps = {
    okButtonProps: { className: 'm-auto' },
    footer: [],
  }

  // ----- FORM CONTENT ------
  const { content: loginContent } = useLogin()
  const { content: registrationContent } = useRegistration()
  const { content: resetContent } = useResetPassword()

  if (authModalAction === 'login') {
    content = loginContent
  } else if (authModalAction === 'registration') {
    content = registrationContent
  } else if (authModalAction === 'reset_password') {
    content = resetContent
  }
  // --------------------------

  return (
    <Dialog {...dialogProps} onCancel={closeHandler} open={open} className={cn(className)} centered>
      <div className="align-center justifyCenter flex flex-col gap-3">
        <Switcher
          onChange={changeModalAction}
          value={authModalAction}
          className="m-auto"
          options={authModalActions}
        />
        <Suspense fallback={<Skeleton />}>{content}</Suspense>
      </div>
    </Dialog>
  )
}
