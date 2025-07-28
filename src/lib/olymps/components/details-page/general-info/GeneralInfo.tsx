import ArrowSvg from '@public/svg/decore/arrow.svg?react'
import { Typography } from 'antd'
import { convertArabicToRoman } from '@shared/lib/utils/numbers'
import { Button } from '@shared/components/button'
import { GetOlympDetailsPayload } from './../../../model/services'

export const GeneralInfo = ({ olympDetails }: { olympDetails?: GetOlympDetailsPayload }) => {
  return (
    <section className="flex flex-col border-b-2 border-b-accentPink pb-20" id="olymp-details-main">
      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        <Typography.Title className="max-w-3xl uppercase" level={2}>
          {olympDetails?.official_information?.olymp_full_name}
        </Typography.Title>

        <Typography.Text className="text-normal text-nowrap font-medium uppercase italic">
          олимпиада {convertArabicToRoman(Number(olympDetails?.level))} уровня
        </Typography.Text>
      </div>

      <div className="mt-20 flex flex-wrap justify-between gap-4">
        <div className="flex-1">
          <Button
            href="/"
            className="border-1 h-10 w-full border-primary bg-transparent text-lg uppercase text-primary"
            iconPosition="end"
            icon={<ArrowSvg className="h-3 w-3 fill-primary" />}
          >
            Ознакомительный этап
          </Button>
        </div>

        <div className="flex-1 flex-col gap-2">
          <Button
            href="/"
            disabled={!olympDetails?.qualifyingActive}
            className="h-10 w-full text-lg uppercase"
            iconPosition="end"
            icon={<ArrowSvg className="h-3 w-3 fill-current" />}
          >
            Отборочный этап
          </Button>

          <Typography.Text className="text-xs text-gray-400">
            Отборочный этап завершился 20.11.2023
          </Typography.Text>
        </div>

        <div className="flex-1">
          <Button
            href="/"
            disabled={!olympDetails?.finishingActive}
            className="h-10 w-full text-lg uppercase"
            iconPosition="end"
            icon={<ArrowSvg className="h-3 w-3 fill-current" />}
          >
            Заключительный этап
          </Button>
        </div>
      </div>
    </section>
  )
}
