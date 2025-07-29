import { FC } from 'react'
import cn from 'classnames'
import { Form } from 'antd'
import { Input } from '@shared/components/input/Input'
import { Button } from '@shared/components/button'
import { UserLoginProps } from '@lib/user'
import { login } from './../../../model/services/login'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { FormTitle } from '@lib/auth/components/shared/form-title.tsx'

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
    <Form
      onFinish={loginHandler}
      className={cn(className, 'flex flex-col gap-4 w-full')}
      autoComplete="off"
    >
      <FormTitle title="Восстановить пароль" />

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

      <Form.Item className="mt-4 flex justify-center">
        <Button type="primary" htmlType="submit">
          Сбросить пароль
        </Button>
      </Form.Item>
    </Form>
  )
}
