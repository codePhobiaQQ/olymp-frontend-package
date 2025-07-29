import { ReactNode } from 'react'
import { ApproveEmail } from '@lib/approve-email/componetns/ApproveEmail'
import { OlympDetailsPage } from '@lib/olymps'
import {
  QualifyingList,
  QualifyingResult,
  ProfilePage,
  IntroduceList,
  IntroduceDetails,
  QualifyingTask,
  QualifyingResultDetails,
  FinalList,
  QualifyingDetails,
  FinalResults,
  FinalRegistration, IntroduceResult,
} from '@lib/personal-account'

import { MainPage } from '@lib/main'
import { SchedulePage } from '@lib/olymps/lib/schedule'
import { NewsPage, NewsDetailsPage } from '@lib/news'
import { ArchiveGeneralPage, TaskDetailsPage } from '@lib/archive'
import { RouteProps } from 'react-router-dom'
import { SupportPage } from '@lib/personal-account/support'
import cn from 'classnames'

// Personal account menu items
import ProfileSvg from '/public/svg/personal-account/profile.svg?react'
import QuestionSvg from '/public/svg/personal-account/question.svg?react'
import QualifyingSvg from '/public/svg/personal-account/qualifying.svg?react'
import FinishSvg from '/public/svg/personal-account/finish.svg?react'
import SupportSvg from '/public/svg/personal-account/support.svg?react'

import { TrophyOutlined } from '@ant-design/icons'
import { FinalRegistrationDetails } from '@lib/personal-account/olymps'
import { OnlineCourses } from '@lib/online-courses'

export type AppRoutesProps = RouteProps & {
  adminOnly?: boolean
  navLabel?: string
  navIcon?: (className: string) => ReactNode
  layout?: 'main' | 'personal-account'
  path: string
  disabled?: boolean
}

export enum Routes {
  MAIN = 'main',
  OLYMP = 'olymp',
  SCHEDULE = 'schedule',
  // PROGRESS = 'progress',
  ONLINE_COURSES = 'online-courses',
  NEWS = 'news',
  NEWS_DETAILS = 'news-details',
  TASK_ARCHIVE = 'tasks-archive',
  TASK_ARCHIVE_DETAILS = 'task-archive-details',
  PERSONAL_ACCOUNT_PROFILE = 'profile',
  // ---------
  INTRODUCE = 'introduce',
  INTRODUCE_DETAILS = 'introduce-details',
  INTRODUCE_RESULTS = 'introduce-results',
  // ---------
  QUALIFYING = 'qualifying',
  QUALIFYING_DETAILS = 'qualifying-details',
  QUALIFYING_TASK = 'qualifying-task',
  QUALIFYING_RESULTS = 'qualifying-results',
  QUALIFYING_RESULT_DETAILS = 'qualifying-results-details',
  // ---------
  FINAL_STAGE = 'final-stage',
  FINAL_STAGE_REGISTRATION = 'final-stage-registration',
  FINAL_STAGE_REGISTRATION_DETAILS = 'final-stage-registration-details',
  FINAL_STAGE_RESULTS = 'final-stage-results',
  // ---------
  SUPPORT = 'support',
  // ---------
  APPROVE_EMAIL = 'approve-email',
}

export const getMainRoute = () => '/'
export const getOlympRoute = () => '/olymp'
export const getScheduleRoute = () => '/schedule'
export const getProgressRoute = () => '/progress'
export const getOnlineCoursesRoute = () => '/online-courses'
export const getNewsRoute = () => '/news'
export const getTaskArchiveRoute = () => '/tasks-archive'

// PERSONAL ACCOUNT
export const getPersonalAccountRoute = () => '/personal-account'
// Introduce
export const getIntroduceRoute = () => '/personal-account/introduce'
export const getIntroduceResultsRoute = () => '/personal-account/introduce-results'
// Qualifying
export const getQualifyingRoute = () => '/personal-account/qualifying'
export const getQualifyingTaskRoute = () => '/personal-account/qualifying-task'
export const getQualifyingResultsRoute = () => '/personal-account/qualifying-results'
// Final
export const getFinalStageRoute = () => '/personal-account/final'
export const getFinalStageResultsRoute = () => '/personal-account/final-results'

