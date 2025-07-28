import { effect, signal } from '@preact/signals-react'
import { MessageInstance } from 'antd/es/message/interface'
import { NotificationInstance } from 'antd/es/notification/interface'

// ------- Menu ----------
export const isMenuOpen = signal<boolean>(false)

// ------- Notifications -----
export const notificationSignal = signal<NotificationInstance | undefined>(undefined)

// ------- Messages -----
export const messagesSignal = signal<MessageInstance | undefined>(undefined)

// ------- Appearance -----
export type AppearanceType = 'dark' | 'light'
const appearance = localStorage.getItem('appearance')
export const currentAppearance = signal<AppearanceType>((appearance as AppearanceType) ?? 'dark')

effect(() => {
  localStorage.setItem('appearance', currentAppearance.value)
  document.documentElement.classList.remove('theme-dark', 'theme-light')
  document.documentElement.classList.add('theme-' + (currentAppearance.value ?? 'theme-dark'))
  document.body.classList.remove('theme-dark', 'theme-light')
  document.body.classList.add('theme-' + (currentAppearance.value ?? 'theme-dark'))
})
