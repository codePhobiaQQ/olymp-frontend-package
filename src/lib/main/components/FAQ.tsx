import { Container } from '@app/components/layouts/Container'
import { Collapse, CollapseProps, ConfigProvider, Typography } from 'antd'
import ArrowSvg from '@public/svg/decore/arrow.svg?react'
import cn from 'classnames'

const ExpandIcon: CollapseProps['expandIcon'] = (props) => {
  return (
    <ArrowSvg className={cn('-mb-10 h-5 w-5 fill-primary', { ['rotate-180']: props.isActive })} />
  )
}

export const FAQ = () => {
  const data = new Array(5).fill('')

  const items: CollapseProps['items'] = data.map((_, index) => {
    return {
      key: index.toString(),
      headerClass: 'p-0',
      style: data.length === index + 1 ? { borderBottom: '2px solid', borderRadius: 0 } : {},
      className: cn('border-t-2 border-primaryGray border-b-primaryGray pb-8'),
      label: <FaqHeader label="Кем определяется порядок проведения олимпиад?" index={index + 1} />,
      children: (
        <FaqContent text="Порядок проведения олимпиад определяется приказом Министерства образования и науки РФ от 4 апреля 2014 года «Об утверждении порядка проведения олимпиад школьников» №267. С текстом приказа можно ознакомиться по ссылке: Приказ № 267." />
      ),
    }
  })

  return (
    <section id="faq" className="bg-section1 pb-12 pt-12">
      <Container containerInnerClassname="flex flex-col gap-16">
        <Typography.Title rootClassName="font-medium" level={2}>
          Часто задаваемые вопросы
        </Typography.Title>

        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                contentPadding: 0,
              },
            },
          }}
        >
          <Collapse
            expandIconPosition="end"
            expandIcon={ExpandIcon}
            defaultActiveKey={['1']}
            ghost
            accordion={true}
            items={items}
          />
        </ConfigProvider>
      </Container>
    </section>
  )
}

const FaqHeader = ({ label, index }: { label: string; index: number }) => {
  return (
    <div className="flex w-full items-start justify-between pb-3 pt-5">
      <div className="content-name">
        <Typography.Text rootClassName="font-medium text-lg">0{index}</Typography.Text>
      </div>

      <div className="flex-1">
        <Typography.Text rootClassName="font-medium text-lg">{label}</Typography.Text>
      </div>
    </div>
  )
}

const FaqContent = ({ text }: { text: string }) => {
  return (
    <div className="flex w-full items-start justify-between pt-3">
      <div className="content-name" />
      <div className="flex-1 pr-10">
        <Typography.Text rootClassName="font-light text-lg">{text}</Typography.Text>
      </div>
    </div>
  )
}
