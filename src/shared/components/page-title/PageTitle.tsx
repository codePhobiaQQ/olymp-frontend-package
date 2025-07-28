import { Typography } from 'antd'

export const PageTitle = ({ text }: { text: string }) => {
  return (
    <div className="border-pink border-b-2 pb-6">
      <Typography.Title className="uppercase" level={2}>
        {text}
      </Typography.Title>
    </div>
  )
}
