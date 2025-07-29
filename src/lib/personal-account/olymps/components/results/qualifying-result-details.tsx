import { useGetQualResultsDetails } from './../../model/provider/qualifying-api'
import { Skeleton, Typography } from 'antd'
import { PageWrapper } from '@shared/components/page-wrapper'
import { PageTitle } from './../../../shared/components/page-title'
import { PageDescription } from './../../../shared/components/page-description'
import { PageSubmenu } from './../../../shared/components/page-submenu'
import { getQualifyingResultsRoute, getQualifyingRoute } from '@app/lib/route'
import { useLocation } from 'react-router-dom'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Answer } from '@lib/personal-account/olymps/components/results/shared/answer.tsx'
import { formatTime } from '@shared/utils/time'

export const QualifyingResultDetails = () => {
  const location = useLocation()
  const slug = location.pathname.split('/')?.[location.pathname.split('/')?.length - 1]
  const year = location.search.split('year=')[1]
  const { data, isLoading } = useGetQualResultsDetails({ slug, year }, { skip: !slug || !year })

  let content
  if (isLoading) {
    content = <Skeleton />
  } else if (data) {
    content = (
      <div className="flex flex-col gap-12">
        <div id="result-details-info" className="flex flex-col gap-2">
          <Typography.Text className="text-lg">
            <span className="font-medium text-gray-500">Предмет:</span>
            <span className="ml-2">{data?.['quiz_data']?.quiz_title}</span>
          </Typography.Text>
          <Typography.Text className="text-lg">
            <span className="font-medium text-gray-500">Начало прохождения:</span>
            <span className="ml-2">
              {formatTime(Number(data?.['user_data']?.user_start) * 1000)}
            </span>
          </Typography.Text>
          <Typography.Text className="text-lg">
            <span className="font-medium text-gray-500">Окончание прохождения:</span>
            <span className="ml-2">
              {formatTime(Number(data?.['user_data']?.user_finish) * 1000)}
            </span>
          </Typography.Text>
          <Typography.Text className="text-lg">
            <span className="font-medium text-gray-500">Время прохождения:</span>
            <span className="ml-2">{data?.['user_data']?.pass_duration}</span>
          </Typography.Text>
          <Typography.Text className="flex items-center text-lg">
            <span className="font-medium text-gray-500">Результат:</span>
            {data?.['user_data']?.is_passed ? (
              <>
                <span className="ml-2">Пройден</span>
                <CheckCircleOutlined className="ml-1 text-green-500" />
              </>
            ) : (
              <>
                <span className="ml-2">Не пройден</span>
                <CloseCircleOutlined className="ml-1 text-red-500" />
              </>
            )}
          </Typography.Text>
        </div>

        <div id="result-details-aswers" className="flex flex-col gap-8">
          <Typography.Text className="text-lg text-gray-500">Ответы:</Typography.Text>
          <div className="flex flex-col gap-12">
            {data.quiz_data.questions_and_answers.map((question) => {
              return (
                <div className="flex flex-col gap-4" key={question.id}>
                  {question.title && (
                    <Typography.Title level={4} className="text-lg">
                      {question.title}
                    </Typography.Title>
                  )}
                  {question.description && (
                    <Typography.Text>{question.description}</Typography.Text>
                  )}
                  <Answer
                    answer={question.user_answers}
                    answers={question.answers}
                    type={question.type}
                    is_correct={question.is_correct}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="qualifyign-stages-list">
      <PageWrapper>
        <PageTitle title="Детали прохождения отборочного этапа" />
        <PageDescription text="В данном разделе Вы можете посмотреть результаты отборочных и перейти для детального ознакомления" />
        <PageSubmenu
          activeKey="results"
          items={[
            {
              key: 'list',
              label: 'Отборочные этапы',
              path: getQualifyingRoute(),
            },
            {
              key: 'results',
              label: ' Результаты',
              path: getQualifyingResultsRoute(),
            },
          ]}
        />
        {content}
      </PageWrapper>
    </section>
  )
}
