import { Form, Select, SelectProps, Typography } from 'antd'
import { useLocation } from 'react-router-dom'
import { useGetOlympOrganizations, useRegFinal } from './../../model/services'
import { useMemo } from 'react'
import { Button } from '@shared/components/button'
import cn from 'classnames'

export const RegistrationFinalPage = () => {
  const location = useLocation()
  const olymp_slug = location.pathname.split('/').pop()

  const { data: organisations, isLoading: organisationsLoading } = useGetOlympOrganizations({
    // TODO: check types here
    olymp_slug: olymp_slug!,
  })

  const registrationHandler = async (fieldsValue: any) => {
    console.log({ olymp_slug, organization_id: fieldsValue?.['organization_id'] })

    if (!olymp_slug) {
      return
    }

    await regFinal({ olymp_slug, organization_id: fieldsValue?.['organization_id'] }).then(
      (res) => {
        console.log(res)
      }
    )
  }
  const [regFinal] = useRegFinal()

  const organisationsList: SelectProps['options'] = useMemo(() => {
    return organisations?.map((org) => ({
      label: org?.['title'],
      value: org?.['id'],
    }))
  }, [organisations])

  return (
    <div className="flex flex-col gap-5">
      <Typography.Title level={3}>
        {`Регистрация на зключительный этап олимпиады ${''}`}
      </Typography.Title>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={registrationHandler}
        autoComplete="off"
        className={cn('relative w-full')}
      >
        <Form.Item name="organization_id">
          <Select
            loading={organisationsLoading}
            placeholder="Организации проведения"
            options={organisationsList}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
