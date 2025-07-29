import { DatePicker, Form, Typography, Input, Select, Checkbox, Skeleton } from 'antd'
import InputMask from 'react-input-mask'
import cn from 'classnames'
import cls from './../../../../profile/components/ProfilePage.module.scss'
import { dateFormat } from './../../../../profile/model/const'
import {
  classOptions,
  ClassSpecialization,
  classSpecializationOptions,
  ClassValue,
  LearnAbout,
  learnAboutOlympOptions,
} from '@shared/consts/user'
import { SchoolChoose } from '@lib/personal-account/shared/lib/school-choose'
import { Button } from '@shared/components/button'
import dayjs, { Dayjs } from 'dayjs'
import { generateBlank, generateClean, generateDraft } from '@shared/lib/doc-generator'
import { useRef } from 'react'
import { useGetMetadata } from '@lib/personal-account/profile/model/api'
import { GradeChoose } from '@lib/personal-account/shared/components/grade-choose.tsx'
import { useSetPrintDocumentsRequest } from '../../../model/provider/final-api'
import { error, success } from '../../../../../../app/lib/notification'

type BlankData = {
  first_name: string
  second_name: string
  patronymic: string
  grade: ClassValue
  birth_date?: Dayjs
  'class-specialization': ClassSpecialization
  'learn-about-olymp': LearnAbout
  email: string
  phone: string
  'prev-olymp-passed': boolean
  'is-winner': boolean
  snils: string
  passport: string
  'data-checked': boolean
  school: string
}

// const initialValues: BlankData = {
//   'data-checked': true,
//   'is-winner': false,
//   'prev-olymp-passed': false,
//   passport: '5423 452525',
//   snils: '345-345-345 25',
//   name: 'Сергей',
//   surname: 'Оргкомитет',
//   patronymic: 'Юрьевич',
//   grade: '10',
//   birth_date: dayjs('2018-08-08'),
//   'class-specialization': 'Гуманитарный',
//   'learn-about-olymp': 'Рассказали в школе',
//   email: 'vital.pereg@mail.ru',
//   phone: '+79774254349',
//   school: 'ГБОУ Школа 2007',
// }

type ActionType = 'print-list' | 'print-draft' | 'print-blank' | 'set-print-documents-request'

