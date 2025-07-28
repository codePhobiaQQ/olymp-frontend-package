import { Container } from '@app/components/layouts/Container'
import { Button } from '@shared/components/button'
import cls from './About.module.scss'
import LogoAnimal from '@public/svg/logo/logo-animal.svg?react'
import ArrowSvg from '@public/svg/decore/arrow.svg?react'
import AboutPallet from '@public/images/decore/about-pallet.png'
import { Typography } from 'antd'
import cn from 'classnames'

export const AboutScreen = () => {
  return (
    <section
      id="about"
      style={{ background: `url'${AboutPallet}' no-repeat center center / cover` }}
      className={cn(cls.About, 'section-padding bg-section1')}
    >
      <Container containerInnerClassname="flex flex-col items-center gap-20">
        <div className="flex flex-col items-center gap-2">
          <LogoAnimal className="h-24 w-40" />
          <p className="flex gap-2 text-center text-xl font-medium text-green-700">
            <span className="italic">Почему</span>
            <span className="font-semibold">v-olymp?</span>
          </p>
        </div>

        <Typography.Text rootClassName="max-w-4xl text-3xl text-center">
          Мы помогаем школьникам конвертировать свои знания в заслуженную награду (в том числе
          льготы при поступлении в ВУЗ)
        </Typography.Text>

        <div className="justify-beetwen flex flex-wrap items-stretch gap-4">
          <div className="flex min-w-80 flex-1 flex-col gap-10 rounded-lg bg-white p-5 shadow-xl">
            <h4 className="text-4xl font-semibold italic text-primary md:text-6xl">{'>400'}</h4>
            <p className="font-medium text-primary">
              заданий олимпиад прошлых лет с решениями для подготовки будущих участников
            </p>
          </div>

          <div className="flex min-w-80 flex-1 flex-col gap-10 rounded-lg bg-white p-5 shadow-xl">
            <h4 className="text-4xl font-semibold italic text-primary md:text-6xl">6</h4>
            <p className="font-medium text-primary">
              олимпиад, входящих в перечень минобрнауки, призерам которых доступны льготы при
              поступлении в высшие учебные заведения
            </p>
          </div>

          <div className="flex min-w-80 flex-1 flex-col gap-10 rounded-lg bg-white p-5 shadow-xl">
            <h4 className="text-4xl font-semibold italic text-primary md:text-6xl">19</h4>
            <p className="font-medium text-primary">
              детально проработанных бесплатных онлайн-курсов по предметам технического и
              гуманитарного профиля
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <p className="max-w-screen-sm text-center text-xl">
            Узнать подробнее о призах и льготах можно в соответствующем разделе сайта
          </p>
          <div>
            <Button
              href="/"
              className="h-10 min-w-80 text-lg"
              icon={<ArrowSvg className="h-3 w-3 fill-current" />}
            >
              Перейти
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
