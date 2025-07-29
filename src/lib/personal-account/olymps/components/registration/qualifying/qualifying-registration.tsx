import { Checkbox, Form, Select, Skeleton, Typography } from 'antd'
import cn from 'classnames'
import cls from '@lib/personal-account/profile/components/ProfilePage.module.scss'
import { Button } from '@shared/components/button'
import { useLocation } from 'react-router-dom'
import { useGetOlympDetails } from '@lib/olymps'
import {
  useGetOlympAvailableClasses,
  useRegisterQualifying,
} from './../../../model/provider/qualifying-api'
import { error, success } from '@app/lib/notification'
import { detectErrorMessage } from '@shared/utils/error'
import { PageTitle } from './../../../../shared/components/page-title'
import { PageDescription } from './../../../../shared/components/page-description'

export const QualifyingRegistration = ({ refetch }: { refetch: () => void }) => {
  const location = useLocation()
  const slug = location.pathname.split('/').pop()

  const { data: olympDetails, isLoading } = useGetOlympDetails(slug!, { skip: !slug })
  const { data: availableClasses, isLoading: availableClassesLoading } =
    useGetOlympAvailableClasses(slug!, { skip: !slug })

  const [registerQualifying] = useRegisterQualifying()

  const registrationHandler = (values: any) => {
    if (!slug) {
      return
    }
    console.log('values', values)

    registerQualifying({
      slug,
      agreeRules: values.agreeRules,
      grade: values.grade,
      processPD: values.processPD,
    })
      .then((res) => {
        console.log(res)
        if (res?.error) {
          return error({ text: detectErrorMessage(res?.error) })
        }
        return success({ text: 'Вы успешно зарегистрировались на отборочный этап олимпиады!' })
      })
      .finally(() => {
        refetch()
      })
  }

  const checkboxValidator = (_: any, value: boolean) => {
    return value ? Promise.resolve() : Promise.reject(new Error('Необходимо принять условия'))
  }

  if (isLoading || availableClassesLoading) {
    return <Skeleton />
  }

  return (
    <section id="qualifying-registration" className="flex flex-col">
      <PageTitle title="Регистрация на отборочный этап" />
      <PageDescription text="В данном разделе Вы можете зарегистрироваться на отборочный этап олимпиады. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error libero, quis repellat ullam voluptas voluptatibus." />

      <Typography.Title level={4}>Олимпиада: {olympDetails?.name}</Typography.Title>
      <Typography.Text className="mt-4 max-w-screen-sm text-lg">
        {olympDetails?.description}
      </Typography.Text>

      <Form
        onFinish={registrationHandler}
        className={cn('mt-8 flex max-w-96 flex-col gap-6', cls.ProfileForm)}
        layout="vertical"
      >
        <Form.Item
          rules={[{ required: true }]}
          name="grade"
          label="Класс за который будет писаться олимпиада:"
        >
          <Select options={availableClasses} placeholder="Выберете класс" />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          rules={[{ validator: checkboxValidator }]}
          name="agreeRules"
        >
          <Checkbox>Политикой конфиденциальности</Checkbox>
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          rules={[{ validator: checkboxValidator }]}
          name="processPD"
        >
          <Checkbox>Обработка персональных данных</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Зарегистрироваться</Button>
        </Form.Item>
      </Form>
    </section>
  )
}
