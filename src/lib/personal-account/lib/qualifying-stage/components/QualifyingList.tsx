import { useGetOlymps } from '@lib/olymps'
import { Card } from '@shared/components/cards/Card/Card'
import { Container } from '@app/components/layouts/Container'
import { CardsLayout } from '@shared/components/cards/cards-layout.tsx'
import { Typography } from 'antd'

export const QualifyingList = () => {
  const { isLoading, data: olymps } = useGetOlymps()

  let content = null

  if (isLoading) {
    content = (
      <>
        {new Array(9).fill('').map((_, index) => (
          <Card key={index} skeleton />
        ))}
      </>
    )
  } else if (olymps) {
    content = (
      <>
        {olymps?.map((olymp) => {
          return (
            <Card
              path={'/personal-account/qualifying-stages/' + olymp.slug}
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
      <Typography.Title level={3}>Отборочные этапы</Typography.Title>
      <CardsLayout className="pb-10 pt-10">{content}</CardsLayout>
    </Container>
  )
}
