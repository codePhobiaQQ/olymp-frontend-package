import { Container } from '@app/components/layouts/Container'
import { EqualHeight, EqualHeightElement } from 'react-equal-height'
import { Typography } from 'antd'

export const WinnersScreen = () => {
  return (
    <section className="section-padding bg-section2">
      <Container containerInnerClassname="flex flex-col gap-16">
        <Typography.Title level={2}>Победителям и призерам</Typography.Title>

        <div className="flex pb-12">
          <div className="content-name" />
          <div className="ml-auto flex-1 xl:pl-64">
            <Typography.Text rootClassName="text-lg md:text-xl font-light">
              Законодательно для победителей и призёров олимпиад школьников, входящих в Перечень
              Минобрнауки, определены следующие льготы:
            </Typography.Text>
          </div>
        </div>

        <EqualHeight>
          <ul className="flex flex-col">
            <EqualHeightElement name="adv">
              <li className="flex justify-start border-t border-primaryGray pb-12 pt-3">
                <div className="content-name">
                  <Typography.Text className="text-xl font-semibold md:text-2xl">
                    01
                  </Typography.Text>
                </div>
                <div className="max-w-screen-sm flex-1">
                  <Typography.Text rootClassName="text-xl md:text-2xl font-light">
                    Зачисление без вступительных испытаний
                  </Typography.Text>
                </div>
              </li>
            </EqualHeightElement>

            <EqualHeightElement name="adv">
              <li className="flex justify-start border-t border-primaryGray pb-12 pt-3">
                <div className="content-name">
                  <Typography.Text className="text-xl font-semibold md:text-2xl">
                    02
                  </Typography.Text>
                </div>
                <div className="max-w-screen-sm flex-1">
                  <Typography.Text rootClassName="text-xl md:text-2xl font-light">
                    Максимальный балл за ЕГЭ по соответствующему предмету
                  </Typography.Text>
                </div>
              </li>
            </EqualHeightElement>

            <EqualHeightElement name="adv">
              <li className="flex justify-start border-b border-t border-primaryGray pb-12 pt-3">
                <div className="content-name">
                  <Typography.Text className="text-xl font-semibold md:text-2xl">
                    03
                  </Typography.Text>
                </div>
                <div className="max-w-screen-sm flex-1">
                  <Typography.Text rootClassName="text-xl md:text-2xl font-light">
                    Возможность получения льготы «максимальный балл за ДВИ» (дополнительное
                    вступительное испытание), сам экзамен при этом сдавать не потребуется
                  </Typography.Text>
                </div>
              </li>
            </EqualHeightElement>
          </ul>
        </EqualHeight>

        <div className="flex pt-10">
          <div className="content-name" />
          <div className="flex flex-1 flex-col gap-12 lg:pr-64">
            <Typography.Text rootClassName="text-lg md:text-xl font-light">
              Оргкомитет олимпиады по математике и криптографии по сложившейся годами традиции
              готовит бумажные версии дипломов для победителей и призёров.
            </Typography.Text>
            <Typography.Text rootClassName="text-lg md:text-xl font-light">
              Информация о времени и месте награждения публикуется на сайте в разделе Новости.
            </Typography.Text>
          </div>
        </div>
      </Container>
    </section>
  )
}
