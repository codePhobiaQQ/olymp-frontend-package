import { Typography } from 'antd'
import { Data } from './../../components/messenger/create-issue'

export const ChosenDataInfo = ({ data, title }: { data: Data; title?: string }) => {
  return (
    <div className="flex flex-col gap-2">
      {title && <Typography.Text className="mb-2 text-lg font-medium">{title}</Typography.Text>}
      <Typography.Text className="text-lg font-medium text-gray-500">
        Данные обращения:
      </Typography.Text>
      {data?.generalCategory?.value?.label && (
        <Typography.Text>
          <span className="text-gray-500">Предмет:</span> {data?.generalCategory?.value?.label}
        </Typography.Text>
      )}
      {data?.category?.value?.label && (
        <Typography.Text>
          <span className="text-gray-500">Категория:</span> {data?.category?.value?.label}
        </Typography.Text>
      )}
      {data?.title?.value && (
        <Typography.Text>
          <span className="text-gray-500">Заголовок:</span> {data?.title?.value}
        </Typography.Text>
      )}
      {data?.description?.value && (
        <Typography.Text>
          <span className="text-gray-500">Описание:</span> {data?.description?.value}
        </Typography.Text>
      )}
    </div>
  )
}
