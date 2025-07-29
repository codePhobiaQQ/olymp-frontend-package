import { PageWrapper } from '@shared/components/page-wrapper'
import { Container } from '@app/components/layouts/container'
import { PageTitle } from '@shared/components/page-title'
import { Courses } from './courses'
import { Course } from './../model/types'

const tech_courses: Course[] = [
  {
    name: 'Подготовка к олимпиаде по криптографии. Часть 1',
    description: 'Делимость, сравнимость, решение уравнений в целых числах',
    link: 'https://google.com',
    duration: 12 * 60,
    passedTopics: 5,
    totalTopics: 10,
    started: true
  },
  {
    name: 'Подготовка к олимпиаде по криптографии. Часть 1',
    description: 'Делимость, сравнимость, решение уравнений в целых числах',
    link: 'https://google.com',
    duration: 12 * 60,
    passedTopics: 5,
    totalTopics: 10,
    started: true
  },
  {
    name: 'Подготовка к олимпиаде по криптографии. Часть 1',
    description: 'Делимость, сравнимость, решение уравнений в целых числах',
    link: 'https://google.com',
    duration: 12 * 60,
    passedTopics: 5,
    totalTopics: 10,
    started: true
  },
  {
    name: 'Подготовка к олимпиаде по криптографии. Часть 1',
    description: 'Делимость, сравнимость, решение уравнений в целых числах',
    link: 'https://google.com',
    duration: 12 * 60,
    passedTopics: 5,
    totalTopics: 10,
    started: true
  },
  {
    name: 'Подготовка к олимпиаде по криптографии. Часть 1',
    description: 'Делимость, сравнимость, решение уравнений в целых числах',
    link: 'https://google.com',
    duration: 12 * 60,
    passedTopics: 5,
    totalTopics: 10,
    started: true
  },
  {
    name: 'Подготовка к олимпиаде по криптографии. Часть 1',
    description: 'Делимость, сравнимость, решение уравнений в целых числах',
    link: 'https://google.com',
    duration: 12 * 60,
    passedTopics: 5,
    totalTopics: 10,
    started: true
  },
]

export const OnlineCourses = () => {
  return (
    <PageWrapper id="online-courses" className="section-padding-first bg-section1">
      <Container containerInnerClassname="flex flex-col gap-20">
        <PageTitle text="Онлайн курсы" />
        <Courses courses={tech_courses} title="Технические курсы" />
        <Courses courses={tech_courses} title="Гуманитарные курсы" />
      </Container>
    </PageWrapper>
  )
}