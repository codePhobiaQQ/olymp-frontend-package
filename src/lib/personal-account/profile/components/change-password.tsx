import { Form, Input } from 'antd'
import { Button } from '@shared/components/button'
import { warning } from '@app/lib/notification'
import { useChangePassword } from './../model/api'
import { tsxMsg } from '@app/lib/messages'

export const ChangePassword = () => {
  const [changePassword] = useChangePassword()

  const changePasswordHandler = (values: {
    prev_password: string
    new_password: string
    new_password_repeat: string
  }) => {
    const { new_password, new_password_repeat, prev_password } = values
    if (new_password !== new_password_repeat) {
      warning({ text: 'Введенные пароли не совпадают...' })
      return
    }
    const destroy = tsxMsg({ content: 'Смена пароля...' })
    changePassword({ new_password, prev_password }).finally(() => {
      destroy()
    })
  }

  return (
    <Form onFinish={changePasswordHandler} layout="vertical" className="flex flex-col gap-4">
      <Form.Item label="Предыдущий пароль" name="prev_password">
        <Input type="password" placeholder="qwerty123" />
      </Form.Item>
      <Form.Item label="Новый пароль" name="new_password">
        <Input type="password" placeholder="4DF(&__fs" />
      </Form.Item>
      <Form.Item label="Повторите новый пароль" name="new_password_repeat">
        <Input type="password" placeholder="4DF(&__fs" />
      </Form.Item>
      <Form.Item rootClassName="mt-3">
        <Button htmlType="submit">Применить</Button>
      </Form.Item>
    </Form>
  )
}
