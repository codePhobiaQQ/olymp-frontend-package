import { Container } from '@app/components/layouts/Container'
import cls from './Organizers.module.scss'
import { Image, Input, Typography } from 'antd'
import { ChangeEvent, useRef, useState } from 'react'
import Slider from 'react-slick'
import University1 from '@public/images/universities/u1.jpg'
import ArrowLine from '@public/svg/decore/arrow-line.svg?react'
import cn from 'classnames'
import { signal } from '@preact/signals-react'

type OrganizerDataType = {
  name: string
  status: string
  image: string
}

export const Organizers = () => {
  const sliderRef = useRef<Slider | null>(null)
  const data = new Array(45).fill('')
  const [showedSlides] = useState<OrganizerDataType[]>(data)
  const [currentSlide, setCurrentSlide] = useState<number>(1)

  const afterChange = (slide: number) => {
    setCurrentSlide(slide + 1)
  }

  // --------------------
  // ------ Dots ------
  // --------------------
  const customPaging = () => {
    return (
      <div className=" w-full pb-3 pt-3">
        <div className="h-1" />
      </div>
    )
  }

  // --------------------
  // ------ Arrows ------
  // --------------------
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
        className="border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border"
      >
        <ArrowLine className="stroke-primary w-6" />
      </div>
      <Typography.Text className="font-light">
        {currentSlide} из {showedSlides.length}
      </Typography.Text>
      <div
        onClick={clickNextHandler}
        className="border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border"
      >
        <ArrowLine className="stroke-primary w-6 rotate-180" />
      </div>
    </div>
  )

  return (
    <section className="section-padding">
      <Container containerInnerClassname="flex flex-col gap-12">
        <Typography.Title level={2}>Организаторы и партнеры</Typography.Title>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-0">
            <SortOrganizers />
            {arrows}
          </div>

          <Slider
            speed={300}
            afterChange={afterChange}
            customPaging={customPaging}
            touchMove
            slidesToScroll={4}
            draggable
            slidesToShow={4}
            arrows
            dots
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  infinite: true,
                  dots: true,
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
            ref={sliderRef}
          >
            {showedSlides.map((_, index) => {
              return (
                <div className="flex flex-col gap-4" key={index}>
                  <Image preview={false} src={University1} />
                  <Typography.Text className="text-md">University {index}</Typography.Text>
                </div>
              )
            })}
          </Slider>
        </div>
      </Container>
    </section>
  )
}

const sortData = signal<string>('')
// const debouncedSortData = signal<string>('')

const SortOrganizers = () => {
  const changeSortData = (e: ChangeEvent<HTMLInputElement>) => {
    sortData.value = e.target.value
  }
  return (
    <Input
      placeholder="Введите название интересующей Вас площадки"
      onChange={changeSortData}
      value={sortData.value}
      rootClassName="max-w-screen-sm"
    />
  )
}
