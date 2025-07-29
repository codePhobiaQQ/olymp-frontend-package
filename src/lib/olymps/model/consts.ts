import CloseSvg from '/public/svg/olymps/closed.svg?react'
import DetailsSvg from '/public/svg/olymps/details.svg?react'
import SkipedSvg from '/public/svg/olymps/olymp-skip.svg?react'
import ContinueSvg from '/public/svg/olymps/continue-olymp.svg?react'
import StartSvg from '/public/svg/olymps/start-olymp.svg?react'
import FinishedAndWait from '/public/svg/olymps/finish-and-wait.svg?react'

const disableCls = 'pointer-events-none opacity-75'

export const qualStatusCodeData = {
  organizers_not_set_dates: {
    image: CloseSvg,
    cls: 'opacity-75',
    wrapperCls: disableCls,
    svgCls: undefined,
  },
  olymp_not_started: {
    image: CloseSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
  // Olymp has been passed but results aren't available
  olymp_finished: {
    image: DetailsSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
  // Olymp has been finished but user hadn't taken part
  olymp_skip: {
    image: SkipedSvg,
    cls: 'opacity-75',
    wrapperCls: disableCls,
    svgCls: undefined,
  },
  user_not_started_olymp_started: {
    image: StartSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: 'stroke-primary h-12 w-12',
  },
  user_started_not_finished: {
    image: ContinueSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
  user_finished_olymp_not_finished: {
    image: FinishedAndWait,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: 'stroke-primary h-12 w-12',
  },
  user_not_registered: {
    image: undefined,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
  not_available: {
    image: CloseSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
} as const

export type QualStatus = keyof typeof qualStatusCodeData

export const qualDesirableStatuses: { order: number; status: QualStatus }[] = [
  { order: 1, status: 'user_not_registered' },
  { order: 2, status: 'user_finished_olymp_not_finished' },
  { order: 3, status: 'user_not_started_olymp_started' },
  { order: 3, status: 'olymp_finished' },
]

// ---------------------

export const finalStatusCodeData = {
  organizers_not_set_dates: {
    image: CloseSvg,
    cls: 'opacity-75',
    wrapperCls: disableCls,
    svgCls: undefined,
  },
  registration_not_started: {
    image: CloseSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
  // Olymp has been passed but results aren't available
  olymp_finished: {
    image: DetailsSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
  // Olymp has been finished but user hadn't taken part
  olymp_skip: {
    image: SkipedSvg,
    cls: 'opacity-75',
    wrapperCls: disableCls,
    svgCls: undefined,
  },
  user_not_started_olymp_started: {
    image: StartSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: 'stroke-primary h-12 w-12',
  },
  user_started_not_finished: {
    image: ContinueSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
  user_finished_olymp_not_finished: {
    image: FinishedAndWait,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: 'stroke-primary h-12 w-12',
  },
  user_not_registered: {
    image: undefined,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
  not_available: {
    image: CloseSvg,
    cls: undefined,
    wrapperCls: undefined,
    svgCls: undefined,
  },
} as const

export type FinalStatus = keyof typeof finalStatusCodeData

export const finalDesirableStatuses: { order: number; status: QualStatus }[] = [
  { order: 1, status: 'user_not_registered' },
  { order: 2, status: 'user_finished_olymp_not_finished' },
  { order: 3, status: 'user_not_started_olymp_started' },
  { order: 3, status: 'olymp_finished' },
]
