import { Quiz } from '@shared/lib/quiz'
import { useAnswerQuiz, useFinishQuiz, useGetQuizData } from './../../model/provider/qualifying-api'
import { useLocation, useNavigate } from 'react-router-dom'
import { Skeleton, Typography } from 'antd'
import { success, error } from '@app/lib/notification'
import { getQualifyingRoute } from '@app/lib/route'
import { PageWrapper } from '@shared/components/page-wrapper'

export const QualifyingTask = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const olymp_slug = location.pathname.split('/')?.[location.pathname.split('/')?.length - 1]

  // QUIZ DATA
  const { data, isLoading } = useGetQuizData({ subject: olymp_slug }, { skip: !olymp_slug })

  // QUIZ END
  const [finishQuiz] = useFinishQuiz()
  const finishQuizHandler = async () => {
    if (!olymp_slug) {
      return
    }
    finishQuiz?.(olymp_slug)
      .then(() => {
        success({ text: 'Вы завершили олимпиаду!' })
        navigate(getQualifyingRoute())
      })
      .catch((e) => {
        console.log(e)
        error({ text: 'Ошибка при завершении олимпиады' })
      })
  }

  // QUIZ ANSWER
  const [updateAnswer] = useAnswerQuiz()
  const answerHandler = async ({
    question_id,
    answer,
  }: {
    question_id: string
    answer: string
  }) => {
    await updateAnswer({ question_id, answer, subject: olymp_slug })
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <PageWrapper id="qualifygin-task-page" className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Typography.Title level={3}>Отборочный этап: {data?.quiz_title}</Typography.Title>
      </div>

      <Quiz
        onAnswer={answerHandler}
        onFinish={finishQuizHandler}
        info={{ finish_time: data?.finish_time }}
        questions={data?.questions ?? []}
      />
    </PageWrapper>
  )
}
