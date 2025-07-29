import { Container } from '@/app/components/layouts/container'
import { Image, Input, Typography } from 'antd'
import { useEffect, useMemo, useRef, useState } from 'react'
import Slider from 'react-slick'
import University1 from '/images/universities/u1.jpg'
import ArrowLine from '/public/svg/decore/arrow-line.svg?react'
import cls from './Organizers.module.scss'
import cn from 'classnames'

type OrganizerDataType = {
  name: string
  status: string
  image: string
}

export const Organizers = () => {
  const sliderRef = useRef<Slider | null>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(1)
  const [query, setQuery] = useState<string>('')

  const allOrganizers: OrganizerDataType[] = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        name: `University ${i + 1}`,
        status: 'ВУЗ-партнёр',
        image: University1,
      })),
    []
  )

  const filteredOrganizers = useMemo(
    () =>
      allOrganizers.filter((org) => org.name.toLowerCase().includes(query.trim().toLowerCase())),
    [allOrganizers, query]
  )

  useEffect(() => {
    sliderRef.current?.slickGoTo(0, true)
    setCurrentSlide(1)
  }, [query, filteredOrganizers.length])

  const afterChange = (slide: number) => {
    setCurrentSlide(slide + 1)
  }

  const clickPrevHandler = () => {
    sliderRef.current?.slickPrev()
  }

  const clickNextHandler = () => {
    sliderRef.current?.slickNext()
  }

  const arrows = (
    <div className="flex items-center justify-center gap-4">
      <div
        onClick={clickPrevHandler}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-primary"
      >
        <ArrowLine className="w-6 stroke-primary" />
      </div>
      <Typography.Text className="whitespace-nowrap font-light">
        {currentSlide} из {filteredOrganizers.length}
      </Typography.Text>
      <div
        onClick={clickNextHandler}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-primary"
      >
        <ArrowLine className="w-6 rotate-180 stroke-primary" />
      </div>
    </div>
  )

  return (
    <section className="section-padding">
      <Container containerInnerClassname="flex flex-col gap-12">
        <Typography.Title className="text-center gradient-text section-title" level={2}>
          Организаторы<br /> и площадки-партнеры
        </Typography.Title>

        <div className="mb-10 flex justify-center">
          <Input
            placeholder="Введите название интересующей Вас площадки"
            allowClear
            className="h-10 max-w-screen-sm bg-[#42A0E41A]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {filteredOrganizers?.length == 0 && (
          <Typography.Paragraph className="text-2xl">Организаторов не найдено</Typography.Paragraph>
        )}

        {filteredOrganizers?.length != 0 && (
          <Slider
            ref={sliderRef}
            afterChange={afterChange}
            slidesToScroll={4}
            slidesToShow={4}
            touchMove
            draggable
            arrows={false}
            dots
            infinite={false}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
            className={cn(cls.OrganizersSlider, 'flex items-center justify-center gap-3')}
          >
            {filteredOrganizers.map((org, index) => (
              <div className="flex flex-col gap-4" key={index}>
                <Image preview={false} src={org.image} />
                <Typography.Text className="text-md">{org.name}</Typography.Text>
              </div>
            ))}
          </Slider>
        )}

        {arrows}
      </Container>
    </section>
  )
}
