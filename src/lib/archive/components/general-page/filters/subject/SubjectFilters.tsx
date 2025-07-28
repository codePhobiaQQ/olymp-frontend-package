import { ConfigProvider, Radio, Typography } from 'antd'
import cls from './SubjectFilters.module.scss'
import cn from 'classnames'
import { subjectSignal } from './../../../../model/general-page/provider'
import { changeSubjectHandler } from './../../../../model/general-page/functions'

export const SubjectFilters = () => {
  const olymps = [
    { label: ' Математика', value: 'math' },
    { label: 'Криптография', value: 'cryptography' },
    { label: 'Физика', value: 'physic' },
    { label: 'Русский язык', value: 'russian-language' },
    { label: 'Иностранный язык', value: 'foreign-language' },
    { label: 'Обществознание', value: 'obshestvo' },
  ]

  return (
    <div className="flex w-full flex-col gap-8">
      <Typography.Title rootClassName="font-medium italic">Выберите олимпиаду</Typography.Title>

      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorText: 'gray1',
            },
          },
        }}
      >
        <Radio.Group
          rootClassName={cn(cls.SubjectFilters)}
          onChange={changeSubjectHandler}
          value={subjectSignal.value}
          options={olymps}
          optionType="button"
          buttonStyle="solid"
        />
      </ConfigProvider>
    </div>
  )
}
