import { ChangeEvent, useState } from 'react'
import { Button, Input, Spin, Typography } from 'antd'
import { dataProvider } from '@shared/lib/data-provider'
import { warning } from '@app/lib/notification'

export const OGRNSearch = () => {
  const [ogrnValue, setOGRNValue] = useState<string>()
  const [schoolValue, setSchoolValue] = useState<{ value: string; data: unknown } | undefined>()
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const onChangeOrganizationHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setOGRNValue(e.target.value)
  }

  const searchSchool = async () => {
    if (!ogrnValue) {
      warning({ text: 'Пожалуйста, введите ОГРН' })
      return
    }
    setIsFetching(true)
    await dataProvider
      .getOrganisationByOGRN(ogrnValue)
      .then((res) => {
        console.log(res)
        setSchoolValue({ data: res.data, value: res.value })
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Input
          onChange={onChangeOrganizationHandler}
          value={ogrnValue}
          placeholder="Введите ОГРН организации"
        />
        <Button onClick={searchSchool}>Найти</Button>
      </div>

      <div className="flex flex-col justify-start gap-2">
        <Typography.Text className="text-lg">Результат поиска:</Typography.Text>
        {isFetching && <Spin className="mr-auto" />}
        {schoolValue && (
          <Typography.Text className="text-gray-500">{schoolValue.value}</Typography.Text>
        )}
      </div>
    </div>
  )
}
