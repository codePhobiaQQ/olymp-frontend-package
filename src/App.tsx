import { Route, Routes } from 'react-router-dom'
import { routes } from '@app/lib/route/routes'
import { MainLayout } from '@app/components/layouts/MainLayout'
import { AuthProvider } from '@lib/auth'
import '@app/styles/index.scss'
import { PersonalAccountLayout } from '@app/components/layouts/PersonalAccountLayout'
import { AuthOnly } from '@app/lib/providers'
import { useSelector } from 'react-redux'
import { getAuthInited } from '@lib/auth/model/selectors/auth'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { Suspense, useEffect } from 'react'
import { initAuthData } from '@lib/user'
import { PageLoader } from '@shared/components/loaders/page-loader'
import { messagesSignal, notificationSignal } from '@app/model/state'
import { message, notification } from 'antd'

const RoutesItems = routes.map((route) => {
  let finalComponent

  if (route.layoutVariant === undefined || route.layoutVariant === 'default') {
    finalComponent = <MainLayout>{route.element}</MainLayout>
  } else if (route.layoutVariant === 'personalAccount') {
    finalComponent = (
      <AuthOnly>
        <PersonalAccountLayout>{route.element}</PersonalAccountLayout>
      </AuthOnly>
    )
  }

  return (
    <Route
      key={route.path}
      path={route.path}
      element={<Suspense fallback={<PageLoader />}>{finalComponent}</Suspense>}
    />
  )
})

function App() {
  const dispatch = useAppDispatch()
  const _inited = useSelector(getAuthInited)

  useEffect(() => {
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
        <Routes>{RoutesItems}</Routes>
      </AuthProvider>
    </>
  )
}

export default App
