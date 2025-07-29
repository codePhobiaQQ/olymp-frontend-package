import { Typography } from 'antd'
import { useEffect } from 'react'
import { useAppDispatch } from '@shared/hooks'
import { init } from './../../model/services/init'
import { destroy } from './../../model/provider'
import { NewsContent } from './../content/NewsContent'
import cn from 'classnames'

type NewsSubjectPageProps = {
  title?: string
  subject: string
  titleCls?: string
  className?: string
  id?: string
}

export const NewsSubjectPage = (props: NewsSubjectPageProps) => {
  const { title, subject, titleCls, className, id } = props
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(init({ categories: [subject] }))
    return () => {
      destroy()
    }
  }, [])

  return (
    <div id={id} className={cn(className, 'flex flex-col gap-4')}>
      {title && (
        <Typography.Title className={cn(titleCls)} level={4}>
          {title}
        </Typography.Title>
      )}

      <NewsContent subject={subject} />
    </div>
  )
}
