import { Link } from 'react-router-dom'
import cn from 'classnames'
import { routes } from '@app/lib/route'
import { useWindowWidth } from '@react-hook/window-size'
import { Drawer, Typography } from 'antd'
import { isMenuOpen } from '@app/model/state'
import { MENU_BREAKPOINT } from './../../model/consts'
import { Hamburger } from './../navigation/Hamburger'
import { CloseOutlined } from '@ant-design/icons'
import { useRouteChange } from '@app/lib/route/model/hooks.ts'

export const renderNavigationLinks = (): { to: string; navLabel: string }[] => {
  return (
    routes
      .filter((route) => {
        return !route.path.match(/\/personal-account.*/gm)?.length
      })
      ?.filter((el) => el?.navLabel)
      ?.map((route) => ({ to: route.path, navLabel: route.navLabel as string })) || []
  )
}

const MenuItems = () => {
  const { appRoute } = useRouteChange()
  const width = useWindowWidth()

  let menuCls = 'border rounded-2xl p-1 border-[#BCBCBC]'
  let itemCls = 'pt-2 pb-2 pr-5 pl-5 rounded-xl transition-all hover:bg-accentBlue hover:text-secondary'
  let activeItemCls = 'bg-accentBlue text-secondary'

  if (width < MENU_BREAKPOINT) {
    menuCls = 'flex-col gap-8'
    itemCls = 'pt-2 pb-2 text-xl hover:border-b transition-all'
    activeItemCls = 'border-b'
  }

  const clickHandler = () => {
    isMenuOpen.value = false
  }

  return (
    <nav>
      <ul className={cn('flex box-content', menuCls)}>
        {renderNavigationLinks().map((link) => {
          const isActive = link.to === appRoute.path

          return (
            <li key={link.to} className="flex">
              <Link
                onClick={clickHandler}
                className={cn(
                  'text-md relative whitespace-nowrap font-medium text-primary',
                  itemCls,
                  {
                    [activeItemCls]: isActive,
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