export const routeConfig: Record<Routes, AppRoutesProps> = {
  // -----------------
  // Главная
  // -----------------
  [Routes.MAIN]: {
    path: getMainRoute(),
    navLabel: 'Олимпиады',
    element: <MainPage />,
  },
  // -----------------
  // Олимпиады
  // -----------------
  [Routes.OLYMP]: {
    path: getOlympRoute() + '/:name',
    element: <OlympDetailsPage />,
  },
  // -----------------
  // Расписание
  // -----------------
  [Routes.SCHEDULE]: {
    path: getScheduleRoute(),
    navLabel: 'Расписание',
    element: <SchedulePage />,
  },
  // -----------------
  // Новости
  // -----------------
  [Routes.NEWS]: {
    path: getNewsRoute(),
    navLabel: 'Новости',
    element: <NewsPage />,
  },
  [Routes.NEWS_DETAILS]: {
    path: getNewsRoute() + '/:id',
    element: <NewsDetailsPage />,
  },
  // -----------------
  // Прогресс
  // -----------------
  // [Routes.PROGRESS]: {
  //   path: getProgressRoute(),
  //   navLabel: 'Прогресс',
  //   element: <OlympDetailsPage />,
  // },
  // -----------------
  // Архив задач
  // -----------------
  [Routes.TASK_ARCHIVE]: {
    path: getTaskArchiveRoute(),
    navLabel: 'Архив задач',
    element: <ArchiveGeneralPage />,
  },
  [Routes.TASK_ARCHIVE_DETAILS]: {
    path: getTaskArchiveRoute() + '/:id',
    element: <TaskDetailsPage />,
  },
  // -----------------
  // Онлайн образование
  // -----------------
  [Routes.ONLINE_COURSES]: {
    path: getOnlineCoursesRoute(),
    navLabel: 'Онлайн-курсы',
    element: <OnlineCourses />,
  },
  // -----------------
  // Личный кабинет
  // -----------------
  [Routes.PERSONAL_ACCOUNT_PROFILE]: {
    path: getPersonalAccountRoute(),
    navLabel: 'Профиль',
    navIcon: (className) => <ProfileSvg className={cn(className, 'stroke-gray1')} />,
    element: <ProfilePage />,
    layout: 'personal-account',
  },
  // ---------------------------
  // ----- Ознакомительные -----
  // ---------------------------
  [Routes.INTRODUCE]: {
    path: getIntroduceRoute(),
    navLabel: 'Ознакомительные этапы',
    navIcon: (className) => <QuestionSvg className={cn(className, 'fill-gray1')} />,
    element: <IntroduceList />,
    layout: 'personal-account',
  },
  [Routes.INTRODUCE_DETAILS]: {
    path: getIntroduceRoute() + '/:olymp_slug',
    element: <IntroduceDetails />,
    layout: 'personal-account',
  },
  [Routes.INTRODUCE_RESULTS]: {
    path: getIntroduceResultsRoute(),
    element: <IntroduceResult />,
    layout: 'personal-account',
  },
  // ----------------------
  // ----- Отборочные -----
  // ----------------------
  [Routes.QUALIFYING]: {
    path: getQualifyingRoute(),
    navLabel: 'Отборочные этапы',
    navIcon: (className) => <QualifyingSvg className={cn(className, 'stroke-gray1')} />,
    element: <QualifyingList />,
    layout: 'personal-account',
  },
  [Routes.QUALIFYING_DETAILS]: {
    path: getQualifyingRoute() + '/:olymp_slug',
    element: <QualifyingDetails />,
    layout: 'personal-account',
  },
  [Routes.QUALIFYING_TASK]: {
    path: getQualifyingTaskRoute() + '/:task_id',
    element: <QualifyingTask />,
    layout: 'personal-account',
  },
  [Routes.QUALIFYING_RESULTS]: {
    path: getQualifyingResultsRoute(),
    navIcon: (className) => <ProfileSvg className={cn(className, 'stroke-gray1')} />,
    navLabel: 'Результаты отборочных этапов',
    element: <QualifyingResult />,
    layout: 'personal-account',
  },
  [Routes.QUALIFYING_RESULT_DETAILS]: {
    path: getQualifyingResultsRoute() + '/:year',
    element: <QualifyingResultDetails />,
    layout: 'personal-account',
  },
  // --------------------------
  // ----- Заключительные -----
  // --------------------------
  [Routes.FINAL_STAGE]: {
    path: getFinalStageRoute(),
    navIcon: (className) => <FinishSvg className={cn(className, 'fill-gray1')} />,
    navLabel: 'Заключительные этапы',
    element: <FinalList />,
    layout: 'personal-account',
  },
  [Routes.FINAL_STAGE_REGISTRATION]: {
    path: getFinalStageRoute() + '/:olymp_slug',
    element: <FinalRegistration />,
    layout: 'personal-account',
  },
  [Routes.FINAL_STAGE_REGISTRATION_DETAILS]: {
    path: getFinalStageRoute() + '/details' + '/:olymp_slug',
    element: <FinalRegistrationDetails />,
    layout: 'personal-account',
  },
  [Routes.FINAL_STAGE_RESULTS]: {
    path: getFinalStageResultsRoute(),
    navIcon: (className) => <TrophyOutlined className={cn(className, 'fill-gray1')} />,
    navLabel: 'Результаты заключительные этапов',
    element: <FinalResults />,
    layout: 'personal-account',
  },
  // ------
  [Routes.SUPPORT]: {
    path: getPersonalAccountRoute() + '/support',
    navIcon: (className) => <SupportSvg className={cn(className, 'stroke-gray1')} />,
    navLabel: 'Поддержка',
    element: <SupportPage />,
    layout: 'personal-account',
  },
  // -----
  [Routes.APPROVE_EMAIL]: {
    path: '/user-email-acception',
    element: <ApproveEmail />,
  },
}

