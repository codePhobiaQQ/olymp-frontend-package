import { Container } from '../../../container'
import LogoSvg from '/public/svg/logo/logo.svg?react'
import { UserController } from '@lib/auth'
import { Navigation } from './../navigation'
import cn from 'classnames'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header style={{ zIndex: 1 }} className="absolute top-0 w-full">
      <Container>
        <div className="flex items-center justify-between pb-8 pt-8">
          <Link to="/" className="mr-auto xl:mr-0">
            <LogoSvg className="h-5 w-40 fill-primary" />
          </Link>

          <Navigation />

          <div className={cn('ml-4 items-center gap-x-4 xl:ml-0 xl:flex')}>
            <UserController />
          </div>

        </div>
      </Container>
    </header>
  )
}
