import { FC } from 'react'
import cls from './ResetForm.module.scss'
import cn from 'classnames'
import { Form } from 'antd'
import { Input } from '@shared/components/input/Input.tsx'
import { Button } from '@shared/components/button'
import { UserLoginProps } from '@lib/user'
import { login } from '@lib/auth/model/services/login.ts'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch.ts'

export type ResetFormProps = {
  className?: string
}

export const ResetForm: FC<ResetFormProps> = (props) => {
  const { className } = props
  const dispatch = useAppDispatch()

  const loginHandler = (fieldsValue: UserLoginProps) => {
    dispatch(login(fieldsValue))
  }

  return (
    <Form onFinish={loginHandler} className={cn(className, cls.ResetForm)} autoComplete="off">
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Необходимо ввести email',
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
