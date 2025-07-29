import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const drawSVG = (
  selector: string,
  options: {
    duration?: number
    delay?: number
    ease?: string
    stagger?: number
    scrollTrigger?: ScrollTrigger.Vars
    start?: string
  } = {}
) => {
  const {
    duration = 1.5,
    delay = 0,
    ease = 'power2.out',
    stagger,
    scrollTrigger,
    start = 'top 80%',
  } = options

  const elements = gsap.utils.toArray<SVGPathElement>(selector)
  if (!elements.length) return

  // 1) скрываем путь
  elements.forEach((path) => {
    const len = path.getTotalLength()
    gsap.set(path, {
      strokeDasharray: len,
      strokeDashoffset: len,
    })
  })

  // 2) создаём анимацию «рисования»
  const tween = gsap.to(elements, {
    strokeDashoffset: 0,
    duration,
    delay,
    ease,
    stagger,
    immediateRender: false,
    scrollTrigger: {
      trigger: scrollTrigger?.trigger ?? selector,
      start,
      markers: scrollTrigger?.markers ?? false,
      toggleActions: scrollTrigger?.toggleActions ?? 'play none none none',
      once: scrollTrigger?.once ?? true,
      ...scrollTrigger,
    },
  })

  return tween
}

export const svg = {
  drawSVG
}