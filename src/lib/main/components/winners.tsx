import { Container } from '@/app/components/layouts/container'
import { Typography } from 'antd'
import { MainPageData } from '@lib/main/model/types'
import parse from 'html-react-parser'
import { useEffect, useRef } from 'react'
import { Card } from '@shared/components/cards'
import cn from 'classnames'
import line1 from '/public/images/decore/line1.png'
import line2 from '/public/images/decore/line2.png'
import line3 from '/public/images/decore/line3.png'

// import { animation } from '@shared/lib/animations'

export const Winners = ({ data }: { data?: MainPageData['winners'] }) => {
  // ------- Animations --------
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    // animation.geometry.fadeFromLeft(containerRef.current.querySelector('.title'), {})
    //
    // animation.geometry.fadeFromRight(containerRef.current.querySelector('.description'), {})
    //
    // animation.geometry.lineFadeFromLeft(containerRef.current.querySelectorAll('.line'), {
    //   onEachElement: (el) => {
    //     animation.geometry.fadeFromLeft(el?.parentElement?.querySelector('.stage'), {
    //       delay: 0.3,
    //     })
    //     animation.text.fadeIn(el?.parentElement?.querySelector('.stage-description'), {
    //       delay: 0.6,
    //     })
    //   },
    // })
    //
    // animation.text.fadeIn(containerRef.current.querySelectorAll('.extra-info'), {})
  }, [])

  // ---------------------------

  let content

  if (data?.sectionTitle && data?.advantages?.length) {
    content = (
      <>
        <Typography.Title className="gradient-text section-title text-center" level={2}>
          {parse(data?.sectionTitle)}
        </Typography.Title>

        <Typography.Text style={{ maxWidth: '600px' }} rootClassName="description text-lg md:text-xl font-light mt-5 text-center">
          {parse(data?.description)}
        </Typography.Text>

        {/*<EqualHeight>*/}
          <ul className="flex gap-1.5 mt-16 flex-wrap">
            {data?.advantages?.map((adv, index) => {
              let bgCls = 'bg-accentGreen'
              let bgImg = line1

              if (index === 1) {
                bgCls = 'bg-accentBlue'
                bgImg = line2
              } else if (index === 2) {
                bgCls = 'bg-accentRed'
                bgImg = line3
              }

              return (
                <Card backgroundImage={bgImg} className={cn('min-w-80', bgCls)} title={'/' + adv.index} description={adv.text} key={adv.index} />
              )
            })}
          </ul>
        {/*</EqualHeight>*/}

        <Typography.Text style={{ maxWidth: '600px' }} rootClassName="text-md md:text-lg mt-10 text-center">
          * Воспользоваться льготой при поступлении в ВУЗ возможно при предоставлении абитуриентом приёмной комиссии распечатанного диплома (или, при удалённом предоставлении документов, соответствующей электронной
        </Typography.Text>

        {/* TODO: Remove extra info from blockchain */}
        {/*<div className="flex pt-10">*/}
        {/*  <div className="content-name" />*/}
        {/*  <div className="flex flex-1 flex-col gap-12 lg:pr-64">*/}
        {/*    <Typography.Text rootClassName="extra-info text-lg md:text-xl font-light">*/}
        {/*      {parse(data.extraInfo1)}*/}
        {/*    </Typography.Text>*/}
        {/*    <Typography.Text rootClassName="extra-info text-lg md:text-xl font-light">*/}
        {/*      {parse(data.extraInfo2)}*/}
        {/*    </Typography.Text>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </>
    )
  }

  return (
    <section ref={containerRef} id="winners-screen" className="section-padding">
      <Container containerInnerClassname="flex flex-col items-center">{content}</Container>
    </section>
  )
}
