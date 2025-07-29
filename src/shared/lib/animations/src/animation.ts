import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { text, TextAnimations } from './text'
import { geometry, GeometryAnimations } from './geometry'
import { numbers, NumbersAnimations } from './numbers'
import { svg } from './svg'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const animation: {
  text: TextAnimations
  geometry: GeometryAnimations
  numbers: NumbersAnimations
  // svg: SvgAnimation
} = {
  text,
  geometry,
  numbers,
  // svg
}
