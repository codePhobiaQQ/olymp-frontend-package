import { SectionTitle } from './shared'
import { Input } from '@shared/components/input'
import React, { ChangeEvent, useState } from 'react'
import { Image, Typography } from 'antd'
import partner1 from '/public/images/olymps/partners/partner1.jpg'
import partner2 from '/public/images/olymps/partners/partner2.jpg'
import partner3 from '/public/images/olymps/partners/partner3.jpg'
import { useWindowWidth } from '@react-hook/window-size'

export const Organizers = () => {
  const [searchOrganizer, setSearchOrganizer] = useState<string>('')

  const width = useWindowWidth()

  const onChangeSearchOrganizer = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchOrganizer(e.target.value)
  }

  const organizers: {
    label: string
    items: {
      src?: string
      label: string
    }[]
  }[] = [
    {
      label: 'Организаторы олимпиады',
      items: [
        {
          src: partner1,
          label: 'Институт криптографии, связи и информатики',
        },
        {
          src: partner2,
          label: 'Академия криптографии Российской Федерации',
        },
      ],
    },
    {
      label: 'Информационные партнеры',
      items: [
        {
          src: partner3,
          label: 'Институт криптографии, связи и информатики',
        },
      ],
    },
    {
      label: 'ВУЗы - партнёры',
      items: [
        {
          label: 'Институт криптографии, связи и информатики 1',
        },
        {
          label: 'Институт криптографии, связи и информатики 2',
        },
        {
          label: 'Институт криптографии, связи и информатики 3',
        },
        {
          label: 'Институт криптографии, связи и информатики 4',
        },
        {
          label: 'Институт криптографии, связи и информатики 5',
        },
      ],
    },
  ]

  const filteredOrganizers = organizers
    .map((section) => ({
      ...section,
      filteredItems: section.items.filter((item) =>
        item.label.toLowerCase().includes(searchOrganizer.toLowerCase())
      ),
    }))
    .filter((section) => section.filteredItems.length > 0)

  let style: React.CSSProperties
  if (width >= 1280) {
    style = { maxWidth: '25%', minWidth: '24%' }
  } else if (width < 1280 && width > 756) {
    style = { maxWidth: '33%', minWidth: '32%' }
  } else if (width <= 756 && width > 450) {
    style = { maxWidth: '50%', minWidth: '48%' }
  } else {
    style = { maxWidth: '100%', minWidth: '100%' }
  }

  return (
    <section className="section-padding flex flex-col" id="partners">
      <SectionTitle title="Организаторы и партнеры" />

      <div className="flex flex-wrap items-center gap-2.5">
        <Input
          className="min-w-64 bg-[#42A0E41A] md:min-w-80"
          value={searchOrganizer}
          onChange={onChangeSearchOrganizer}
          placeholder="Введите номер анкеты"
          allowClear
        />
      </div>

      <div className="mt-16 flex flex-col gap-16">
        {filteredOrganizers.length === 0 ? (
          <Typography.Text className="text-base text-light">Таких организаторов не найдено...</Typography.Text>
        ) : (
          <>
            {filteredOrganizers.map((section) => (
              <div key={section.label} className="flex flex-col gap-5">
                <Typography.Title className="text-xl font-semibold" level={5}>
                  {section.label}
                </Typography.Title>

                <div className="flex flex-wrap gap-3">
                  {section.items
                    .filter((item) =>
                      item.label.toLowerCase().includes(searchOrganizer.toLowerCase())
                    )
                    .map((item, index) => (
                      <div style={style} className="flex flex-1 flex-col gap-3" key={index}>
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#D9D9D9]">
                          {item.src ? (
                            <Image
                              rootClassName="w-full h-full"
                              src={item.src}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full object-cover" />
                          )}
                        </div>
                        <Typography.Text className="block w-full text-center text-base font-medium">
                          {item.label}
                        </Typography.Text>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
