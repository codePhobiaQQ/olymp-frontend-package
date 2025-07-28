import { Container } from '@app/components/layouts/Container'
import { Typography } from 'antd'
import StagesLine from '@public/svg/decore/line.svg?react'
import { Button } from '@shared/components/button'

export const Stages = () => {
  return (
    <section className="section-padding bg-section2">
      <Container containerInnerClassname="flex flex-col gap-8">
        <div className="m-auto w-full md:w-10/12">
          <Typography.Text className="indent-4 text-2xl font-medium leading-normal md:text-3xl">
            Наша платформа предоставляет широкие возможности для ознакомления с механизмом участия в
            олимпиадах благодаря разделению процесса на
            <span className="ml-2 whitespace-nowrap rounded-lg bg-green-500 pb-1 pl-3 pr-3 pt-0 text-white">
              3 этапа
            </span>
            :
          </Typography.Text>
        </div>

        <StagesLine className="h-80 w-full" />

        <div className="-mt-20 hidden w-full gap-20 md:flex">
          <div className="mt-40 flex flex-1 flex-col gap-4">
            <Typography.Title level={4}>Ознакомительный этап</Typography.Title>
            <Typography.Text>
              Ознакомительный этап предназначается для знакомства с системой проведения
              дистанционных этапов олимпиад на нашем сайте. Вам предоставляется возможность
              посмотреть в каком формате задаются вопросы и как корректно вводить ответы.
            </Typography.Text>
            <Button>Ознакомительные этапы</Button>
          </div>
          <div className="mt-20 flex flex-1 flex-col gap-4">
            <Typography.Title level={4}>Отборочный (дистанционный) этап</Typography.Title>
            <Typography.Text>
              Для обеспечения возможности участия школьникам из всех регионов отборочный этап
              Олимпиады проводится в заочной форме на нашем сайте. Даты начала и окончания
              Отборочного этапа нужной олимпиады Вы можете узнать из Расписания олимпиад.
            </Typography.Text>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <Typography.Title level={4}>Заключительный этап</Typography.Title>
            <Typography.Text>
              Дату проведения заключительного этапа нужной олимпиады Вы можете узнать из Расписания
              олимпиад. Для того, чтобы стать призёром или победителем этого этапа, необходимо либо
              стать призёром Отборочного этапа, либо быть призёром аналогичной олимпиады прошлого
              года.
            </Typography.Text>
          </div>
        </div>
      </Container>
    </section>
  )
}
