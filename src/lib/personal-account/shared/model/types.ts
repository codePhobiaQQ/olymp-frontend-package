import { QualStatus } from '@lib/olymps/model/consts'

export interface QualifyingStageItem {
  title?: string
  status: {
    info: string
    code: QualStatus
  }
  slug: string
}

export type FinalStageItem = QualifyingStageItem

export type CityType = {
  key?: string
  label: string
  value: unknown
}

export type SchoolType = {
  key?: string
  label: string
  value: unknown
  data?: unknown
}

export type VenuesType = {
  [city in string]: {
    [university in string]: VenueType[]
  }
}

export type VenueType = {
  address: string
  city: string
  ogrn: string
  place_id: number
}

export type Application = {
  city?: string
}