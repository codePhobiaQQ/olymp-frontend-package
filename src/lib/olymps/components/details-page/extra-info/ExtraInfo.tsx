import { Tabs } from 'antd'
import { ReactNode } from 'react'
import ArchiveSvg from '@public/svg/menu/archive.svg?react'
import BuildingSvg from '@public/svg/menu/building.svg?react'
import CubeSvg from '@public/svg/menu/cube.svg?react'
import InfoSvg from '@public/svg/menu/info.svg?react'
import ListSvg from '@public/svg/menu/list.svg?react'
import NewsSvg from '@public/svg/menu/news.svg?react'
import StudySvg from '@public/svg/menu/study.svg?react'
import TimeSvg from '@public/svg/menu/time.svg?react'
import cn from 'classnames'
import { activeSegment, olymp } from './../../../model/details-page/provider'
import { changeSegmentHandler } from './../../../model/details-page/functions'
import { NewsContent } from '@lib/news'
import { useWindowWidth } from '@react-hook/window-size'

const menuIconCls = 'w-5 h-5 fill-primary'

const extraActions: {
  label: string
  segment_name: string
  icon?: ReactNode
  children?: ReactNode
}[] = [
  {
    label: 'Новости',
    segment_name: 'news',
    icon: <NewsSvg className={menuIconCls} />,
    children: <NewsContent filters={{ olymp_categories: olymp.value ? [olymp.value] : [] }} />,
  },
  {
    label: 'Официальная информация',
    segment_name: 'official_info',
    icon: <InfoSvg className={menuIconCls} />,
    children: '2',
  },
  {
    label: 'Сроки и места проведения',
    segment_name: 'time_place',
    icon: <TimeSvg className={menuIconCls} />,
    children: '3',
  },
  {
    label: 'Подготовка к олимпиаде',
    segment_name: 'olymp_preparation',
    icon: <StudySvg className={menuIconCls} />,
    children: '4',
  },
  {
    label: 'Архив задач',
    segment_name: 'tasks_archive',
    icon: <ArchiveSvg className={menuIconCls} />,
    children: '5',
  },
  {
    label: 'Организаторы и партнеры',
    segment_name: 'organizer_partners',
    icon: <BuildingSvg className={menuIconCls} />,
    children: '6',
  },
  {
    label: 'Результаты',
    segment_name: 'results',
    icon: <ListSvg className={menuIconCls} />,
    children: '7',
  },
  {
    label: 'Об олимпиаде',
    segment_name: 'about',
    icon: <CubeSvg className={cn('h-5 w-5', 'stroke-primary')} />,
    children: '8',
  },
]

export const ExtraInfo = () => {
  const width = useWindowWidth()

  return (
    <section className="menu-content-gap flex pt-20" id="olymps-details-extra-info">
      <Tabs
        rootClassName="overflow-x-hidden"
        tabPosition={width > 768 ? 'left' : 'top'}
        activeKey={activeSegment.value}
        onChange={changeSegmentHandler}
        items={extraActions.map((action) => {
          return {
            label: (
              <div className="flex items-center gap-3">
                {action.icon}
                {action.label}
              </div>
            ),
            key: action.segment_name,
            children: action.children,
          }
        })}
      />
    </section>
  )
}
