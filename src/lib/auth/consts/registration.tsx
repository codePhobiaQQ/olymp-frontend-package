import { SegmentedProps } from 'antd'
import { RegistrationFormType } from './../model/types/registration.ts'

export const registrationOptions: SegmentedProps<RegistrationFormType>['options'] = [
  {
    label: 'Для школьников',
    value: 'teenager',
  },
  {
    label: 'Для школ',
    value: 'school',
  },
  {
    label: 'Для учителей',
    value: 'teacher',
  },
]
