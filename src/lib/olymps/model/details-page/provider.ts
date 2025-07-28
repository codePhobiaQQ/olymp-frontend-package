import { signal } from '@preact/signals-react'

export const SEGMENT_URI_KEY = 'segment'

export type SegmentType =
  | 'news'
  | 'official_info'
  | 'time_place'
  | 'olymp_preparation'
  | 'tasks_archive'
  | 'organizer_partners'
  | 'results'
  | 'about'

export const activeSegment = signal<SegmentType | undefined>()

export const olymp = signal<string | undefined>()
