import { Button } from '@shared/components/button'
import cls from './ProfilePage.module.scss'
import cn from 'classnames'
import { useGetMetadata, useSetMetadata } from './../model/api'
import { SchoolChoose } from './../../shared/lib/school-choose'
import { ProfileLoading } from './profile-loading'
import { DatePicker, Form, Input } from 'antd'
import { success, warning } from '@app/lib/notification'
import { detectErrorMessage } from '@shared/utils/error'
import { tsxMsg } from '@app/lib/messages'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { dateFormat } from './../model/const'
import { BackendMetadata } from './../model/types'
import { GradeChoose } from './../../shared/components/grade-choose'

dayjs.extend(customParseFormat)

const normalizeFormValues = (values: any): BackendMetadata => {
  return {
    first_name: values?.['first_name'],
    second_name: values?.['second_name'],
    patronymic: values?.['patronymic'],
    birth_date: dayjs(values?.['birth_date']).format(dateFormat),
    school: values?.['school'],
    grade: values?.['grade'],
  }
}

export const ChangeData = () => {
  const [setMetadata] = useSetMetadata()
  const { isLoading: isFetchingMetadata, data, refetch } = useGetMetadata()

  const saveHandler = async (values: any) => {
    const destroy = tsxMsg({ content: 'Изменение данных...' })
    let normalizeData

    try {
      normalizeData = normalizeFormValues(values)
    } catch (e) {
      warning({ text: 'Ошибка в заполнении данных' })
      return
    }

    const { error: e, data } = await setMetadata(normalizeData)

    if (e) {
      console.log(e)
      warning({ text: detectErrorMessage(e, 'Ошибка в заполнении') })
      destroy()
      return
    }

    console.log(data, 'data')
    refetch()
    success({ text: data?.message })
  }

  if (isFetchingMetadata) {
    return <ProfileLoading />
  }

  return (
    <Form
      initialValues={data}
      onFinish={saveHandler}
      className={cn('flex flex-col gap-6', cls.ProfileForm)}
      layout="vertical"
    >
      <Form.Item name="email" label="E-mail:">
        <Input allowClear disabled type="email" placeholder="ivan@mail.ru" />
      </Form.Item>

      <Form.Item name="first_name" label="Имя:">
        <Input allowClear placeholder="Иван" />
      </Form.Item>

      <Form.Item name="second_name" label="Фамилия:">
        <Input allowClear placeholder="Иванов" />
      </Form.Item>

      <Form.Item name="patronymic" label="Отчество:">
        <Input allowClear placeholder="Иванович" />
      </Form.Item>

      <Form.Item className={cn(cls.BirtDate)} name="birth_date" label="Дата рождения:">
        <DatePicker allowClear format={dateFormat} placeholder="15/02/2010" />
      </Form.Item>

      <Form.Item name="grade" label="Класс:">
        <GradeChoose allowClear />
      </Form.Item>

      <Form.Item name="school" label="Образовательная организация:">
        <SchoolChoose />
      </Form.Item>

      <Form.Item rootClassName="mt-3">
        <Button htmlType="submit">Сохранить</Button>
      </Form.Item>
    </Form>
  )
}
