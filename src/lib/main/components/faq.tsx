import { Container } from '@app/components/layouts/container'
import { Collapse, CollapseProps, ConfigProvider, Typography } from 'antd'
import ArrowSvg from '/public/svg/decore/arrow.svg?react'
import cn from 'classnames'
import { MainPageData } from '@lib/main/model/types.ts'
import parse from 'html-react-parser'
import { useEffect, useRef } from 'react'
import { animation } from '@shared/lib/animations'
import { getParent } from '@shared/utils/html.ts'
import { Segment } from '@shared/components/segment/segment.tsx'

const ExpandIcon: CollapseProps['expandIcon'] = (props) => {
  return (
    <ArrowSvg className={cn('-mb-10 h-5 w-5 fill-primary', { ['rotate-180']: props.isActive })} />
  )
}

export const Faq = ({ data }: { data?: MainPageData['faq'] }) => {
  // ---- Animation ----

  const containerRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (!data?.items?.length || !containerRef.current) {
      return
    }

    animation.geometry.fadeFromRight(containerRef.current?.querySelectorAll('.content-name'), {
      onEachElement: (el: HTMLElement) => {
        animation.text.fadeIn(el?.parentElement?.querySelector('.faq-label'), {
          delay: 0.25,
        })
        animation.geometry.fadeFromRight(
          getParent(el, 3)?.querySelector('.ant-collapse-expand-icon'),
          {
            delay: 0.5,
          }
        )
      },
    })
  }, [data?.items])

  // --------------------

  let items: CollapseProps['items'] = []
  if (data?.items?.length) {
    items = data.items.map(({ title, text }, index) => {
      return {
        key: index.toString(),
        headerClass: 'p-0',
        style:
          data.items.length === index + 1 ? { borderBottom: '2px solid', borderRadius: 0 } : {},
        className: cn('border-t-2 border-primaryGray border-b-primaryGray pb-8'),
        label: <FaqHeader label={title} index={index + 1} />,
        children: <FaqContent text={text} />,
      }
    })
  }

  return (
    <section ref={containerRef} id="faq" className="bg-section1 pb-12 pt-12">
      <Container containerInnerClassname="flex flex-col gap-16">
        <Typography.Title
          rootClassName="font-medium gradient-text text-center section-title"
          level={2}
        >
          {parse(data?.sectionTitle || '')}
        </Typography.Title>

        <div className="flex justify-center">
          <Segment options={[
            { label: 'Участникам олимпиады', value: 'participants' },
            { label: 'Учителям', value: 'teachers' },
            { label: 'Организаторам и партнерам', value: 'partners' },
          ]} />
        </div>

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
    <div className="faq-header relative flex w-full items-start justify-between pb-3 pt-5">

      <div className="content-name">
        <Typography.Text rootClassName="font-medium text-lg">0{index}</Typography.Text>
      </div>

      <div className="flex-1">
        <Typography.Text rootClassName="faq-label font-medium text-lg">
          {parse(label)}
        </Typography.Text>
      </div>
    </div>
  )
}

const FaqContent = ({ text }: { text: string }) => {
  return (
    <div className="faq-content flex w-full items-start justify-between pt-3">
      <div className="content-name" />
      <div className="flex-1 pr-10">
        <Typography.Text rootClassName="font-light text-lg">{parse(text)}</Typography.Text>
      </div>
    </div>
  )
}
