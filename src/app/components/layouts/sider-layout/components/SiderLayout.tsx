import { ReactNode, useEffect } from 'react'
import { Navigation } from './Navigation'
import { EmailApprovedNotification } from '@lib/personal-account'
import LogoSvg from '/public/svg/logo/logo.svg?react'
import { Container } from '../../container'
import { ConfigProvider, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { getIsUserLogin } from '@lib/auth/model/selectors/auth'
import { Link, useNavigate } from 'react-router-dom'
import { warning } from '@/app/lib/notification'
import { Footer } from './../../main-page-layout/components/footer'
import { UserController } from '@lib/auth'

interface SiderLayoutProps {
  children?: ReactNode
}

export const SiderLayout = (props: SiderLayoutProps) => {
  const { children } = props
  const isUserLoggedIn = useSelector(getIsUserLogin)
  let navigate = useNavigate()

  useEffect(() => {
    if (isUserLoggedIn === undefined) {
      return
    }
    if (!isUserLoggedIn) {
      warning({ text: 'Ваша сессия истекла, авторизуйтесь еще раз, пожалуйста' })
      navigate('/')
      return
    }
  }, [isUserLoggedIn])

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            selectorBg: 'transparent',
            colorBorder: 'hsl(var(--twc-gray1))',
          },
          Input: {
            colorBorder: 'hsl(var(--twc-gray1))',
          },
          DatePicker: {
            activeBg: 'transparent',
            colorBorder: 'hsl(var(--twc-gray1))',
          },
          Checkbox: {
            controlInteractiveSize: 24,
          },
        },
      }}
    >
      <main id="personal-account">
        <div className="flex flex-col justify-between lg:flex-row">
          <aside
            style={{ backgroundColor: '#F4F3F5' }}
            className="flex flex-col gap-12 pb-6 pl-8 pr-12 pt-6 lg:gap-6 lg:pb-0"
          >
            <div className="flex h-16 items-center">
              <Link to="/" className="mr-auto xl:mr-0">
                <LogoSvg className="h-5 w-40 fill-primary" />
              </Link>

              <div className="flex h-16 items-center lg:hidden">
                <UserController />
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <Typography.Title
                className="border-b-2 border-gray-300 pb-1 text-xl font-normal"
                level={3}
              >
                Личный кабинет
              </Typography.Title>

              <Navigation />
            </div>
          </aside>

          <section className="flex min-h-svh flex-1 flex-col pt-6">
            <Container containerInnerClassname="flex flex-col lg:pb-20 lg:pr-14 lg:pl-10 p-2 pb-16">
              <div className="hidden h-16 justify-end lg:flex">
                <UserController />
              </div>

              <div className="flex flex-col gap-4 lg:mt-4">
                <EmailApprovedNotification />
                {children}
              </div>
            </Container>
          </section>
        </div>

        <Footer />
      </main>
    </ConfigProvider>
  )
}
