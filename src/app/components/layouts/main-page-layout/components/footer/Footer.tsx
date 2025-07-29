import { Container } from '@/app/components/layouts/container'
import LogoFull from '/public/svg/logo/logo-full.svg?react'
import VK from '/public/svg/socials/vk.svg?react'
import Telegram from '/public/svg/socials/telegram.svg?react'
import WhatsUp from '/public/svg/socials/wu.svg?react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { PwaInstallBtn } from '@shared/components/pwa-install-btn'

export const Footer = () => {
  return (
    <footer className="pb-12 pt-12" style={{ backgroundColor: '#EBF1F9' }} id="footer">
      <Container containerInnerClassname="flex flex-col md:flex-row justify-between gap-10 md:gap-40">
        <div className="order-2 flex flex-col items-center gap-6 md:order-1 lg:items-start">
          <Link to="/">
            <LogoFull className="h-48 w-48" />
          </Link>

          <div className="flex justify-center gap-4 md:justify-between">
            <a
              href="https://google.com"
              target="_blank"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-primary"
            >
              <VK className="h-6 w-6" />
            </a>
            <a
              href="https://google.com"
              target="_blank"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-primary"
            >
              <WhatsUp className="h-6 w-6 fill-primary" />
            </a>
            <a
              href="https://google.com"
              target="_blank"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-primary"
            >
              <Telegram className="h-6 w-6" />
            </a>
          </div>
          <div className="flex flex-col">
            <a href="mailto:support@v-olymp.ru">support@v-olymp.ru</a>
            <a href="tel:84959893789">8 (495) 989 37 89</a>
          </div>

          <PwaInstallBtn />
        </div>
        <div className="order-1 flex flex-1 flex-col gap-16 md:order-2 lg:flex-row">
          <div className="flex w-full flex-1 flex-col gap-7 lg:max-w-80">
            <Typography.Title rootClassName="h-6 lg:h-12" level={4}>
              Олимпиады, входящие в перечень
            </Typography.Title>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/">Информатика и компьютерная безопасность</Link>
              </li>
              <li>
                <Link to="/">Математика</Link>
              </li>
              <li>
                <Link to="/">Физика</Link>
              </li>
              <li>
                <Link to="/">Иностранный язык</Link>
              </li>
            </ul>
          </div>

          <div className="flex w-full flex-1 flex-col gap-7 lg:max-w-80">
            <Typography.Title rootClassName="h-6 lg:h-12" level={4}>
              Другие мероприятия
            </Typography.Title>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/">Олимпиада по русскому языку</Link>
              </li>
              <li>
                <Link to="/">Математическая олимпиада для кадет</Link>
              </li>
              <li>
                <Link to="/">Конкурсы проектов</Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  )
}
