// ----- Questions -----

export interface InfoProps {
  finish_time?: number
}

export type QuestionType = 'short_answer' | 'single_choose' | 'multi_choose'

export type QuestionI = {
  id: number
  question_id: string
  title: string
  description?: string
  type: QuestionType
  userAnswer?: string
  answers?: string[]
}

// ----------

export type QualifyingResultDetailsBackend = {
  olymp_data: {
    end_date: string
    passed_academic_year: string
    quiz_name: string
    slug: string
    start_date: string
    title: string
  }
  quiz_data: {
    questions_count: number
    quiz_title: string
    questions_and_answers: {
      answers: string[]
      description: string
      id: string
      images: string[]
      is_correct: boolean
      title: string
      type: 'Multiple Choice' | 'Short Answer'
      user_answers: string[]
    }[]
  }
  user_data: {
    pass_limit: number
    is_passed: boolean
    user_start: string
    user_finish: string
    pass_duration: string
    sum: number
  }
}

export type QualifyingResultDetails = Omit<QualifyingResultDetailsBackend, 'quiz_data'> & {
  quiz_data: {
    questions_count: number
    quiz_title: string
    questions_and_answers: {
      answers: string[]
      description: string
      id: string
      images: string[]
      is_correct: boolean
      title: string
      type: QuestionType
      user_answers: string[]
    }[]
  }
}
