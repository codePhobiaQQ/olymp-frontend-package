import { Typography } from 'antd'

export const PageDescription = ({ text }: { text: string }) => {
  return (
    <div className="mb-12 max-w-screen-md">
      <Typography.Text className="text-lg font-light">{text}</Typography.Text>
    </div>
  )
}
