export function getParent(el: HTMLElement | null, levels: number): HTMLElement | null {
  let current = el
  for (let i = 0; i < levels; i++) {
    if (!current?.parentElement) return null
    current = current.parentElement
  }
  return current
}