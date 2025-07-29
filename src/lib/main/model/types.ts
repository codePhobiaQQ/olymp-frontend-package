import { OlympData } from '@lib/olymps'

export type MainPageData = {
  olymps: OlympData[]
  advantages: {
    sectionTitle: string
    advantages: {
      title: string
      description: string
    }[]
  }
  winners: {
    sectionTitle: string
    description: string
    advantages: {
      index: number
      text: string
    }[]
    extraInfo1: string
    extraInfo2: string
  }
  stages: {
    sectionTitle: string
    stages: {
      title: string
      description: string
    }[]
  }
  partners: {
    sectionTitle: string
    Organizer: {
      title: string
      description: string
    }[]
  }
  faq: {
    sectionTitle: string
    items: {
      title: string
      text: string
    }[]
  }
}
