import { getAuthData } from '@lib/auth'
import { useSelector } from 'react-redux'
import { Alert, Button, Flex } from 'antd'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch.ts'
import { sendApprovalEmail } from '@lib/auth/model/services/sendEmail.ts'
import { initAuthData } from '@lib/user'

export const EmailApprovedNotification = () => {
  const authData = useSelector(getAuthData)
  const dispatch = useAppDispatch()

  const sendEmail = () => {
    dispatch(sendApprovalEmail())
  }

  const refreshStatus = () => {
    dispatch(initAuthData())
  }

  if (authData?.isApproval) return null

  return (
    <Alert
      message="Ваш email не подтвержден, пожалуйста перейдите на почту и сделайте это. Вы можете повторно отправить письмо с подтверждением:"
      type="warning"
      closable
      action={
        <Flex vertical gap="small">
          <Button onClick={sendEmail} size="small" type="text">
            Отправить
          </Button>
          <Button onClick={refreshStatus} size="small" type="text">
            Обновить статус
          </Button>
        </Flex>
      }
    />
  )
}
