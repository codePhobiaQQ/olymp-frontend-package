import type { ThemeConfig } from 'antd'

export const antdTheme: ThemeConfig = {
  token: {
    colorTextPlaceholder: 'rgba(0, 0, 0, .5)',
  },
  components: {
    Typography: {
      colorText: 'var(--default-text-color)',
      lineHeight: 1.4,
    },
    Button: {
      colorPrimary: '#291BCA',
      ghostBg: 'var(--default-text-color)',
    },
    Input: {
      activeBg: 'transparent',
      colorBgContainer: 'transparent',
      lineWidth: 1,
    },

    Form: {
      itemMarginBottom: 0,
      verticalLabelPadding: '0 0 6px',
    },
  },
}

//
// export const antdTheme: ThemeConfig = {
//   token: {},
//   components: {
//     Layout: {
//       headerBg: 'hsl(var(--twc-base))',
//       siderBg: 'hsl(var(--twc-base))',
//     },
//     Input: {
//       colorBgContainer: 'transparent',
//       colorBorder: 'hsl(var(--twc-borderColor))',
//       lineWidth: 2,
//     },
//     Select: {
//       colorBgContainer: 'transparent',
//       colorBorder: 'hsl(var(--twc-borderColor))',
//       lineWidth: 2,
//     },
//     ColorPicker: {
//       colorBgContainer: 'transparent',
//     },
//     DatePicker: {
//       colorBgContainer: 'transparent',
//       colorBorder: 'hsl(var(--twc-borderColor))',
//       lineWidth: 2,
//     },
//     Menu: {
//       colorBgContainer: 'transparent',
//       activeBarBorderWidth: 0,
//       itemSelectedBg: 'hsl(var(--twc-primary2))',
//       itemHoverBg: 'hsl(var(--twc-primary2))',
//       itemSelectedColor: 'hsl(var(--twc-secondary))',
//       subMenuItemBg: 'transparent',
//       colorBorder: 'transparent',
//     },
//   },
// }
