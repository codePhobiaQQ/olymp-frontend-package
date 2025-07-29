import cls from './Card.module.scss'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'
import { Description } from './items/description'
import { Title } from './items/title'
import { Status } from './items/status'
import { QualStatus, qualStatusCodeData } from './../../model/consts'

export type CardProps = {
  classnames?: {
    className?: string
    wrapperClassName?: string
  }
  title?: string
  description?: string
  path?: string
  loading?: boolean
  status?: {
    info: string
    code: QualStatus
  }
  onClick?: () => void
}

const baseWrapperCls = cn(cls.Card, 'flex flex-col min-w-80 justify-between flex-1')

export const Card = (props: CardProps) => {
  const { path, classnames, loading, status, onClick } = props

  let extraWrapperCls
  let contentCls
  if (status) {
    extraWrapperCls = qualStatusCodeData?.[status.code]?.wrapperCls
    contentCls = qualStatusCodeData?.[status.code]?.cls
  }

  let content
  if (loading) {
    content = <Skeleton active className="h-full w-full" />
  } else {
    content = (
      <>
        <div style={{ zIndex: 1 }} className={cn('flex flex-col gap-4 relative', { [`${contentCls}`]: contentCls })}>
          <Title {...props} />
          <Description {...props} />
          <Status text={status?.info} statusCode={status?.code} />
        </div>
        <div className={cn(cls['ItemBgContainer'])}>
          <div className={cn(cls['ItemBg'])} />
        </div>
      </>
    )
  }

  if (path) {
    return (
      <Link onClick={onClick} className={cn(classnames?.className, baseWrapperCls, extraWrapperCls, classnames?.wrapperClassName)} to={path}>
        {content}
      </Link>
    )
  }

  return (
    <div onClick={onClick} className={cn(classnames?.className, baseWrapperCls, extraWrapperCls, classnames?.wrapperClassName)}>
      {content}
    </div>
  )
}
