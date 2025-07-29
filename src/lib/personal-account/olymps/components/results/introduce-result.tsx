import { PageTitle } from './../../../shared/components/page-title'
import { PageWrapper } from '@shared/components/page-wrapper'
import { PageDescription } from './../../../shared/components/page-description'
import { PageSubmenu } from './../../../shared/components/page-submenu'
import {
  getIntroduceResultsRoute,
  getIntroduceRoute,
} from '@app/lib/route'
import { Skeleton, Table } from 'antd'
import { useGetIntroduceResults } from './../../model/provider/introduce-api'
import { columns, DataType } from './shared/results-table'

export const IntroduceResult = () => {
  const { data, isLoading } = useGetIntroduceResults(undefined, { skip: true })
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
        <PageTitle title="Результаты ознакомительный этапов" />
        <PageDescription text="В данном разделе Вы можете посмотреть результаты ознакомительных этапов и перейти для детального ознакомления" />
        <PageSubmenu
          activeKey="results"
          items={[
            {
              key: 'list',
              label: 'Ознакомительные этапы',
              path: getIntroduceRoute(),
            },
            {
              key: 'results',
              label: ' Результаты',
              path: getIntroduceResultsRoute(),
            },
          ]}
        />
        {content}
      </PageWrapper>
    </section>
  )
}
