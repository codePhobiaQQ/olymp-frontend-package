import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { AppearanceType, currentAppearance } from '@app/model/state.ts'
import { Segmented } from 'antd'
import { SegmentedOptions } from 'antd/es/segmented'

export function Appearance() {
  const changeAppearance = (value: AppearanceType) => {
    currentAppearance.value = value
  }

  const options: SegmentedOptions<AppearanceType> = [
    {
      icon: <SunOutlined />,
      value: 'light',
    },
    {
      className: 'block',
      icon: <MoonOutlined />,
      value: 'dark',
    },
  ]

  return <Segmented value={currentAppearance.value} onChange={changeAppearance} options={options} />
}
