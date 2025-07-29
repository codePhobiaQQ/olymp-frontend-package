import { ReactNode } from 'react'
import { TableProps } from 'antd'
import { Link } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'

export interface DataType {
  key: string
  name: string
  result: ReactNode
  path: string
  date: string
}

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Олимпиада',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Год прохождения',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Результат',
    dataIndex: 'result',
    key: 'result',
  },
  {
    title: 'Ответы',
    dataIndex: 'path',
    key: 'path',
    render: (path) => (
      <Link to={path}>
        <SearchOutlined />
        </Link>
    ),
  },
]