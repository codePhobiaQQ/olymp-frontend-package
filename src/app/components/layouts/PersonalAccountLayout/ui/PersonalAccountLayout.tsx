import cn from 'classnames'
import { ReactNode } from 'react'
import { Navigation } from './Navigation'
import { Content } from './Content.tsx'
import { Link } from 'react-router-dom'
import { EmailApprovedNotification } from '@lib/personal-account/lib/email-approving'

interface PersonalAccountLayoutProps {
  children?: ReactNode
}

export const PersonalAccountLayout = (props: PersonalAccountLayoutProps) => {
  const { children } = props

  return (
    <div className={cn('flex h-screen overflow-hidden text-sm')}>
      <div className="hidden w-20 flex-shrink-0 flex-col border-r border-gray-200 bg-white sm:flex dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-16 items-center justify-center text-blue-500">
          <Link to="/">
            <svg className="w-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <Navigation />

        <Content
          children={
            <div className="flex flex-col gap-4">
              <EmailApprovedNotification />
              {children}
            </div>
          }
        />
      </div>
    </div>
  )
}
