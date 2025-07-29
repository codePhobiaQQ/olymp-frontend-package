import { FC } from 'react'
import cn from 'classnames'
import { Form } from 'antd'
import { Input } from '@shared/components/input/Input'
import { Button } from '@shared/components/button'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { login } from '@lib/auth/model/services/login'
import { UserLoginProps } from '@lib/user'
import { useNavigate } from 'react-router-dom'
import { FormTitle } from './../../shared/form-title'

export type LoginFormProps = {
  className?: string
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { className } = props
  const dispatch = useAppDispatch()
  let navigate = useNavigate()

  const loginHandler = (fieldsValue: UserLoginProps) => {
    console.log('fieldsValue', fieldsValue)

    dispatch(login(fieldsValue)).then((res) => {
      if (typeof res.payload !== 'string') {
        return navigate('/personal-account')
      }
    })
  }

  return (
    <Form
      onFinish={loginHandler}
      className={cn(className, 'flex flex-col gap-4 w-full')}
      autoComplete="off"
    >
      <FormTitle title="Вход в аккаунт" />

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

      <Form.Item name="password" rules={[{ required: true, message: 'Необходимо ввести пароль' }]}>
        <Input type="password" labelProps={{ children: 'Пароль' }} />
      </Form.Item>

      <Form.Item className="mt-4 flex justify-center">
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}
