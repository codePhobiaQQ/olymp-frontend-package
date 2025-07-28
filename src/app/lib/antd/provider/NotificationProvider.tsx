import { ReactNode } from 'react'
import { notification } from 'antd'

type PropsType = {
  children?: ReactNode
}

export const NotificationProvider = (props: PropsType) => {
  const { children } = props
  const [, contextHolder] = notification.useNotification({ placement: 'bottomRight' })

  return (
    <>
      {contextHolder}
      {children}
    </>
  )
}
