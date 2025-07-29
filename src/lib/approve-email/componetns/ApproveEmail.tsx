import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { notification } from 'antd'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { approve } from '@lib/auth'

export const ApproveEmail = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigate()
  const [searchParams, _] = useSearchParams()

  useEffect(() => {
    if (!searchParams || !navigation) return

    const id = searchParams.get('id')
    const email = searchParams.get('email')

    // WRONG DATA
    if (!id || !email) {
      notification.error({ message: 'Данные для подтверждения e-mail некорректны' })
      navigation('/')
      return
    }

    // SUCCESS
    dispatch(approve({ email, id })).then(() => {
      navigation('/')
    })
  }, [searchParams, navigation])

  return null
}
