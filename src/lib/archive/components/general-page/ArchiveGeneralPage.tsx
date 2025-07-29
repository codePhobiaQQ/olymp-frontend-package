import { Container } from '@/app/components/layouts/container'
import { PageWrapper } from '@shared/components/page-wrapper'
import { SubjectFilters } from './filters/subject'
import { UserFilter } from './filters/user'
import { useEffect } from 'react'
import { destroy, init, resetFilters } from '../../model/functions'
import { TasksList } from '../tasks/TasksList'
import { categoriesSignal, gradesSignal, subjectSignal, yearsSignal } from '../../model/provider'
import { Button } from '@shared/components/button'
import { FilterOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { PageTitle } from '@shared/components/page-title'

export const ArchiveGeneralPage = () => {
  useEffect(() => {
    init()
    return () => {
      destroy()
    }
  }, [])

  let content = (
    <>
      <PageTitle text="Архив задач" />

      <SubjectFilters />

      <UserFilter className="mt-16" />

      {Boolean(subjectSignal.value) ? (
        <div className="mt-6 flex w-full flex-col gap-8">
          <div>
            <Button ghost icon={<FilterOutlined />} onClick={resetFilters}>
              Сбросить фильтры
            </Button>
          </div>
          <TasksList
            grades={gradesSignal.value ?? []}
            categories={categoriesSignal.value ?? []}
            years={yearsSignal.value ?? []}
            subject={subjectSignal.value!}
          />
        </div>
      ) : (
        <div className="mt-6 flex w-full justify-center">
          <Typography.Text className="text-center text-gray-500">
            Выберете предмет чтобы посмотреть задачи
          </Typography.Text>
        </div>
      )}
    </>
  )

  return (
    <PageWrapper id="archive-general-page" className="section-padding-first bg-section1 min-h-screen">
      <Container containerInnerClassname="flex flex-col gap-6">{content}</Container>
    </PageWrapper>
  )
}
