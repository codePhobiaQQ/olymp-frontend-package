import { Header } from './header'
import { Footer } from './footer'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children?: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
