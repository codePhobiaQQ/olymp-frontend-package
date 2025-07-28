import cls from './Navigation.module.scss'
import { Link, useLocation } from 'react-router-dom'
import cn from 'classnames'
import { routes } from '@app/lib/route'
import { useWindowWidth } from '@react-hook/window-size'
import { Drawer, Typography } from 'antd'
import { isMenuOpen } from '@app/model/state'
import { MENU_BREAKPOINT } from './../../model/consts'
import { Hamburger } from './../navigation/Hamburger'
import { CloseOutlined } from '@ant-design/icons'

export const renderNavigationLinks = (): { to: string; navLabel: string }[] => {
  return (
    routes
      ?.filter((el) => el?.navLabel)
      ?.map((route) => ({ to: route.path, navLabel: route.navLabel as string })) || []
  )
}

const MenuItems = () => {
  const location = useLocation()
  const width = useWindowWidth()

  let menuCls = ''
  let itemCls = ''

  if (width < MENU_BREAKPOINT) {
    menuCls = 'flex-col'
    itemCls = 'pt-2 pb-2 text-xl'
  }

  const clickHandler = () => {
    isMenuOpen.value = false
  }

  return (
    <nav className={cn(cls.Navigation)}>
      <ul className={cn('flex gap-8', menuCls)}>
        {renderNavigationLinks().map((link) => {
          const isActive = location.pathname === link.to
          return (
            <li key={link.to}>
              <Link
                onClick={clickHandler}
                className={cn(
                  'text-md relative whitespace-nowrap pt-4 font-medium text-primary',
                  itemCls,
                  {
                    [cls.active]: isActive,
                  }
                )}
                to={link.to}
              >
                {link.navLabel}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export const Navigation = () => {
  const width = useWindowWidth()

  const toggleHandler = (open: boolean) => () => {
    isMenuOpen.value = open
  }

  if (width < MENU_BREAKPOINT) {
    return (
      <>
        <div onClick={toggleHandler(true)}>
          <Hamburger />
        </div>
        <Drawer
          title={<Typography.Text className="text-2xl">Меню</Typography.Text>}
          placement="left"
          closable={false}
          onClose={toggleHandler(false)}
          open={isMenuOpen.value}
          key="left"
          extra={<CloseOutlined onClick={toggleHandler(false)} className="text-2xl" />}
        >
          <MenuItems />
        </Drawer>
      </>
    )
  }

  return <MenuItems />
}
