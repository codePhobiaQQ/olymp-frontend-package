import { Progress, Typography } from 'antd'
import cls from './courses.module.scss'
import { Course } from './../model/types'
import { Link } from 'react-router-dom'
import ClockSvg from '/public/svg/decore/clock.svg?react'
import ArrowSvg from '/public/svg/decore/arrow.svg?react'
import { CardsLayout } from '@lib/olymps'
import cn from 'classnames'
import { useEffect, useRef } from 'react'
import { animation } from '@shared/lib/animations'

type CoursesProps = {
  title?: string
  courses?: Course[]
}

export const Courses = (props: CoursesProps) => {
  const { title, courses } = props

  // ---- Animations ----

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return;

    animation.geometry.fadeIn(containerRef.current.querySelectorAll(`.${cls.CourseItem}`), {
      onComplete: (el: HTMLElement) => {
        animation.text.fadeIn(el?.querySelector('.name'), { delay: 0.5, forcePlay: true })
        animation.geometry.fadeFromRight(el?.querySelector('.duration'), { delay: 0.8, forcePlay: true })
        animation.geometry.fadeFromRight(el?.querySelector('.description'), { delay: 1, forcePlay: true })
        animation.geometry.fadeFromLeft(el?.querySelector('.progress'), { delay: 1.2, forcePlay: true })
        animation.geometry.fadeFromRight(el?.querySelector('.link-icon'), { delay: 1.4, forcePlay: true })
      },
      scrollTrigger: {
        start: 'top 60%',
        markers: true
      }
    })
  }, [])

  // ---------------------

  return (
    <div ref={containerRef} className="flex flex-col gap-10">
      {title && <Typography.Title>{title}</Typography.Title>}
      {Boolean(courses && courses.length > 0) && (
        <CardsLayout className='courses-layout'>{courses?.map((course, index) => <CourseItem key={index} course={course} />)}</CardsLayout>
      )}
    </div>
  )
}

const CourseItem = ({ course }: { course: Course }) => {
  return (
    <Link
      target="_blank"
      to={course.link}
      className={cn(
        cls.CourseItem,
        { [cls.started]: course.started },
        'flex min-w-80 min-h-40 flex-1 flex-col rounded-xl p-5 gap-5'
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-1rounded-lg name">
          <Typography.Title level={4}>{course.name}</Typography.Title>
        </div>
        {course?.duration && (
          <div className="flex items-center gap-2 duration">
            <ClockSvg className="h-5 w-5" />
            <Typography.Text className="whitespace-nowrap">{course.duration}</Typography.Text>
          </div>
        )}
      </div>
      <div className="rounded-lg">
        {course?.description && <Typography.Paragraph className="description text-md">{course?.description}</Typography.Paragraph>}
      </div>

      <div className="mt-auto flex items-center justify-between gap-4">
        <Progress rootClassName='progress' percent={50} showInfo={false} />

        <div className="link-icon flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue">
          <ArrowSvg className="h-3 w-3" fill="blue" />
        </div>
      </div>
    </Link>
  )
}
