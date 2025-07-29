import cn from 'classnames'
import { Collapse, CollapseProps, ConfigProvider, Typography } from 'antd'
import ArrowSvg from '/public/svg/decore/arrow.svg?react'
import { GetOlympDetailsPayload } from './../../model/api'
import parse from 'html-react-parser'
import { SectionTitle } from './shared'

export const OfficialInfo = ({
  olympDetails,
}: {
  olympDetails?: GetOlympDetailsPayload['official_information']
}) => {
  return (
    <section className="section-padding flex flex-col" id="official-info">
      <SectionTitle title="Официальная информация" />

      <ConfigProvider
        theme={{
          components: {
            Collapse: {
              headerBg: '#fff',
              headerPadding: '20px 20px',
              contentPadding: '20px 20px',
            },
          },
        }}
      >
        <div className="flex w-full flex-col gap-5">
          {getCollapse('Полное название олимпиады', olympDetails?.olymp_full_name, false)}
          {getCollapse('Организаторы олимпиады', olympDetails?.olymp_organisators)}
          {getCollapse('Официальные документы', olympDetails?.olymp_organisators)}
          {getCollapse(
            'Председатель методической комиссии',
            olympDetails?.olymp_сhairman_organizing_committee
          )}
          {getCollapse('Участникам олимпиады', olympDetails?.olymp_organisators)}
        </div>
      </ConfigProvider>
    </section>
  )
}

const ExpandIcon: CollapseProps['expandIcon'] = (props) => {
  return (
    <ArrowSvg
      className={cn('h-4 w-4 fill-primary md:h-5 md:w-5', { ['rotate-180']: props.isActive })}
    />
  )
}

const getCollapse = (label: string, data?: string, parseData: boolean = true) => {
  return (
    <Collapse
      expandIconPosition="end"
      expandIcon={ExpandIcon}
      items={[
        {
          label: <Typography.Text className="text-lg">{label}</Typography.Text>,
          children: data ? (
            parseData ? (
              parse(data)
            ) : (
              <Typography.Text className="text-lg font-light">{data}</Typography.Text>
            )
          ) : (
            <Typography.Text className="text-gray-500">
              Данная информация пока не добавлена
            </Typography.Text>
          ),
        },
      ]}
    />
  )
}
