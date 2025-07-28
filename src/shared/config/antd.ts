import { ThemeConfig } from 'antd'

export const antdConfig: ThemeConfig = {
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
      colorBorder: 'var(--default-text-color)',
      hoverBorderColor: 'var(--default-text-color)',
      // paddingBlock: 12,
      // paddingInline: 12,
      // paddingContentHorizontal: 12,
      // paddingContentVertical: 8,
      // controlHeight: 20,
      // inputFontSize: 15,
    },
  },
}
