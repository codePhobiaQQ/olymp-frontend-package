import { PageTitle } from './../../../shared/components/page-title'
import { PageWrapper } from '@shared/components/page-wrapper'
import { PageDescription } from './../../../shared/components/page-description'
import { PageSubmenu } from './../../../shared/components/page-submenu'
import { getQualifyingResultsRoute, getQualifyingRoute } from '@app/lib/route'
import { Skeleton, Table } from 'antd'
import { useGetQualResults } from './../../model/provider/qualifying-api'
import { columns, DataType } from './shared/results-table'

export const QualifyingResult = () => {
  const { data, isLoading } = useGetQualResults()
  console.log('data', data)

  let content
  if (isLoading) {
    content = <Skeleton />
  } else {
    content = <Table<DataType> columns={columns} dataSource={data} />
  }

  return (
    <section id="qualifyign-stages-list">
      <PageWrapper>
        <PageTitle title="Результаты отборочных этапов" />
        <PageDescription text="В данном разделе Вы можете посмотреть результаты отборочных и перейти для детального ознакомления" />
        <PageSubmenu
          activeKey="results"
          items={[
            {
              key: 'list',
              label: 'Отборочные этапы',
              path: getQualifyingRoute(),
            },
            {
              key: 'results',
              label: ' Результаты',
              path: getQualifyingResultsRoute(),
            },
          ]}
        />
        {content}
      </PageWrapper>
    </section>
  )
}
