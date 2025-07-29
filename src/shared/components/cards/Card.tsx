import React from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import parse from 'html-react-parser'

type CardProps = {
  title: string
  description?: string
  image?: React.ReactNode
  link?: string
  className?: string
  children?: React.ReactNode
  showArrow?: boolean
  backgroundImage?: string
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  link,
  className,
  children,
  showArrow = false,
  backgroundImage,
}) => {
  const content = (
    <div
      className={cn(
        'group relative flex h-auto flex-1 flex-col rounded-xl bg-accentBlue p-6 transition-transform md:h-96',
        className
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'var(--accentBlue)', // ✅ дефолт: solid цвет, если нет картинки
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Верхний декоративный элемент */}
      {image && <div className="absolute -right-4 lg:-right-8">{image}</div>}

      {/* Заголовок */}
      <Typography.Text className="text-2xl font-bold text-secondary">{title}</Typography.Text>

      {/* Описание и стрелка */}
      <div className="mt-32 flex items-end justify-between gap-8 md:mt-auto">
        {description && (
          <Typography.Text className="text-base text-secondary">
            {parse(description)}
          </Typography.Text>
        )}

        {/* Стрелка по умолчанию */}
        {showArrow && (
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden md:h-16 md:w-16">
            <div className="arrow flex h-10 w-10 flex-shrink-0 translate-x-full items-center justify-center rounded-full border border-secondary p-3 transition-transform will-change-transform group-hover:translate-x-0 md:h-16 md:w-16 md:p-6">
              <svg className="h-full w-full rotate-45 fill-secondary" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {children}
    </div>
  )

  if (link) {
    return (
      <Link to={link} className="block">
        {content}
      </Link>
    )
  }

  return content
}
