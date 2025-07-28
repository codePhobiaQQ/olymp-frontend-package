import { Container } from '@app/components/layouts/Container'
import { Card } from '@shared/components/cards/Card/Card'
import { CardsLayout } from '@shared/components/cards/cards-layout.tsx'
import { useGetOlymps } from '@lib/olymps'

export const OlympsScreen = () => {
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
              path={'/olymp/' + olymp.slug}
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
    <section className="bg-section2 section-padding">
      <Container>
        <CardsLayout>{content}</CardsLayout>
      </Container>
    </section>
  )
}
