import cls from './Card.module.scss'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'

type Props = {
  title?: string
  description?: string
  path?: string
  skeleton?: boolean
}

const wrapperCls = cn(cls.Card, 'flex flex-col min-w-80 justify-between flex-1 shadow-lg')

export const Card = (props: Props) => {
  const { title, description, path, skeleton } = props

  let content

  if (skeleton) {
    content = <Skeleton active className="h-full w-full" />
  } else {
    content = (
      <>
        <div className={cn(cls['ItemsBg'])} />
        <h4 className="min-w-min">{title}</h4>
        {description && (
          <div className="max-w-60 text-xs" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </>
    )
  }

  if (path) {
    return (
      <Link className={wrapperCls} to={path}>
        {content}
      </Link>
    )
  }

  return <div className={wrapperCls}>{content}</div>
}
