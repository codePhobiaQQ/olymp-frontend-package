import { Typography } from 'antd'

export const FormTitle = ({ title }: {title: string}) => {
  return (
    <Typography.Title className="text-2xl uppercase font-medium text-center" level={5}>
      {title}
    </Typography.Title>
  )
}