import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAuthData } from '@lib/auth'
import { useNavigate } from 'react-router-dom'
import { getAuthInited } from '@lib/auth/model/selectors/auth'

interface AuthOnlyProps {
  children?: ReactNode
}

export const AuthOnly = (props: AuthOnlyProps) => {
  const { children } = props
  let navigate = useNavigate()
  const userData = !!useSelector(getAuthData)
  const authInited = useSelector(getAuthInited)

  useEffect(() => {
    if (userData || !authInited) return
    navigate('/')
  }, [userData, authInited])

  if (!userData) {
    return null
  }

  return children
}
