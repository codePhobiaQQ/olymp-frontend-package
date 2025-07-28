import { SegmentedProps } from 'antd'

export type AuthModalActionValues = 'login' | 'registration' | 'reset_password'

export const authModalActions: SegmentedProps<AuthModalActionValues>['options'] = [
  { label: 'Войти', value: 'login' },
  { label: 'Зарегистрироваться', value: 'registration' },
  { label: 'Восстановить пароль', value: 'reset_password' },
]
