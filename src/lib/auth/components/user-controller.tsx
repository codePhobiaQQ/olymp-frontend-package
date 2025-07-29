import { FC } from 'react'
import UserSvg from '/public/svg/header/user.svg?react'
import cn from 'classnames'
import { Dropdown } from '@shared/components/dropdown'
import { useSelector } from 'react-redux'
import { getIsUserLogin } from '../model/selectors/auth'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { authActions } from '@lib/auth'
import { loginUserActions } from '../consts/loginUserActions'
import { LoginOutlined } from '@ant-design/icons'

export type UserControllerProps = {
  className?: string
}

export const UserController: FC<UserControllerProps> = (props) => {
  const dispatch = useAppDispatch()
  const isLogin = useSelector(getIsUserLogin)
  const { className } = props

  if (isLogin) {
    return (
      <Dropdown
        menu={{ items: loginUserActions({ dispatch }) }}
        trigger={['click']}
        placement="bottomRight"
      >
        <div
          className={cn(
            className,
            'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white'
          )}
        >
          <UserSvg className="h-5 w-5 stroke-current" />
        </div>
      </Dropdown>
    )
  }

  const openPopupHandler = () => {
    dispatch(authActions.setPopupVisible(true))
  }

  return (
    <div
      onClick={openPopupHandler}
      className={cn(
        className,
        'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white'
      )}
    >
      <LoginOutlined className="text-xl" />
    </div>
  )
}
