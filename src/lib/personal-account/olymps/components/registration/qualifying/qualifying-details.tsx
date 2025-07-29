import { QualifyingRegistration } from './qualifying-registration'
import { QualifyingStart } from './qualifying-start'
import { useGetIsRegistered } from './../../../model/provider/qualifying-api'
import { Spin } from 'antd'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { OlympSlug } from '@shared/types/olymps'
import { PageWrapper } from '@shared/components/page-wrapper'

export const QualifyingDetails = () => {
  const location = useLocation()
  const slug = location.pathname.split('/').pop() as OlympSlug
  const { isLoading, data: isRegistered, refetch } = useGetIsRegistered(slug!, { skip: !slug })

  let content: ReactNode | undefined

  if (isLoading) {
    content = (
      <div className="itmes-center flex h-40 w-full items-center justify-center">
        <Spin />
      </div>
    )
  } else if (!isRegistered) {
    content = <QualifyingRegistration refetch={refetch} />
  } else {
    content = <QualifyingStart />
  }

  return <PageWrapper>{content}</PageWrapper>
}
