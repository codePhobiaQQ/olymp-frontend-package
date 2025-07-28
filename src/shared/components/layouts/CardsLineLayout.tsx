import { ReactNode } from 'react'

interface CardsLineLayoutProps {
  children?: ReactNode
}

export const CardsLineLayout = (props: CardsLineLayoutProps) => {
  const { children } = props

  return <div className="lex flex-wrap justify-between">{children}</div>
}
