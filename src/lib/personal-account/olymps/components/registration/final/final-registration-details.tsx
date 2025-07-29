import { PageTitle } from '@lib/personal-account/shared/components/page-title'
import { Button } from '@shared/components/button'
import { useDeleteApplication } from './../../../model/provider/final-api'
import { success } from '@app/lib/notification'
import { useNavigate } from 'react-router-dom'
import { getFinalStageRoute } from '@app/lib/route'
// import { FinalGeneralInfo } from './final-general-info'
// import { YMaps } from '@pbe/react-yandex-maps'

export const FinalRegistrationDetails = () => {
  const navigate = useNavigate()
  const slug = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
  const [deleteApp] = useDeleteApplication()

  const deleteApplicationHandler = () => {
    deleteApp({
      slug,
    })
      .then((res) => {
        // TODO: fix getting error
        console.log(res)
        success({ text: 'Ваша заявка на участие в заключительном этапе успешно удалена' })
        navigate(getFinalStageRoute())
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <section
      className="section-padding-personal flex flex-col gap-6 bg-section1"
      id="blanks-generation"
    >
      <PageTitle title="Вы успешно зарегистрированы" />

      {/*<YMaps>*/}
      {/*  <FinalGeneralInfo rootClassName="mb-8" />*/}
      {/*</YMaps>*/}

      {/*<BlanksActions />*/}

      <div className="mt-10">
        <Button onClick={deleteApplicationHandler} danger>
          Удалить заявку на участие
        </Button>
      </div>
    </section>
  )
}
