import { ConfigProvider, Radio, Skeleton } from 'antd'
import cls from './SubjectFilters.module.scss'
import cn from 'classnames'
import { subjectSignal } from '../../../../model/provider'
import { changeSubjectHandler } from '../../../../model/functions'
import { useGetArchiveSubjects } from '../../../../model/api'
import { FAVORITES_FILTER_KEY } from '../../../../model/consts'

export const SubjectFilters = () => {
  const { data: archiveSubjects, isLoading } = useGetArchiveSubjects()

  const olymps = [
    ...(archiveSubjects?.map(el => ({
      label: el.label,
      value: el.slug
    })) ?? []),
    {
      label: "Избранные",
      value: FAVORITES_FILTER_KEY
    }
  ]

  let content
  if (isLoading) {
    content = <div className="flex flex-wrap gap-4">
      {new Array(10).fill('').map((_, index) => {
        return <Skeleton.Button key={index} className="rounded-lg w-full flex-1 min-w-80 h-12 md:h-16" />
      })}
    </div>
  } else {
    content = <Radio.Group
      rootClassName={cn(cls.SubjectFilters)}
      onChange={changeSubjectHandler}
      value={subjectSignal.value}
      options={olymps}
      optionType="button"
      buttonStyle="solid"
    />
  }

  return (
    <div className="flex w-full flex-col gap-8 pt-8">
      {/*<Typography.Title level={3} rootClassName="font-normal">Выберите олимпиаду</Typography.Title>*/}

      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorText: 'gray1',
            },
          },
        }}
      >
        {content}
      </ConfigProvider>
    </div>
  )
}
