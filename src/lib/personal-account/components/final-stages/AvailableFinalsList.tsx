import { useGetAvailableFinals } from '@lib/personal-account/model/services'
import { Card } from '@shared/components/cards/Card/Card'
import { Container } from '@app/components/layouts/Container'
import { Typography } from 'antd'
import { CardsLayout } from '@shared/components/cards/cards-layout.tsx'

export const AvailableFinalsList = () => {
  const { isLoading, data: olymps } = useGetAvailableFinals({})

  let content = null

  if (isLoading) {
    content = (
      <>
        {new Array(9).fill('').map((_, index) => (
          <Card key={index} skeleton />
        ))}
      </>
    )
  } else if (!olymps?.length) {
    content = (
      <Typography.Text>Вы пока не прошили ни на один заключительный этап...</Typography.Text>
    )
  } else if (olymps) {
    content = (
      <>
        {olymps?.map((olymp) => {
          return (
            <Card
              path={'./' + olymp.slug}
              key={olymp.ID + olymp.name}
              title={olymp.name}
              description={olymp?.description}
            />
          )
        })}
      </>
    )
  }

  return (
    <Container>
      <Typography.Title level={3}>Заключительные этапы олимпиад</Typography.Title>
      <CardsLayout className="pb-10 pt-10">{content}</CardsLayout>
    </Container>
  )
}
