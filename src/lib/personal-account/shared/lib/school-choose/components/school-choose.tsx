import { Tabs, TabsProps } from 'antd'
import { NameSearch } from './name-search.tsx'
import { OGRNSearch } from './ogrn-search.tsx'

const items: TabsProps['items'] = [
  { key: 'name', label: 'Название', children: <NameSearch /> },
  { key: 'ogrn', label: 'ОГРН', children: <OGRNSearch /> },
]

export const SchoolChoose = () => {
  return <Tabs destroyInactiveTabPane={true} items={items} defaultActiveKey="name" />
}
