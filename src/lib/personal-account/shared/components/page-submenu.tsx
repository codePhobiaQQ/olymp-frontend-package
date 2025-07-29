import { ConfigProvider, Tabs, TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'

type PageSubmenu = {
  items: (Required<TabsProps>['items'][number] & { path?: string })[]
  activeKey?: string
}

export const PageSubmenu = (props: PageSubmenu) => {
  const { items, activeKey } = props
  const navigate = useNavigate()

  const navigateHandle = (key: string) => {
    const path = items.filter((el) => el.key === key)[0]?.path
    if (path) {
      setTimeout(() => {
        navigate(path)
      }, 300)
    }
  }

  const onChange = (key: string) => {
    console.log('key', key)
    navigateHandle(key)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            colorBorderSecondary: 'hsl(var(--twc-accentBlueMedium))',
            lineWidth: 2,
            inkBarColor: 'hsl(var(--twc-accentBlue))',
            itemActiveColor: 'hsl(var(--twc-accentBlue))',
            itemSelectedColor: 'hsl(var(--twc-accentBlue))',
          },
        },
      }}
    >
      <Tabs rootClassName="mb-12" defaultActiveKey={activeKey} items={items} onChange={onChange} />
    </ConfigProvider>
  )
}
