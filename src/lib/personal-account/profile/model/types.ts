import { Dayjs } from 'dayjs'

export interface Metadata {
  birth_date: Dayjs | undefined
  first_name: string
  grade: string
  patronymic: string
  school: string
  second_name: string
}

export interface BackendMetadata {
  birth_date: string
  first_name: string
  grade: string
  patronymic: string
  school: string
  second_name: string
}
