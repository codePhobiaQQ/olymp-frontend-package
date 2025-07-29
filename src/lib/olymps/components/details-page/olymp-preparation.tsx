import { SectionTitle } from './shared'
import { Link } from 'react-router-dom'
import { getTaskArchiveRoute } from '@app/lib/route'
import cn from 'classnames'
import DirSvg from '/public/svg/olymps/dir.svg?react'
import FileSvg from '/public/svg/olymps/file.svg?react'
import ArrowSvg from '/public/svg/decore/arrow.svg?react'
import React from 'react'
import { Typography } from 'antd'

export const OlympPreparation = ({ slug }: { slug: string }) => {
  return (
    <section className="section-padding flex flex-col" id="olymp-preparation">
      <SectionTitle title="Подготовка к олимпиаде" />

      <div className="flex gap-2 flex-col md:flex-row">
        <PreparationCard
          description="Задания в архиве задач упорядочены по тематике и снабжены подсказками и подробными решениями, что очень удобно при подготовке 
к олимпиаде."
          link={getTaskArchiveRoute() + `?subject=${slug}`}
          name="Архив задач"
          className="bg-accentBlue"
          image={<DirSvg className="w-32 h-32 lg:w-52 lg:h-52 fill-secondary" />}
        />

        <PreparationCard
          link={getTaskArchiveRoute()}
          description="В этом разделе размещены варианты заданий прошлых лет  с решениями и ответами, а также критерии оценивания работ и определения призеров и победителей"
          name="Материалы прошлых лет"
          className="bg-accentGreen"
          image={<FileSvg className="w-32 h-32 lg:w-52 lg:h-52 stroke-secondary" />}
        />
      </div>
    </section>
  )
}

const PreparationCard = ({
  name,
  description,
  image,
  link,
  className,
}: {
  name: string
  description: string
  link: string
  className?: string
  image?: React.ReactNode
}) => {
  return (
    <Link to={link} className={cn(className, 'group transition-transform relative flex flex-col flex-1 h-auto md:h-96 rounded-xl p-6')}>
      <div className="absolute -right-4 lg:-right-8">
        {image}
      </div>

      <Typography.Text className="text-secondary font-bold text-2xl">{name}</Typography.Text>

      <div className="flex mt-32 md:mt-auto items-end justify-between gap-8">
        <Typography.Text className="text-secondary text-base">{description}</Typography.Text>

        <div className="overflow-hidden w-10 h-10 md:w-16 md:h-16 flex-shrink-0">
          <div className="arrow will-change-transform transition-transform group-hover:translate-x-0 translate-x-full w-10 h-10 p-3 md:w-16 md:h-16 md:p-6 flex-shrink-0 flex items-center justify-center border border-secondary rounded-full">
            <ArrowSvg className="w-full h-full fill-secondary rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  )
}
