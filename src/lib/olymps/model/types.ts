export type OfficialInformation = Partial<{
  olymp_full_name: string
  olymp_organisators: string
  olymp_сhairman_organizing_committee: string
  olymp_chairman_methodological_commission: string
  olymp_stages: string
  olymp_dates_venues_final_stage: string
}>

export type OlympData = {
  ID: string
  name: string
  description?: string
  start_qualifying_date?: string
  start_finishing_date?: string
  end_qualifying_date?: string
  end_finishing_date?: string
  slug: string
}

export interface OlympDataExtended extends OlympData {
  preview_image: boolean
  level: string
  official_information: OfficialInformation
  news: boolean
}
