import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type AnimationResult = gsap.core.Tween | gsap.core.Tween[] | null | Promise<gsap.core.Tween | gsap.core.Tween[] | null>
type CombineMode = 'parallel' | 'sequential'

interface CombineAnimationOptions {
  mode?: CombineMode
  onComplete?: () => void
  stagger?: number

  // ScrollTrigger settings (optional)
  triggerContainer?: string | HTMLElement
  start?: string
  end?: string
  toggleActions?: string
  markers?: boolean
}

export const combineAnimations = (
  animations: (() => AnimationResult)[],
  options: CombineAnimationOptions = {}
): void => {
  const {
    mode = 'parallel',
    onComplete,
    stagger,
    triggerContainer,
    start = 'top 70%',
    end,
    toggleActions = 'play none none none',
    markers = false,
  } = options

  const runAnimations = async () => {
    const resolved = animations.map((fn) => fn())

    if (mode === 'sequential') {
      for (const anim of resolved) {
        const tween = await anim
        await Promise.all(
          (Array.isArray(tween) ? tween : [tween])
            .filter(Boolean)
            .map(
              (t) => new Promise((res) => t?.eventCallback('onComplete', res))
            )
        )
      }
    } else {
      await Promise.all(resolved)
    }

    onComplete?.()
  }

  if (triggerContainer) {
    const triggerEl =
      typeof triggerContainer === 'string'
        ? document.querySelector(triggerContainer)
        : triggerContainer

    if (!triggerEl) {
      console.warn('[combineAnimations] triggerContainer not found:', triggerContainer)
      return
    }

    ScrollTrigger.create({
      trigger: triggerEl,
      start,
      end,
      toggleActions,
      markers,
      once: true,
      onEnter: runAnimations,
    })
  } else {
    // Если общего триггера нет — создаём scrollTrigger на каждый анимируемый элемент
    animations.forEach((fn, index) => {
      const animResult = fn()

      Promise.resolve(animResult).then((tweenOrTweens) => {
        const tweens = Array.isArray(tweenOrTweens)
          ? tweenOrTweens
          : tweenOrTweens
            ? [tweenOrTweens]
            : []

        tweens.forEach((tween) => {
          const el = (tween?.targets() as HTMLElement[])[0]
          if (!el) return

          ScrollTrigger.create({
            trigger: el,
            start,
            end,
            toggleActions,
            markers,
            once: true,
            onEnter: () => {
              // добавим задержку, если stagger указан
              if (stagger) {
                gsap.delayedCall(index * stagger, () => tween.play())
                tween.pause() // чтобы анимация не стартовала сразу
              } else {
                tween.play()
              }
            },
          })

          // если не был передан scrollTrigger — паузим анимацию до вхождения в область видимости
          if (!triggerContainer) {
            tween.pause()
          }
        })
      })
    })
  }
}
