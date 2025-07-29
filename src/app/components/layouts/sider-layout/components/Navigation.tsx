import { routes } from '@app/lib/route/model/routes'
import { ConfigProvider, Menu, MenuProps } from 'antd'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { useRouteChange } from '@app/lib/route/model/hooks'
import { useMemo } from 'react'

type MenuItem = Required<MenuProps>['items'][number] & { key: string }

const navigationList: MenuItem[] = routes
  .filter((route) => {
    return route.path.match(/\/personal-account.*/gm)?.length && !!route.navLabel
  })
  .map((el) => {
    return {
      key: el.path,
      icon: el.navIcon?.(''),
      label: <Link to={el.path}>{el.navLabel}</Link>,
      disabled: el.disabled,
      className: 'text-primary',
    }
  })

export const Navigation = () => {
  const { appRoute } = useRouteChange()

  const selectedKeys = useMemo(() => {
    const matchedRoute = [...navigationList]
      .sort((a, b) => b.key.length - a.key.length)
      .find((route) => appRoute.path.startsWith(route.key))
    return matchedRoute ? matchedRoute.key : appRoute.path
  }, [appRoute.path])

  return (
    <div className={cn('w-full lg:w-64')}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'transparent',
              activeBarBorderWidth: 0,
              itemMarginBlock: 0,
              itemMarginInline: 0,
              itemPaddingInline: 16,
              itemSelectedColor: 'hsl(var(--twc-accentBlueLight))',
            },
          },
        }}
      >
        <Menu
          style={{ marginLeft: '-16px' }}
          selectedKeys={[selectedKeys]}
          mode="inline"
          items={navigationList}
        />
      </ConfigProvider>
    </div>
  )
}