export const BlanksActions = ({ rootClassName }: { rootClassName?: string, slug: string }) => {
  const actionRef = useRef<ActionType>()
  const { isLoading: isFetchingMetadata, data: initValues } = useGetMetadata()
  const [setPrintDocumentsRequest] = useSetPrintDocumentsRequest()
  const [form] = Form.useForm<BlankData>()

  // -------- Print Documents Handlers -------
  const setAction = (action: ActionType) => () => {
    actionRef.current = action
  }

  //
  const finishHandler = async (values: BlankData) => {
    const normalizedValue = {
      ...values,
      birth_date: dayjs(values?.['birth_date']).format(dateFormat),
    }
    console.log(normalizedValue)

    try {
      if (actionRef.current === 'print-list') {
        generateClean()
      } else if (actionRef.current === 'print-draft') {
        generateDraft().then((res) => {
          console.log(res)
        })
      } else if (actionRef.current === 'print-blank') {
        generateBlank({
          name: values.first_name,
          lastName: values.patronymic,
          secondName: values.second_name,
          passport: values.passport,
          birth_date: dayjs(values?.['birth_date']).format(dateFormat),
          snils: values.snils,
          phone: values.phone,
          email: values.email,
          school: values.school,
          classSpecific: values?.['class-specialization'],
        }).then((res) => {
          console.log(res)
        })
      } else if (actionRef.current === 'set-print-documents-request') {
        const { error: e } = await setPrintDocumentsRequest({ slug: '', value: false })

        if (e) {
          error({ text: 'Ошибка во время запроса на печать пакета документов' })
          console.log(e)
          return
        }

        success({ text: 'Запрос на печать пакета документов успешно отправлен' })
      }
    } catch (e) {
      console.log(e)
    }
  }

  if (isFetchingMetadata) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  }

  return (
    <Form
      initialValues={initValues}
      form={form}
      onFinish={finishHandler}
      className="flex flex-wrap gap-4"
      rootClassName={cn(rootClassName)}
      layout="vertical"
    >
      <Typography.Title level={4} className="w-full">
        Анкета
      </Typography.Title>

      <Form.Item
        className="w-full md:w-2/5"
        label="Фамилия:"
        name="second_name"
        rules={[{ required: true, message: 'Введите фамилию' }]}
      >
        <Input placeholder="Иванов" />
      </Form.Item>

      <Form.Item
        className="w-full md:w-2/5"
        label="Имя:"
        name="first_name"
        rules={[{ required: true, message: 'Введите имя' }]}
      >
        <Input placeholder="Иван" />
      </Form.Item>

      <Form.Item
        className="w-full md:w-2/5"
        label="Отчество:"
        name="patronymic"
        rules={[{ required: true, message: 'Введите отчество' }]}
      >
        <Input placeholder="Иванович" />
      </Form.Item>

      <Form.Item
        className={cn(cls.BirtDate, 'w-full md:w-2/5')}
        name="birth_date"
        label="Дата рождения:"
        rules={[{ required: true, message: 'Выберите дату рождения' }]}
      >
        <DatePicker format={dateFormat} placeholder="15/02/2010" />
      </Form.Item>

      <Form.Item
        className="mb-2 mt-2 w-full rounded-xl border p-4 md:w-2/5"
        name="school"
        label="Образовательная организация:"
        rules={[{ required: true, message: 'Выберите школу' }]}
      >
        <SchoolChoose />
      </Form.Item>

      <Form.Item
        className="w-full md:w-2/5"
        name="grade"
        label="Класс:"
        rules={[{ required: true, message: 'Выберите класс' }]}
      >
        <GradeChoose options={classOptions} />
      </Form.Item>

      <Form.Item
        className="w-full md:w-2/5"
        name="class-specialization"
        label="Профиль класса:"
        rules={[{ required: true, message: 'Выберите профиль класса' }]}
      >
        <Select options={classSpecializationOptions} placeholder="Выберете профиль класса" />
      </Form.Item>

      <Form.Item
        className="w-full md:w-2/5"
        name="learn-about-olymp"
        label="Откуда узнали об Олимпиаде:"
        rules={[{ required: true, message: 'Выберите вариант' }]}
      >
        <Select options={learnAboutOlympOptions} placeholder="Рассказали в школе" />
      </Form.Item>

      <Form.Item
        rules={[
          { required: true, message: 'Введите email' },
          { type: 'email', message: 'Некорректный email' },
        ]}
        className="w-full md:w-2/5"
        name="email"
        label="Email:"
      >
        <Input type="email" placeholder="example@example.com" />
      </Form.Item>

      <Form.Item
        rules={[
          { required: true, message: 'Введите номер телефона' },
        ]}
        className="w-full md:w-2/5"
        name="phone"
        label="Номер телефона:"
      >
        <InputMask mask="+7(999)-999-99-99" placeholder="+7(___)-___-__-__">
          {(inputProps) => <Input {...inputProps} />}
        </InputMask>
      </Form.Item>

      <Form.Item
        className="w-full md:w-2/5"
        name="snils"
        label="СНИЛС:"
        rules={[{ required: true, message: 'Введите СНИЛС' }]}
      >
        <InputMask mask="999-999-999 99" placeholder="123-456-789 00">
          {(inputProps) => <Input {...inputProps} />}
        </InputMask>
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: 'Введите серию и номер паспорта' }]}
        className="w-full md:w-2/5"
        name="passport"
        label="Серия и номер паспорта:"
      >
        <InputMask mask="9999 999999" placeholder="1234 567890">
          {(inputProps) => <Input {...inputProps} />}
        </InputMask>
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: 'Подтвердите проверку данных' }]}
        className="mt-4 w-full"
        name="data-checked"
        valuePropName="checked"
      >
        <Checkbox>
          Я проверил введенные данные <sup>*</sup>
        </Checkbox>
      </Form.Item>

      <div className="mt-6 flex w-full flex-wrap items-center gap-4">
        <Form.Item>
          <Button onClick={setAction('print-blank')} htmlType="submit">
            Распечатать анкету
          </Button>
        </Form.Item>

        <Form.Item>
          <Button onClick={setAction('print-list')} htmlType="submit">
            Распечатать чистовик
          </Button>
        </Form.Item>

        <Form.Item>
          <Button onClick={setAction('print-draft')} htmlType="submit">
            Распечатать черновик
          </Button>
        </Form.Item>
      </div>

      <Typography.Text className="mt-6 text-xs text-gray-500">
        Будьте внимательны! В случае изменения своего решения о месте участия в олимпиаде (даже в
        другом вузе одного города):
      </Typography.Text>

      <div className="flex w-full items-center gap-4">
        <Form.Item>
          <Button onClick={setAction('set-print-documents-request')} htmlType="submit">
            Не удалось распечатать анкету <sup>**</sup>
          </Button>
        </Form.Item>
      </div>

      <Typography.Text className="mt-10 text-xs text-gray-500">
        <sup>*</sup> Данные требуются для формирования номера и штрихкода анкеты, но при этом не
        сохраняются на сервере. Состав запрашиваемых персональных данных данных и способы их
        обработки установлены исходя из требований Российского совета олимпиад школьников к
        отчетности оргкомитетов олимпиад, включенных в Перечень Минобрнауки России.
      </Typography.Text>

      <Typography.Text className="text-xs text-gray-500">
        <sup>**</sup> Нажатием на кнопку Вы подтверждаете, что ваш родитель (законный представитель)
        ознакомлен с Порядком проведения олимпиад школьников и предоставляет организатору олимпиады
        согласие на сбор, хранения, использование, распространение (передачу) и публикацию ваших
        персональных данных, а также дает согласие на передачу ваших данных в локальные орг.
        комитеты Олимпиады
      </Typography.Text>
    </Form>
  )
}
