import cn from 'classnames'
import { memo, useState } from 'react'
import { Form, Select, Skeleton } from 'antd'
import { Input } from '@shared/components/input'
import { Button } from '@shared/components/button'
import { useSelector } from 'react-redux'
import { getAuthData } from '@lib/auth'
import { GradeOptions } from '../../qualifying-stage/model/utils'
import { QualifyingStageRegistrationProps as regProps } from '../../qualifying-stage/model/types'
import { useRegMetadata } from './../model/services'

interface QualifyingStageRegistrationProps {
  className?: string
}

export const UserMetadataForm = memo((props: QualifyingStageRegistrationProps) => {
  const { className } = props
  const [formData, setFormData] = useState<regProps | {}>({})

  const isApproval = useSelector(getAuthData)?.isApproval
  const { isLoading } = useRegMetadata(formData, { skip: !formData })

  const registrationHandler = (fieldsValue: regProps) => {
    setFormData(fieldsValue)
  }

  if (isLoading) {
    return <Skeleton />
  }

  return (
    <Form
      disabled={!isApproval}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      layout="vertical"
      onFinish={registrationHandler}
      autoComplete="off"
      className={cn(className, 'relative w-full')}
    >
      <Form.Item
        label="Фамилия"
        name="second_name"
        rules={[{ required: true, message: 'Необходимо ввести вашу фамилию' }]}
      >
        <Input type="string" />
      </Form.Item>

      <Form.Item
        label="Имя"
        name="first_name"
        rules={[{ required: true, message: 'Необходимо ввести ваше имя' }]}
      >
        <Input type="string" />
      </Form.Item>

      <Form.Item
        label="Отчество"
        name="patronymic"
        rules={[{ required: true, message: 'Необходимо ввести ваше отчество' }]}
      >
        <Input type="string" />
      </Form.Item>

      <Form.Item
        label="Школа"
        name="school"
        rules={[{ required: true, message: 'Необходимо выберать школу' }]}
      >
        <Select
          placeholder="Школа 2009"
          options={[
            { value: 'ГБОУ физмат школа 2007', label: 'ГБОУ физмат школа 2007' },
            { value: 'Школа 1065', label: 'Школа 1065' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Класс"
        name="grade"
        rules={[{ required: true, message: 'Необходимо выбрать ваш класс' }]}
      >
        <Select placeholder="10" options={GradeOptions} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  )
})
