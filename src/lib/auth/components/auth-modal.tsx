import { FC, Suspense, useState } from 'react'
import cn from 'classnames'
import Logo from '/public/images/logo/logo-animal.svg?react'
import usor3 from '/public/images/decore/usor3.png'
import { Dialog, DialogProps } from '@shared/components/dialog'
import { useSelector } from 'react-redux'
import { getIsAuthPopupOpen } from '../model/selectors/auth'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { authActions } from '../model/slices/authSlice'
import { useLogin } from '../lib/hooks/useLogin'
import { AuthModalActionValues } from '../consts/authModal'
import { useResetPassword } from '../lib/hooks/useResetPassword'
import { useRegistration } from '../lib/hooks/useRegistration'
import { Skeleton } from 'antd'
// import { useWindowWidth } from '@react-hook/window-size'

export type AuthModalProps = {
  className?: string
}

export const AuthModal: FC<AuthModalProps> = (props) => {
  const { className } = props
  const dispatch = useAppDispatch()
  const open = useSelector(getIsAuthPopupOpen)
  // const width = useWindowWidth()

  const [authModalAction /*, setAuthModalAction*/] = useState<AuthModalActionValues>('login')
  // const changeModalAction = (value: string | number) => {
  //   setAuthModalAction(value as AuthModalActionValues)
  // }

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
    <Dialog
      {...dialogProps}
      onCancel={closeHandler}
      open={open}
      // open={true}
      className={cn(className)}
      style={{
        backgroundImage: `url(${usor3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      centered
    >
      <div className="items-center justify-center w-full flex flex-col gap-6">
        <Logo className="h-40 w-40" />

        {/*<Segmented*/}
        {/*  vertical={width < 768}*/}
        {/*  onChange={changeModalAction}*/}
        {/*  value={authModalAction}*/}
        {/*  rootClassName="m-auto flex-wrap"*/}
        {/*  options={authModalActions}*/}
        {/*/>*/}

        <Suspense fallback={<Skeleton />}>{content}</Suspense>
      </div>
    </Dialog>
  )
}
