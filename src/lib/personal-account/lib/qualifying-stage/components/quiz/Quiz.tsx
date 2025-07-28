interface QuestionSettings {
  required: number;
  answerEditor: string;
  question_title: string;
  featureImageID: string;
  featureImageSrc: string;
  matchAnswer: string;
  case_sensitive: string;
  "image_size-width": string;
  "image_size-height": string;
  autofill: string;
  limit_text: string;
  limit_multiple_response: string;
  file_upload_limit: string;
  file_upload_type: string;
  min_text_length: string;
}

interface Answer {
  [index: number]: string | number;
}

export type QuestionType = {
  settings: QuestionSettings;
  answers: Answer[];
}

interface QuizProps {
  questions: QuestionType[]
}

export const Quiz = (props: QuizProps) => {
  const { questions } = props
  console.log(questions)

  return (
    <div>
      quiz
    </div>
  )
}