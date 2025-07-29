import { Spin, Typography } from 'antd'
import { useGetFinalStageApplication } from './../../../model/provider/final-api'
import { getCurrentAcademicYear } from '@shared/utils/olymps'
import { Button } from '@shared/components/button'
import { PrinterOutlined, SearchOutlined } from '@ant-design/icons'
import cn from 'classnames'

export const FinalGeneralInfo = ({ rootClassName }: { rootClassName?: string }) => {
  const slug = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]

  // TODO: fix on backend (incorrect application data)
  const { data, isLoading } = useGetFinalStageApplication(
    {
      slug,
      year: '[' + getCurrentAcademicYear() + ']',
    },
    { skip: !slug }
  )

  console.log('data', data)

  return (
    <div className={cn('flex flex-col gap-4', rootClassName)}>
      <Typography.Title level={4} className="w-full">
        Информация
      </Typography.Title>

      {isLoading ? (
        <div className="flex min-h-20 flex-col items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <InfoField label="Название олимпиады" value={data?.city} />
          <InfoField label="Адрес проведения" value={data?.city} />
          <InfoField label="Дата олимпиады" value={data?.city} />
          <InfoField label="Длительность олимпиады" value={data?.city} />
          <InfoField label="Класс учасития" value={data?.city} />

          <div className="flex flex-wrap items-center gap-2">
            <div>
              <Button icon={<SearchOutlined />}>Показать на карте</Button>
            </div>
            <div>
              <Button icon={<PrinterOutlined />}>Распечатать памятку</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const InfoField = ({ label, value }: { label: string; value?: string }) => {
  return (
    <Typography.Paragraph className="flex items-center gap-1">
      <Typography.Text className="text-lg">{label}:</Typography.Text>
      <Typography.Text className="text-lg text-gray-500">{value}</Typography.Text>
    </Typography.Paragraph>
  )
}
