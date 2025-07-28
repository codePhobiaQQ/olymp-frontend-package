import type { ThemeConfig } from 'antd'

export const antdTheme: ThemeConfig = {
  token: {},
  components: {
    Layout: {
      headerBg: 'hsl(var(--twc-base))',
      siderBg: 'hsl(var(--twc-base))',
    },
    Input: {
      colorBgContainer: 'transparent',
      colorBorder: 'hsl(var(--twc-borderColor))',
      lineWidth: 2,
    },
    Select: {
      colorBgContainer: 'transparent',
      colorBorder: 'hsl(var(--twc-borderColor))',
      lineWidth: 2,
    },
    ColorPicker: {
      colorBgContainer: 'transparent',
    },
    DatePicker: {
      colorBgContainer: 'transparent',
      colorBorder: 'hsl(var(--twc-borderColor))',
      lineWidth: 2,
    },
    Menu: {
      colorBgContainer: 'transparent',
      activeBarBorderWidth: 0,
      itemSelectedBg: 'hsl(var(--twc-primary2))',
      itemHoverBg: 'hsl(var(--twc-primary2))',
      itemSelectedColor: 'hsl(var(--twc-secondary))',
      subMenuItemBg: 'transparent',
      colorBorder: 'transparent',
    },
  },
}
