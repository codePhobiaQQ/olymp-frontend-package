import { Container } from '@app/components/layouts/Container'
import { PageWrapper } from '@shared/components/page-wrapper'
import { SubjectFilters } from './filters/subject'
import { UserFilter } from './filters/user'
import { useEffect } from 'react'
import { destroy, init } from './../../model/general-page/functions'
import { TasksList } from './../tasks/TasksList'
import { subjectSignal } from './../../model/general-page/provider'

export const ArchiveGeneralPage = () => {
  useEffect(() => {
    init()
    return () => {
      destroy()
    }
  }, [])

  return (
    <PageWrapper id="archive-general-page" className="section-padding bg-section1">
      <Container containerInnerClassname="flex flex-col gap-10">
        <SubjectFilters />
        <UserFilter />

        {subjectSignal.value && <TasksList className="mt-8" subject={subjectSignal.value} />}
      </Container>
    </PageWrapper>
  )
}
