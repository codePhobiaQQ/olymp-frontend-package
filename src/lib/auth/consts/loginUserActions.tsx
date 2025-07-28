import type { MenuProps } from 'antd'
import { logout } from './../model/services/logout.ts'
import { Link } from 'react-router-dom'
import { UseAppDispatch } from '@shared/lib/hooks/useAppDispatch'

export const loginUserActions = ({
  dispatch,
}: {
  dispatch: UseAppDispatch
}): MenuProps['items'] => {
  return [
    {
      label: <Link to="/personal-account">В личный кабинет</Link>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: 'Выйти',
      onClick: () => {
        dispatch(logout())
      },
      key: '1',
    },
  ]
}
