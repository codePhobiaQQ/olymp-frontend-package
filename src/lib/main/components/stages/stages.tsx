import { Container } from '@/app/components/layouts/container'
import { MainPageData } from '@lib/main/model/types'
import parse from 'html-react-parser'
import { useEffect, useRef, useState } from 'react'
import { Circles } from './circles'
import { animation } from '@shared/lib/animations'
import { CustomSteps } from './custom-steps'

export const Stages = ({ data }: { data?: MainPageData['stages'] }) => {
  const [current] = useState(0)

  // Animations
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    animation.geometry.fadeFromRight(containerRef.current.querySelector('.circles'), { delay: 0.3 })
  }, [])
  // -----------------

  return (
    <section ref={containerRef} className="stages-screen section-padding bg-[#E4E6EE]">
      <Container containerInnerClassname="flex flex-col gap-8">
        <div className="flex flex-col gap-6 justify-between lg:flex-row">
          <div style={{ maxWidth: '600px' }} className="mr-auto w-full">
            {/*
            ------- FROM WP-ADMIN ------
            <p class="text-2xl leading-1.3 font-medium text-[#0D062B99] md:text-3xl">Наша платформа предоставляет возможности для <span class="text-accentBlue">ознакомления с механизмом участия</span> в олимпиадах благодаря разделению процесса <br /> <span class="text-accentBlue">на 3 этапа</span>:</p>
            */}
            {data?.sectionTitle && parse(data?.sectionTitle)}
          </div>

          <Circles className="circles" />
        </div>

        <CustomSteps className="mt-32" active={current} />
      </Container>
    </section>
  )
}
