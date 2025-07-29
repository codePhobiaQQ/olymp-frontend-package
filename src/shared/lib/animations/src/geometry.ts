import gsap from 'gsap'
import { AnimationOptions, Trigger } from './model/types'

type TargetType = gsap.TweenTarget | undefined | null
type Options = AnimationOptions & Trigger

type AnimationFunction = (
  target: gsap.TweenTarget | undefined | null,
  options: any
) => gsap.core.Tween | gsap.core.Tween[]

// ------------------------
// --------- BASE ---------
// ------------------------

const baseAnimation = (
  target: TargetType,
  options: Options
): gsap.core.Tween | gsap.core.Tween[] => {
  if (!target) {
    console.warn('[baseAnimation] target is not defined')
    return []
  }

  const {
    duration = 1.5,
    delay = 0,
    ease = "elastic.out(1, 0.5)",
    stagger = 0.1,
    scrollTrigger,
    fromVars = { autoAlpha: 0 },
    toVars = { autoAlpha: 1 },
    onEachElement,
    onComplete,
    forcePlay = false
  } = options

  const elements = gsap.utils.toArray<HTMLElement>(target)

  gsap.set(elements, {
    ...fromVars
  })

  const tweenConfig = {
    ...toVars,
    duration,
    delay,
    ease,
    stagger,
    onComplete,
  }

  gsap.set(elements, {
    ...fromVars
  })

  // TODO: Fix on complete
  if (scrollTrigger && scrollTrigger.triggerContainer) {

    const {
      triggerContainer,
      start = 'top 50%',
      markers = false,
      toggleActions = 'play none none none',
      ...rest
    } = scrollTrigger

    const triggerEl =
      typeof triggerContainer === 'string'
        ? document.querySelector(triggerContainer)
        : triggerContainer

    if (!triggerEl) {
      console.warn('[baseAnimation] triggerContainer not found:', triggerContainer)
      return []
    }

    elements.forEach((el, i) => onEachElement?.(el, i))

    const config: gsap.TweenVars = {
      ...tweenConfig
    }

    if (!forcePlay) {
      config.scrollTrigger = {
        trigger: triggerEl,
        markers,
        start,
        toggleActions,
        ...rest,
      }
    }

    return gsap.fromTo(elements, {}, config)
  }

  return elements.map((el, i) => {
    const {
      start = 'top 50%',
      markers = false,
      toggleActions = 'play none none none',

      ...rest
    } = scrollTrigger || {}

    onEachElement?.(el, i)

    gsap.set(el, { ...fromVars })
    const elementDelay = (delay ?? 0) + (stagger ?? 0) * i

    const config: gsap.TweenVars = {
      ...tweenConfig,
      delay: elementDelay,
      onComplete: () => {
        options.onComplete?.(el, i)
      }
    }

    if (!forcePlay) {
      config.scrollTrigger = {
        trigger: el,
        start,
        markers,
        toggleActions,
        ...rest,
      }
    }

    return gsap.fromTo(el, {}, config)
  })
}

// ------------------------
// Custom Animations
// ------------------------

export const fadeIn = (
  target: TargetType,
  options: Options
): gsap.core.Tween | gsap.core.Tween[] => {
  return baseAnimation(target, {
    ...options,
    delay: options.delay ?? 0,
    ease: options.ease,
    toVars: { autoAlpha: 1, y: 0 },
    fromVars: { autoAlpha: 0, y: 40 },
  })
}

export const fadeFromLeft = (
  target: TargetType,
  options: Options
): gsap.core.Tween | gsap.core.Tween[] => {
  return baseAnimation(target, {
    ...options,
    delay: options.delay ?? 0,
    ease: options.ease,
    toVars: { autoAlpha: 1, x: 0 },
    fromVars: { autoAlpha: 0, x: -40 },
  })
}

export const fadeFromRight = (
  target: TargetType,
  options: Options
): gsap.core.Tween | gsap.core.Tween[] => {
  return baseAnimation(target, {
    ...options,
    delay: options.delay ?? 0,
    ease: options.ease,
    toVars: { autoAlpha: 1, x: 0 },
    fromVars: { autoAlpha: 0, x: 40 },
  })
}

export const lineFadeFromLeft = (
  target: TargetType,
  options: Options
): gsap.core.Tween | gsap.core.Tween[] => {
  return baseAnimation(target, {
    ...options,
    delay: options.delay ?? 0,
    ease: 'expo.out',
    toVars: { scaleX: 1, transformOrigin: 'left center', },
    fromVars: { scaleX: 0, transformOrigin: 'left center', },
  })
}

// ------------------------

export const geometry = {
  // Objects
  fadeIn,
  fadeFromLeft,
  fadeFromRight,
  // Lines
  lineFadeFromLeft
}

export interface GeometryAnimations {
  fadeIn: AnimationFunction
  fadeFromLeft: AnimationFunction
  fadeFromRight: AnimationFunction
  lineFadeFromLeft: AnimationFunction
}