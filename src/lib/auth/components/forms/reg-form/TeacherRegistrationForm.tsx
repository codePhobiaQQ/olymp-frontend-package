import { FC } from 'react'
import cn from 'classnames'
import { Form } from 'antd'
import { Input } from '@shared/components/input/Input.tsx'
import { Button } from '@shared/components/button'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch.ts'
import { UserLoginProps } from '@lib/user'
import { login } from '@lib/auth/model/services/login.ts'

export type RegistrationFormProps = {
  className?: string
}

export const TeacherRegistrationForm: FC<RegistrationFormProps> = (props) => {
  const { className } = props
  const dispatch = useAppDispatch()

  const registrationHandler = (fieldsValue: UserLoginProps) => {
    dispatch(login(fieldsValue))
  }

  return (
    <Form onFinish={registrationHandler} className={cn(className)} autoComplete="off">
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Необходимо ввести e-mail',
          },
        ]}
      >
        <Input type="email" labelProps={{ children: 'E-mail' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сбросить пароль
        </Button>
      </Form.Item>
    </Form>
  )
}
