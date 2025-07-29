import { Skeleton, Typography } from 'antd'
import { Button } from '@shared/components/button'
import { useGetOlympQualifyingData } from './../../../model/provider/qualifying-api'
import { useLocation, useNavigate } from 'react-router-dom'
import { getQualifyingTaskRoute } from '@app/lib/route/model/routes'
import { PageTitle } from './../../../../shared/components/page-title.tsx'
import { PageDescription } from './../../../../shared/components/page-description.tsx'

export const QualifyingStart = () => {
  const location = useLocation()
  let navigate = useNavigate()
  const olymp_slug = location.pathname.split('/')?.[location.pathname.split('/')?.length - 1]

  const startOlympHandler = () => {
    navigate(getQualifyingTaskRoute() + `/${olymp_slug}`)
  }

  const { isLoading, data } = useGetOlympQualifyingData(
    {
      subject: olymp_slug,
    },
    {
      skip: false,
    }
  )

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <section id="qualifying-start-page" className="flex flex-col gap-8">
      <PageTitle title={'Начать прохождение отборочный этап олимпиады' + ' ' + data?.quiz_name} />
      <PageDescription text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur deserunt neque nesciunt non nulla quasi velit voluptatibus! Aspernatur, ratione rerum." />

      <Typography.Title level={3}>
        Начать прохождение отборочный этап олимпиады
        <br />"{data?.quiz_name}"
      </Typography.Title>

      <div className="flex flex-col gap-2">
        <Typography.Text className="text-lg">
          Продолжительность олимпиады: {data?.duration} минут
        </Typography.Text>
        <Typography.Text className="text-lg">
          Количество вопросов: <span className="font-medium">{data?.questions_count}</span>
        </Typography.Text>
        <Typography.Text className="text-lg">
          Класс прохождения: <span className="font-medium">{data?.class} класс</span>
        </Typography.Text>
        <Typography.Text className="text-lg">
          Даты проведения:{' '}
          <span className="font-medium">
            {data?.quiz_start} - {data?.quiz_end}
          </span>
        </Typography.Text>
      </div>

      <Typography.Text className="max-w-screen-sm text-lg">{data?.description}</Typography.Text>

      <div>
        <Button onClick={startOlympHandler}>Начать олимпиаду</Button>
      </div>
    </section>
  )
}
