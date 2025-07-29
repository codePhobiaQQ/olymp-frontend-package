import { SelectProps } from 'antd'

export type ClassValue = '7' | '8' | '9' | '10' | '11'

export const classOptions: SelectProps['options'] = [
  { value: '7', label: '7 класс' },
  { value: '8', label: '8 класс' },
  { value: '9', label: '9 класс' },
  { value: '10', label: '10 класс' },
  { value: '11', label: '11 класс' },
]

export type ClassSpecialization =
  | 'Общеобразовательный'
  | 'Гуманитарный'
  | 'Естественно-научный'
  | 'Физико-математический'

export const classSpecializationOptions: SelectProps<ClassSpecialization>['options'] = [
  { value: 'Общеобразовательный', label: 'Общеобразовательный' },
  { value: 'Гуманитарный', label: 'Гуманитарный' },
  { value: 'Естественно-научный', label: 'Естественно-научный' },
  { value: 'Физико-математический', label: 'Физико-математический' },
  { value: 'Физико-математический', label: 'Физико-математический' },
]

export type LearnAbout =
  | 'Рассказали в школе'
  | 'Рассказали на курсах'
  | 'Узнали от знакомых'
  | 'Другое'

export const learnAboutOlympOptions: SelectProps['options'] = [
  { value: 'Рассказали в школе', label: 'Рассказали в школе' },
  { value: 'Рассказали на курсах', label: 'Рассказали на курсах' },
  { value: 'Узнали от знакомых', label: 'Узнали от знакомых' },
  { value: 'Другое', label: 'Другое' },
]
