export type TaskI = {
  id: number
  task_name: string
  task_condition_text_condition: string
  answer_text_answer: string
  hint?: string[]
  solution: string
  isFavourite: boolean
  rating: string
  rated_count: string
  year: string
  class: string
}


export interface TaskBackendI {
  count: number
  data: TaskI[]
}

export type SubjectRubricBackend = { label: string, slug: string }

export type SubjectRubric = { label: string, value: string }