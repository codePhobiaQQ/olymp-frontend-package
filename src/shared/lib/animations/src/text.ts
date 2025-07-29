import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { TextAnimationOptions } from './model/types'

export interface TextAnimations {
  fadeIn: (
    target: gsap.TweenTarget | undefined | null,
    options?: TextAnimationOptions
  ) => Promise<gsap.core.Tween | gsap.core.Tween[] | null>
}

export const animateSplitText = (
  target: gsap.TweenTarget | undefined | null,
  options: TextAnimationOptions = {}
): gsap.core.Tween | gsap.core.Tween[] | null => {
  if (!target) {
    console.warn('[baseTextAnimation] target is not defined')
    return []
  }

  const {
    type = 'words,lines',
    mask = 'lines',
    stagger = 0.1,
    duration = 0.9,
    ease = 'power2.out',
    delay = 0,
    onComplete,
    scrollTrigger,
    forcePlay
  } = options

  const elements = gsap.utils.toArray<HTMLElement>(target)
  if (elements.length === 0) return null

  const split = SplitText.create(elements, { type, mask })

  const targets =
    mask === 'words' ? split.words :
      mask === 'lines' ? split.lines :
        split.chars

  const tweenConfig = {
    autoAlpha: 1,
    y: 0,
    duration,
    delay,
    ease,
    stagger,
    onComplete
  }

  // Если передан scrollTrigger с triggerContainer
  if (scrollTrigger && scrollTrigger.triggerContainer) {
    const {
      triggerContainer,
      start = 'top 70%',
      markers = false,
      toggleActions = 'play none none none',
      ...rest
    } = scrollTrigger

    const triggerEl =
      typeof triggerContainer === 'string'
        ? document.querySelector(triggerContainer)
        : triggerContainer

    if (!triggerEl) {
      console.warn('[animateSplitText] triggerContainer not found:', triggerContainer)
      return null
    }

    return gsap.fromTo(targets, { autoAlpha: 0, y: 20 }, {
      ...tweenConfig,
      scrollTrigger: forcePlay ? {} : {
        trigger: triggerEl,
        start,
        markers,
        toggleActions,
        ...rest,
      },
    })
  }

  // Поэлементный scrollTrigger
  const {
    start = 'top 70%',
    markers = false,
    toggleActions = 'play none none none',
    ...rest
  } = scrollTrigger || {}

  return gsap.fromTo(targets, { autoAlpha: 0, y: 20 }, {
    ...tweenConfig,
    scrollTrigger: {
      trigger: targets[0],
      start,
      markers,
      toggleActions,
      ...rest,
    },
  })
}


export const fadeIn = async (
  target: gsap.TweenTarget | undefined | null,
  options?: TextAnimationOptions
): Promise<gsap.core.Tween | gsap.core.Tween[] | null> => {
  try {
    if (document.fonts && document.fonts.status !== 'loaded') {
      await document.fonts.ready
    }
    return animateSplitText(target, options)
  } catch (e) {
    console.warn('[fadeInSplitText] Failed to animate:', e)
    return null
  }
}

export const text: TextAnimations = {
  fadeIn,
}