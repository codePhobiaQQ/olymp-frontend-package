import { Select, Typography } from 'antd'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { OlympSlug } from '@shared/types/olymps'
import { useGetOlympDetails } from '@lib/olymps'
import { PageWrapper } from '@shared/components/page-wrapper'
import { GradeChoose } from './../../../../shared/components/grade-choose'
import {
  useGetIntroduceOlympVariants,
  useStartIntroduceQuiz,
} from './../../../model/provider/introduce-api'
import { PageTitle } from './../../../../shared/components/page-title'
import { PageDescription } from './../../../../shared/components/page-description'
import { Button } from '@shared/components/button'
import { success } from '@app/lib/notification'

export const IntroduceDetails = () => {
  const location = useLocation()
  const slug = location.pathname.split('/').pop() as OlympSlug

  const [grade, setGrade] = useState<number>()
  const [currentVariant, setCurrentVariant] = useState<string | undefined>()

  const { data: olympDetails, isLoading: isLoadingOlympInfo } = useGetOlympDetails(slug, {
    skip: !slug,
  })

  const [startQuizHandler] = useStartIntroduceQuiz()

  // -----------------------
  // Variants
  // -----------------------

  const {
    isLoading: isLoadingVariants,
    data: variants,
    refetch: refetchVariants,
  } = useGetIntroduceOlympVariants({ slug, grade: grade! }, { skip: !slug || !grade })

  // -----------------------

  const onChangeGrade = (grade_: number) => {
    setGrade((prev) => {
      if (prev && prev !== grade_) {
        setCurrentVariant(undefined)
        refetchVariants()
      }
      return grade_
    })
  }

  const onChangeVariant = (variant: string) => {
    setCurrentVariant(variant)
  }

  const onStartQuiz = async () => {
    if (!currentVariant || !grade || !slug) {
      return
    }
    startQuizHandler({
      grade,
      slug,
      variant: '1',
    }).then(() => {
      success({
        text: 'Начало олимпиады, после прохождения результаты появятся в разделе "Результаты ознакомительных этапов"',
      })
    })
  }

  // -----------------------

  return (
    <section id="introduce-stages-details">
      <PageWrapper>
        {Boolean(isLoadingOlympInfo) ? (
          <div></div>
        ) : (
          <>
            <PageTitle title={olympDetails?.name ?? 'Олимпиада'} />
            <PageDescription text="Выберите класс и вариант ознакомительного этапа. Для лучшей подготовки рекомендуется прорешать несколько вариантов своего класса. Вы можете решать вариант повторно, будет отображаться последний результат." />

            <div className="flex flex-col gap-6">
              <GradeChoose
                labelProps={{ children: 'Класс' }}
                className="w-96 max-w-full"
                onChange={onChangeGrade}
                value={grade}
              />

              <div className="flex flex-col gap-1">
                <Typography.Text>Вариант</Typography.Text>
                <Select
                  options={Object.entries(variants ?? {}).flatMap(([year, yearVariants]) =>
                    yearVariants.map((v) => ({
                      label: `${year} - Вариант ${v.variant}${v.passed ? ' (пройден)' : ''}`,
                      value: `${year}-${v.variant}`,
                    }))
                  )}
                  onChange={onChangeVariant}
                  value={currentVariant}
                  disabled={!grade}
                  loading={isLoadingVariants}
                  placeholder="Выберете вариант"
                  className="w-96 max-w-full"
                />
              </div>

              <Button
                onClick={onStartQuiz}
                className="mt-2 w-96 max-w-full"
                disabled={Boolean(!grade || !currentVariant)}
              >
                Начать
              </Button>
            </div>
          </>
        )}
      </PageWrapper>
    </section>
  )
}
