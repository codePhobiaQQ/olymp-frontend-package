import { Container } from '@/app/components/layouts/container'
import cls from './About.module.scss'
import { Typography } from 'antd'
import cn from 'classnames'
import { MainPageData } from '@lib/main/model/types'
import { useEffect, useRef } from 'react'
import { animation } from '@shared/lib/animations'
import { HtmlParse } from '@shared/lib/html-parse'

export const AboutScreen = ({ data }: { data?: MainPageData['advantages'] }) => {
  // -------------
  // Animation
  // -------------
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    // Section Title
    // animation.text.fadeIn(containerRef.current.querySelector('.section-title'), {
    //   scrollTrigger: {
    //     start: 'top 80%',
    //   },
    // })

    // Cards Animation
    animation.geometry.fadeIn(containerRef.current.querySelectorAll('.advantage-card'), {
      scrollTrigger: {
        start: 'top 65%',
      },
      onEachElement: (el: HTMLElement) => {
        animation.numbers.increase(el.querySelector('.numb'), {
          delay: 0.3,
        })
        animation.text.fadeIn(el.querySelector('.description'), { delay: 0.6 })
      },
    })
  }, [])
  // ---------------------

  // const buttonHandler = () => {
  //   const target = document.getElementById('winners-screen')
  //   if (target) {
  //     target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  //   }
  // }

  let content

  if (data?.sectionTitle && data?.advantages?.length) {
    content = (
      <>
        <Typography.Title className="gradient-text section-title text-center" level={2}>
          О портале
        </Typography.Title>

        {/* TODO: move content html to wordpress */}
        {/* <HtmlParse stringifyHTML={data?.sectionTitle} /> */}
        <div style={{ maxWidth: '800px' }} className="mt-10 flex flex-col gap-5">
          <p className="text-center text-lg md:text-xl font-normal">
            Современное интернет пространство изобилует предложениями с бесплатными курсами,
            олимпиадами и конкурсами, не имеющими реальной ценности для абитуриентов при
            поступлении.
          </p>

          <p className="text-center text-lg md:text-xl font-normal">
            Данную проблему выбора помогает решать портал v-olymp.ru, на котором вы найдете:
          </p>
        </div>
        {/* ----------------------------------- */}

        {/* ----------------------------------- */}
        {/* TODO: add card tags from the server */}
        <div className="relative z-10 mt-20 flex w-full flex-wrap items-stretch justify-between gap-16 md:gap-10">
          {data.advantages?.map((adv, index) => {
            return (
              <div key={index} className="advantage-card flex items-center min-w-80 flex-1 flex-col">
                {/* Tag */}
                <span className="px-4 flex items-center justify-center rounded-lg bg-accentBlue text-secondary">
                  архив задач
                </span>

                {/* Title */}
                <Typography.Title
                  level={5}
                  className="mt-8 numb text-center text-3xl font-semibold italic text-primary md:text-4xl"
                >
                  {adv.title} + Заданий
                </Typography.Title>

                {/* Description */}
                <Typography.Paragraph className="description font-normal text-base text-center mt-4">
                  <HtmlParse stringifyHTML={adv.description} />
                </Typography.Paragraph>
              </div>
            )
          })}
        </div>
      </>
    )
  }

  return (
    <section
      ref={containerRef}
      id="about"
      className={cn('about-screen relative', cls.About, 'section-padding')}
    >
      <Container style={{ zIndex: 2 }} containerInnerClassname="flex flex-col items-center">
        {content}
      </Container>
    </section>
  )
}
