import { Container } from '../../../Container'
import LogoSvg from '@public/svg/logo/logo.svg?react'
import { UserController } from '@lib/auth'
import { Navigation } from './../navigation'
import { MENU_BREAKPOINT } from './../../model/consts'
import { useWindowWidth } from '@react-hook/window-size'
import cn from 'classnames'
import { Link } from 'react-router-dom'

export const Header = () => {
  const width = useWindowWidth()

  let userControllerCls = ''
  if (width < MENU_BREAKPOINT) {
    userControllerCls = 'hidden'
  }

  return (
    <header className="bg-section1">
      <Container>
        <div className="flex items-center justify-between pb-8 pt-8">
          <Link to="/">
            <LogoSvg className="h-5 w-40 fill-primary" />
          </Link>

          <Navigation />

          <div className={cn('items-center gap-x-4 xl:flex', userControllerCls)}>
            <UserController />
          </div>
        </div>
      </Container>
    </header>
  )
}
