
export interface AnimationOptions {
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
  // Дополнительно:
  fromVars?: GSAPTweenVars
  toVars?: GSAPTweenVars
  onEachElement?: (el: HTMLElement, index?: number) => void
  onComplete?: (el: HTMLElement, index?: number) => void
  forcePlay?: boolean
}

export type Trigger = {
  scrollTrigger?: ScrollTrigger.Vars & {
    triggerContainer?: HTMLElement | string
  }
}

// TEXT OPTIONS

type SplitMask = 'words' | 'lines' | 'chars'
type SplitType = SplitMask | `${SplitMask},${SplitMask}`

export interface TextAnimationOptions extends AnimationOptions, Trigger {
  target?: HTMLElement | string
  type?: SplitType
  mask?: SplitMask
  revertOnComplete?: boolean
}
