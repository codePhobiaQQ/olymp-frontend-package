import { Typography } from 'antd'
import { ChangePassword } from './change-password'
import { ChangeData } from './change-data'
import { PageWrapper } from '@shared/components/page-wrapper'
import { PageTitle } from './../../shared/components/page-title'
import { PageDescription } from './../../shared/components/page-description'

export const ProfilePage = () => {
  return (
    <PageWrapper>
      <section id="personal-profile-page" className="section-padding-personal bg-section1">
        <PageTitle title="Профиль" />
        <PageDescription text="В данном разделе Вы можете изменить свои данные / пароль. Это важно, чтобы принять участие в олимпиаде." />

        <div className="flex max-w-96 flex-col gap-12">
          <div className="flex flex-col gap-4">
            <Typography.Title level={3}>Ваши данные</Typography.Title>
            <ChangeData />
          </div>

          <div className="flex flex-col gap-4">
            <Typography.Title level={3}>Сменить пароль</Typography.Title>
            <ChangePassword />
          </div>
        </div>

      </section>
    </PageWrapper>
  )
}
