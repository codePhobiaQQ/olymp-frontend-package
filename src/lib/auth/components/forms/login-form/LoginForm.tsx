import { FC } from 'react'
import cls from './LoginForm.module.scss'
import cn from 'classnames'
import { Form } from 'antd'
import { Input } from '@shared/components/input/Input.tsx'
import { Button } from '@shared/components/button'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch.ts'
import { login } from '@lib/auth/model/services/login.ts'
import { UserLoginProps } from '@lib/user'
import { useNavigate } from 'react-router-dom'

export type LoginFormProps = {
  className?: string
}

const LoginForm: FC<LoginFormProps> = (props) => {
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
    <Form onFinish={loginHandler} className={cn(className, cls.LoginForm)} autoComplete="off">
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
