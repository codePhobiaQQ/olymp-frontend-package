import { Container } from '@app/components/layouts/Container'
import { Form, Input, Radio, RadioChangeEvent, Typography } from 'antd'
import { useState } from 'react'

export const Subscribe = () => {
  const [value, setValue] = useState(1)

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <section id="subscribe" className="section-padding bg-section2">
      <Container>
        <Form rootClassName="p-8 rounded-xl border border-accentPurple">
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="order-2 flex flex-col gap-6 md:order-1">
              <Typography.Text className="max-w-80 text-2xl">
                Подпишитесь на рассылку о новостях и событиях портала v-olymp.ru
              </Typography.Text>
              <Form.Item>
                <Input.Search size="middle" placeholder="Ваш E-mail" enterButton="Подписаться" />
              </Form.Item>
              <Typography.Text className="max-w-screen-sm text-xs font-light">
                Нажимая подписаться вы принимаете условия Пользовательского соглашения и Политики
                конфиденциальности
              </Typography.Text>
            </div>

            <Radio.Group rootClassName="order-1 md:order-2" onChange={onChange} value={value}>
              <div className="flex flex-col gap-4">
                <Radio value={1}>Все новости</Radio>
                <Radio value={2}>Криптография</Radio>
                <Radio value={3}>Информатика и компьютерная безопасность</Radio>
                <Radio value={4}>Физика</Radio>
                <Radio value={5}>Математика</Radio>
              </div>
            </Radio.Group>
          </div>
        </Form>
      </Container>
    </section>
  )
}
