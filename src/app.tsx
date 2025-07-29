import { AuthProvider } from '@lib/auth'

import { useSelector } from 'react-redux'
import { getAuthInited } from '@lib/auth/model/selectors/auth'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useEffect } from 'react'
import { initAuthData } from '@lib/user'
import { messagesSignal, notificationSignal } from '@app/model/state'
import { message, notification } from 'antd'
import { AppRoute } from '@app/lib/route/components/AppRoute'

// ---------------
// Styles
// ---------------
import "slick-carousel/slick/slick.css";
import 'slick-carousel/slick/slick-theme.css'
import '@app/styles/index.scss'

// import { Config } from 'config-yaml'

function App() {
  const dispatch = useAppDispatch()
  const _inited = useSelector(getAuthInited)

  useEffect(() => {
    console.log('VITE_BACKEND_URL', import.meta.env.VITE_BACKEND_URL)
    if (!_inited) {
      dispatch(initAuthData())
    }
  }, [_inited])

  const [notificationApi, notificationContextHolder] = notification.useNotification({
    placement: 'bottomRight',
    stack: true,
  })
  const [messageApi, messageContextHolder] = message.useMessage()

  useEffect(() => {
    notificationSignal.value = notificationApi
  }, [notificationApi])

  useEffect(() => {
    messagesSignal.value = messageApi
  }, [messageApi])

  return (
    <>
      {notificationContextHolder}
      {messageContextHolder}

      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </>
  )
}

export default App