export const routes = Object.values(routeConfig)

export const AppRouteByPathPattern: Record<string, Routes> = {
  [getMainRoute()]: Routes.MAIN,
  [getOlympRoute()]: Routes.OLYMP,
  [getScheduleRoute()]: Routes.SCHEDULE,
  [getOnlineCoursesRoute()]: Routes.ONLINE_COURSES,
  [getNewsRoute()]: Routes.NEWS,
  [getTaskArchiveRoute()]: Routes.TASK_ARCHIVE,
  // Personal Account
  [getPersonalAccountRoute()]: Routes.PERSONAL_ACCOUNT_PROFILE,
  // --------
  [getPersonalAccountRoute() + '/introduce-results']: Routes.INTRODUCE_RESULTS,
  [getPersonalAccountRoute() + '/introduce' + '/:olymp_slug']: Routes.INTRODUCE_DETAILS,
  [getPersonalAccountRoute() + '/introduce']: Routes.INTRODUCE,
  // --------
  [getPersonalAccountRoute() + '/qualifying-results' + '/:year']: Routes.QUALIFYING_RESULT_DETAILS,
  [getPersonalAccountRoute() + '/qualifying-results']: Routes.QUALIFYING_RESULTS,
  [getPersonalAccountRoute() + '/qualifying' + '/:olymp_slug']: Routes.QUALIFYING_DETAILS,
  [getPersonalAccountRoute() + '/qualifying']: Routes.QUALIFYING,
  // --------
  [getPersonalAccountRoute() + '/final-results']: Routes.FINAL_STAGE_RESULTS,
  [getFinalStageRoute()]: Routes.FINAL_STAGE,
  [getFinalStageRoute() + '/:olymp_slug']: Routes.FINAL_STAGE_REGISTRATION,
  [getFinalStageRoute() + '/details' + '/:olymp_slug']: Routes.FINAL_STAGE_REGISTRATION_DETAILS,
  // --------
  [getPersonalAccountRoute() + '/support']: Routes.SUPPORT,
}
