import { CopyOutlined, LaptopOutlined, WhatsAppOutlined } from '@ant-design/icons'
import TelegramIcon from '/public/svg/socials/telegram.svg?react'
import { Popover, Typography } from 'antd'
import cn from 'classnames'
import { ReactNode, useState } from 'react'
import { copyHandler } from '@shared/utils/text.ts'

interface ShareLinkProps {
  url: string
  title?: string
  text?: string
  children: ReactNode
  disable?: boolean
  className?: string
}

export const ShareLink = ({ url, title = '', text = '', children, disable = false, className }: ShareLinkProps) => {
  const [messengerMenuOpen, setMessengerMenuOpen] = useState<boolean>(false)

  const handleOpenMessengerMenu = () => {
    setMessengerMenuOpen(true)
  }

  const handleShareOnMessenger = (url: string) => {
    window.open(url, '_blank')
    setMessengerMenuOpen(false)
  }

  const handleShareUsingNavigator = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || document.title,
          text: text || '',
          url: url,
        })
        console.log('Share successful')
      } else {
        throw new Error('Share API not supported')
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  const handleShareClick = () => {
    handleOpenMessengerMenu()
  }

  const shareOptions = [
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      icon: <TelegramIcon className='w-3 h-3' />, // Telegram color
      onClick: undefined,
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(text)} ${encodeURIComponent(url)}`,
      icon: <WhatsAppOutlined className='w-3 h-3 text-[#25D366]' />, // WhatsApp color
      onClick: undefined,
    },
    {
      name: 'Copy Link',
      icon: <CopyOutlined className='w-3 h-3' />, // Default black color for copy
      onClick: () => copyHandler(url),
    },
    {
      name: 'Notes',
      icon: <LaptopOutlined className='w-3 h-3 text-[#4A90E2]' />, // Custom color for Notes icon
      onClick: handleShareUsingNavigator,
    },
  ]

  // Меню для выбора мессенджера
  const menu = (
    <div className='flex flex-col rounded-md'>
      {shareOptions.map((option) => {
        let clickHandler
        if (option?.url) {
          clickHandler = () => handleShareOnMessenger(option?.url)
        } else if (option?.onClick) {
          clickHandler = option?.onClick
        }

        return (
          <div
            className='cursor-pointer pl-3 pr-3 pt-1 pb-1 gap-2 flex items-center'
            key={option.name}
            onClick={clickHandler}
          >
            {option?.icon && option?.icon}
            <Typography.Text>{option.name}</Typography.Text>
          </div>
        )
      })}
    </div>
  )

  return (
    <Popover
      open={messengerMenuOpen}
      onOpenChange={(visible) => setMessengerMenuOpen(visible)}
      content={<div>{menu}</div>}
      trigger='click'
    >
      <div
        className={cn({ ['opacity-50 pointer-events-none']: disable, [`${className}`]: !!className })}
        onClick={handleShareClick}
      >
        {children}
      </div>
    </Popover>
  )
}
