import { Container } from '@/app/components/layouts/container'
import { Form, Input, Radio, Typography } from 'antd'
import { useSubscribeNews } from './../model/api'
import { success, warning } from '@app/lib/notification'
import { Button } from '@shared/components/button'

export const Subscribe = () => {
  const [form] = Form.useForm()
  const [subscribe] = useSubscribeNews()

  const subscribeHandler = (values: { email?: string; category?: string }) => {
    if (!values?.email) {
      warning({ text: 'Некорректный e-mail' })
      return
    }
    if (!values?.category) {
      warning({ text: 'Не выбрана категория' })
      return
    }
    subscribe({
      email: values?.email,
      category: values?.category,
    }).then((res) => {
      console.log(res)
      success({ text: 'Подписка успешно оформлена!' })
    })
  }

  return (
    <section id="subscribe" className="section-padding">
      <Container>
        <Form
          onFinish={subscribeHandler}
          form={form}
          rootClassName="p-8 rounded-xl border border-accentPurple"
        >
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="order-2 flex flex-col gap-6 md:order-1">
              <Typography.Paragraph className="max-w-96 text-xl md:text-2xl">
                Подпишитесь на рассылку о новостях и событиях портала{' '}
                <span className="whitespace-nowrap">v-olymp.ru</span>
              </Typography.Paragraph>

              <Form.Item name="email">
                <Input.Search
                  placeholder="student@mail.ru"
                  enterButton={
                    <Button type="primary">
                      Подписаться
                    </Button>
                  }
                  onSearch={() => form.submit()}
                />
              </Form.Item>

              <Typography.Text className="max-w-screen-sm text-xs font-light">
                Нажимая подписаться вы принимаете условия Пользовательского соглашения и Политики
                конфиденциальности
              </Typography.Text>
            </div>

            <Form.Item name="category">
              <Radio.Group rootClassName="order-1 md:order-2">
                <div className="flex flex-col gap-4">
                  <Radio className="square-radio" value={1}>
                    Все новости
                  </Radio>
                  <Radio className="square-radio" value={2}>
                    Криптография
                  </Radio>
                  <Radio className="square-radio" value={3}>
                    Информатика и компьютерная безопасность
                  </Radio>
                  <Radio className="square-radio" value={4}>
                    Физика
                  </Radio>
                  <Radio className="square-radio" value={5}>
                    Математика
                  </Radio>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
        </Form>
      </Container>
    </section>
  )
}
