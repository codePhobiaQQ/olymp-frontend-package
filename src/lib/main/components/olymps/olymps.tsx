import { Container } from '@app/components/layouts/container'
import { OlympData } from '@lib/olymps'
import { useEffect, useRef } from 'react'
import Logo from '/public/images/logo/logo-animal.svg?react'
import sigmaImg from '/images/decore/sigma.png'
// import { animation } from '@shared/lib/animations'
import cn from 'classnames'
import { Image, Typography } from 'antd'
import { OlympsLayout } from './olymps-layout.tsx'

export const Olymps = ({ olymps, className }: { olymps?: OlympData[]; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // ------------------
  // Animations
  // ------------------

  useEffect(() => {
    if (!olymps?.length || !containerRef.current) {
      return
    }
    // animation.geometry.fadeIn(containerRef.current.querySelectorAll('.olymp-card'), {
    //   stagger: 0.15,
    //   duration: 0.6,
    //   onEachElement: (el) => {
    //     animation.text.fadeIn(el.querySelector('.card-title'))
    //     animation.text.fadeIn(el.querySelector('.description'), { delay: 0.3 })
    //   },
    // })
  }, [olymps])

  // ------------------

  // let content = null
  // if (olymps) {
  //   content = (
  //     <>
  //       {olymps?.map((olymp) => {
  //         return (
  //           <Card
  //             className="olymp-card"
  //             path={'/olymp/' + olymp.slug}
  //             key={olymp.ID + olymp.name}
  //             title={olymp.name}
  //             description={olymp?.description}
  //           />
  //         )
  //       })}
  //     </>
  //   )
  // }

  // TODO: make data dynamic
  return (
    <section
      className={cn('main-screen section-padding-first relative', className)}
      ref={containerRef}
    >
      <Container>
        <div className="relative mb-36 flex w-full justify-center lg:mb-28">
          <Logo
            style={{ zIndex: 1 }}
            className="absolute bottom-0 left-0 h-32 w-32 translate-y-[100%] -rotate-[15deg] lg:bottom-auto lg:h-40 lg:w-40 lg:translate-y-0"
          />

          <Typography.Title
            style={{ maxWidth: '630px' }}
            className="gradient-text text-center text-xl font-semibold lg:text-2xl"
            level={2}
          >
            На платформе проведения олимпиад <span className="text-nowrap">v-olymp.ru</span> мы
            помогаем школьникам конвертировать свои знания в заслуженную награду
          </Typography.Title>

          <Image
            preview={false}
            rootClassName="w-24 h-24 lg:w-32 lg:h-32 absolute bottom-0 lg:bottom-auto right-0 translate-y-[120%] lg:translate-y-1/4"
            style={{ zIndex: 1 }}
            className="w-full rotate-[15deg]"
            src={sigmaImg}
          />
        </div>

        {/*<CardsLayout>{content}</CardsLayout>*/}

        {olymps && <OlympsLayout olympsData={olymps} />}
      </Container>
    </section>
  )
}
