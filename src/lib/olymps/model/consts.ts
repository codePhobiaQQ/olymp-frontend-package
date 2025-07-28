export const subjects = ['phys', 'math'] as const

export const subjectsSlug: Record<(typeof subjects)[number], string> = {
  phys: 'physics',
  math: 'mathematics',
}
