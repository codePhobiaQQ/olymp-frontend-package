import { OlympData } from '@lib/olymps'
import { Typography } from 'antd'
import { CardThin } from './card-thin.tsx'
import { EqualHeightElement, EqualHeight } from 'react-equal-height'

export const OlympsLayout = ({ olympsData }: { olympsData: OlympData[] }) => {
  return (
    <div className="flex w-full flex-wrap gap-8 md:gap-4 lg:gap-2">
      <EqualHeight>
        {[
          {
            title: 'Межрегиональная олимпиада школьников им. И.Я. Верченко',
            items: olympsData.slice(0, 3),
          },
          {
            title:
              'Межрегиональная олимпиада школьников на базе ведомственных образовательных организаций',
            items: olympsData.slice(3, 7), // с 4-й по 7-ю (4 элемента)
          },
          {
            title: 'Другие олимпиады школьников',
            items: olympsData.slice(7), // всё остальное
          },
        ].map(({ title, items }, idx) => (
          <div key={idx} className="flex min-w-80 flex-1 flex-col justify-center items-center">
            <EqualHeightElement name="title">
              <div style={{ width: '85%' }} className="h-full flex items-end justify-center m-auto">
                <Typography.Text className="block text-center text-base">
                  {title}
                </Typography.Text>
              </div>
            </EqualHeightElement>

            <div className="mt-6 flex w-full flex-col gap-5 md:gap-2">
              {items.map((el) => (
                <CardThin
                  key={el.name}
                  title={el.name}
                  level={`Олимпиада 2 уровня`}
                  link={'/olymp/' + el.slug}
                />
              ))}
            </div>
          </div>
        ))}
      </EqualHeight>
    </div>
  )
}
