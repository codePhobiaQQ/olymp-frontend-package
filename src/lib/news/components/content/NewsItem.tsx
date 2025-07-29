import { NewsPreviewItemI } from './../../model/types'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import { getNewsRoute } from '@app/lib/route'
import { Pointer } from '@shared/components/pointer'

export const NewsItem = (props: NewsPreviewItemI) => {
  const { date, preview_description, category, id, preview_title } = props

  return (
    <Link
      to={getNewsRoute() + `/${id}`}
      className="relative flex min-w-80 flex-1 flex-col rounded-xl bg-secondary p-6 pb-20 shadow"
    >
      <div className=" flex items-center justify-between">
        <Typography.Text className="text-base font-medium">{date}</Typography.Text>

        <Typography.Text className="text-base font-medium text-accentOrange">
          {category?.name}
        </Typography.Text>

      </div>

      <Typography.Title rootClassName="mt-12 font-medium text-base" level={4}>
        {preview_title}
      </Typography.Title>

      <Typography.Text rootClassName="mt-4 text-gray1">{preview_description}</Typography.Text>

      <Pointer className="absolute bottom-6 right-6 h-8 w-8" />
    </Link>
  )
}
