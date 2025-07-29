import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { AnimationOptions, Trigger } from './model/types'

export interface NumbersAnimations {
  increase: (
    el: Element | null,
    options?: IncreaseOptions
  ) => gsap.core.Tween | null
}

gsap.registerPlugin(ScrollTrigger)

interface IncreaseOptions extends AnimationOptions, Trigger {
  from?: number
  to?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export const increase = (
  el: Element | null,
  options: IncreaseOptions = {}
): gsap.core.Tween | null => {
  if (!el) return null

  const {
    from = 0,
    duration = 1.5,
    delay = 0,
    ease = 'power1.out',
    decimals = 0,
    scrollTrigger = {},
  } = options

  const rawText = (el as HTMLElement).textContent?.trim() || ''

  const match = rawText.match(/^([^0-9\-+.,]*)?([\d.,+-]+)([^0-9\-+.,]*)?$/)
  const parsedPrefix = match?.[1]?.trim() || ''
  const parsedNumber = match?.[2]?.replace(',', '.') || ''
  const parsedSuffix = match?.[3]?.trim() || ''

  const to = options.to ?? parseFloat(parsedNumber)
  const prefix = options.prefix ?? parsedPrefix
  const suffix = options.suffix ?? parsedSuffix

  if (isNaN(to)) {
    console.warn('[increase] Invalid number from content:', rawText)
    return null
  }

  const counter = { value: from }

  // Изначально скрываем элемент
  gsap.set(el, { autoAlpha: 0 })

  const tweenFn = () =>
    gsap.to(counter, {
      value: to,
      duration,
      delay,
      ease,
      onStart: () => {
        // Показываем элемент в момент старта
        gsap.set(el, { autoAlpha: 1 })
      },
      onUpdate: () => {
        const formatted = counter.value.toFixed(decimals)
        ;(el as HTMLElement).textContent = `${prefix}${formatted}${suffix}`
      },
    })

  const triggerEl =
    typeof scrollTrigger.triggerContainer === 'string'
      ? document.querySelector(scrollTrigger.triggerContainer)
      : scrollTrigger.triggerContainer ?? el

  const {
    start = 'top 80%',
    end,
    markers = false,
    toggleActions = 'play none none none',
    once = true,
    scrub,
    pin,
  } = scrollTrigger

  if (!triggerEl) {
    console.warn('[increase] scrollTrigger triggerContainer not found')
    return null
  }

  ScrollTrigger.create({
    trigger: triggerEl,
    start,
    end,
    toggleActions,
    markers,
    once,
    scrub,
    pin,
    onEnter: () => tweenFn(),
  })

  return null
}

export const numbers: NumbersAnimations = {
  increase,
}