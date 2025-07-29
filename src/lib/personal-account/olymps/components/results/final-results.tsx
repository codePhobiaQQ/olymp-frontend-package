import { PageTitle } from './../../../shared/components/page-title'
import { PageWrapper } from '@shared/components/page-wrapper'
import { PageDescription } from './../../../shared/components/page-description'
import { PageSubmenu } from './../../../shared/components/page-submenu'
import { getFinalStageResultsRoute, getFinalStageRoute } from '@app/lib/route'
import { Skeleton, Table } from 'antd'
import { useGetQualResults } from './../../model/provider/qualifying-api'
import { columns, DataType } from './shared/results-table'

export const FinalResults = () => {
  const { data, isLoading } = useGetQualResults()
  console.log('data', data)

  let content
  if (isLoading) {
    content = <Skeleton />
  } else {
    content = <Table<DataType> columns={columns} dataSource={data} />
  }

  return (
    <section id="final-stages-list">
      <PageWrapper>
        <PageTitle title="Результаты заключительных этапов" />
        <PageDescription text="В данном разделе Вы можете посмотреть результаты заключительных этапов и перейти для детального ознакомления" />
        <PageSubmenu
          activeKey="results"
          items={[
            {
              key: 'list',
              label: 'Заключительные этапы',
              path: getFinalStageRoute(),
            },
            {
              key: 'results',
              label: ' Результаты',
              path: getFinalStageResultsRoute(),
            },
          ]}
        />
        {content}
      </PageWrapper>
    </section>
  )
}
