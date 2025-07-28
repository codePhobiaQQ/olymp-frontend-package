import { Container } from '@app/components/layouts/Container'
import cls from './SchedulePage.module.scss'
import { PageTitle } from '@shared/components/page-title'
import cn from 'classnames'
import { PageWrapper } from '@shared/components/page-wrapper'

const SchedulePage = () => {
  return (
    <PageWrapper id="schedule" className="section-padding bg-section1">
      <Container>
        <PageTitle text="Расписание олимпиад" />

        <table className={cn('mt-16', cls.ScheduleTable)}>
          <thead>
            <tr>
              <th>Олимпиада</th>
              <th>Отборочный этап</th>
              <th>Заключительный этап</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Криптография</td>
              <td>с 01 по 20 ноября 2022 г.</td>
              <td>27 ноября 2022 г.</td>
            </tr>
            <tr>
              <td>Криптография</td>
              <td>с 01 по 20 ноября 2022 г.</td>
              <td>27 ноября 2022 г.</td>
            </tr>
            <tr>
              <td>Криптография</td>
              <td>с 01 по 20 ноября 2022 г.</td>
              <td>27 ноября 2022 г.</td>
            </tr>
            <tr>
              <td>Криптография</td>
              <td>с 01 по 20 ноября 2022 г.</td>
              <td>27 ноября 2022 г.</td>
            </tr>
            <tr>
              <td>Криптография</td>
              <td>с 01 по 20 ноября 2022 г.</td>
              <td>27 ноября 2022 г.</td>
            </tr>
            <tr>
              <td>Криптография</td>
              <td>с 01 по 20 ноября 2022 г.</td>
              <td>27 ноября 2022 г.</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </PageWrapper>
  )
}

export default SchedulePage
