import Logo from '/public/images/logo/logo-animal.svg?react'
import { convertArabicToRoman } from '@shared/utils/numbers'
import { GetOlympDetailsPayload } from './../../model/api'
import { Timeline } from '@shared/components/timeline'
import { Typography } from 'antd'
import { useWindowSize } from '@react-hook/window-size'

const BREAKPOINT_WIDTH = 920

export const GeneralInfo = ({ olympDetails }: { olympDetails?: GetOlympDetailsPayload }) => {
  const [width] = useWindowSize()

  return (
    <section className="flex flex-col pb-20" id="olymp-details-main">
      <div className="relative flex flex-col items-center">
        {width > BREAKPOINT_WIDTH && (
          <Logo
            style={{ transform: 'rotate(-15deg)' }}
            className="absolute left-0 top-0 h-32 w-32 "
          />
        )}
        <Typography.Text className="text-normal relative right-0 top-0 ml-auto text-nowrap lg:absolute lg:ml-0">
          Олимпиада {convertArabicToRoman(Number(olympDetails?.level))} уровня
        </Typography.Text>

        <Typography.Title
          level={2}
          className="gradient-text max-w-3xl break-words text-center text-4xl font-bold"
        >
          {olympDetails?.name}
        </Typography.Title>
      </div>

      <div className="relative m-auto mt-12 flex w-full flex-wrap justify-center gap-2 lg:w-9/12">
        {[
          {
            anchor: '#news',
            label: 'Новости олимпиады',
          },
          {
            anchor: '#official-info',
            label: 'Официальная информация',
          },
          {
            anchor: '#olymp-preparation',
            label: 'Подготовка',
          },
          {
            anchor: '#final-stage-results',
            label: 'Результаты',
          },
          {
            anchor: '#partners',
            label: 'Организаторы',
          },
          {
            anchor: '#about-olymp',
            label: 'Об олимпиаде',
          },
        ].map((navItem) => {
          return (
            <a
              className="rounded-md border border-primary p-1.5 transition-all hover:bg-primary hover:text-secondary lg:p-2.5"
              href={navItem.anchor}
            >
              {navItem.label}
            </a>
          )
        })}

        {width <= BREAKPOINT_WIDTH && (
          <Logo
            style={{ transform: 'rotate(-15deg) translateY(110%) translateX(-30%)' }}
            className="absolute bottom-0 left-0 flex h-32 w-32 lg:hidden"
          />
        )}
      </div>

      <Timeline
        className="mt-40"
        steps={[
          {
            title: 'Ознакомительный этап',
            description: 'Бессрочно',
          },
          {
            title: 'Отборочный (дистанционный) этап',
            description: 'Отборочный этап завершился 02.12.2024',
          },
          {
            title: 'Заключительный этап',
            description: 'Отборочный этап завершился 02.12.2024',
          },
        ]}
      />
    </section>
  )
}
