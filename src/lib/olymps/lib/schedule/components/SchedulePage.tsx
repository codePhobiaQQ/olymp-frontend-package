import { Container } from '@app/components/layouts/container'
import cls from './SchedulePage.module.scss'
import { PageTitle } from '@shared/components/page-title'
import cn from 'classnames'
import { PageWrapper } from '@shared/components/page-wrapper'
import { useGetOlympsSchedule } from './../../../model/api'
import { Spin, Typography } from 'antd'
import { useEffect, useRef } from 'react'
import { animation } from '@shared/lib/animations'

const disciplineNames: Record<string, string> = {
  informatic: 'Информатика',
  social_studies: 'Обществознание',
  information_security: 'Информационная безопасность',
  history: 'История',
  foreign_language: 'Иностранный язык',
  cryptography: 'Криптография',
  physics: 'Физика',
  mathematics: 'Математика',
}

const parseDateString = (dateStr?: string): Date | null => {
  if (!dateStr) return null;
  const parts = dateStr.split('.');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  return new Date(year, month - 1, day);
};

const formatDateRange = (start?: string, finish?: string): string => {
  const startDate = parseDateString(start);
  const endDate = parseDateString(finish);
  if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '—';
  const from = startDate.toLocaleDateString('ru-RU');
  const to = endDate.toLocaleDateString('ru-RU');
  return from === to ? from : `с ${from} по ${to}`;
};

const SchedulePage = () => {
  const { data, isLoading } = useGetOlympsSchedule()

  // ---- Animation ----

  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    if (isLoading || !tableRef.current) {
      return
    }
    animation.text.fadeIn(tableRef.current.querySelectorAll('th'), {
      stagger: 0.15,
    })
    animation.text.fadeIn(tableRef.current!.querySelectorAll('td span'), {
      stagger: 0.05,
      delay: 0.3
    })
  }, [isLoading])

  // -------------------

  return (
    <PageWrapper id="schedule" className="section-padding-first bg-section1">
      <Container>
        <PageTitle text="Расписание олимпиад" />

        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <table ref={tableRef} className={cn('mt-16', cls.ScheduleTable)}>
            <thead>
              <tr>
                <th>
                  <Typography.Title level={5} className="whitespace-nowrap">
                    Олимпиада
                  </Typography.Title>
                </th>
                <th>
                  <Typography.Title level={5} className="whitespace-nowrap">
                    Отборочный этап
                  </Typography.Title>
                </th>
                <th>
                  <Typography.Title level={5} className="whitespace-nowrap">
                    Заключительный этап
                  </Typography.Title>
                </th>
              </tr>
            </thead>

            <tbody>
              {data &&
                Object.entries(data).map(([key, schedule]) => (
                  <tr key={key}>
                    <td>
                      <Typography.Text className="whitespace-nowrap">
                        {disciplineNames[key] ?? key}
                      </Typography.Text>
                    </td>
                    <td>
                      <Typography.Text className="whitespace-nowrap">
                        {formatDateRange(
                          schedule.qualifying_stage_start,
                          schedule.qualifying_stage_finish
                        )}
                      </Typography.Text>
                    </td>
                    <td>
                      <Typography.Text className="whitespace-nowrap">
                        {formatDateRange(
                          schedule.final_stage_registration_start,
                          schedule.final_stage_registration_finish
                        )}
                      </Typography.Text>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </Container>
    </PageWrapper>
  )
}

export default SchedulePage
