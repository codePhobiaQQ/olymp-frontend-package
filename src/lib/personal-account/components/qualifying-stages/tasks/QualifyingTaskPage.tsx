import { QualifyingTask } from '@lib/personal-account/lib/qualifying-stage'
import { useLocation } from 'react-router-dom'

export const QualifyingTaskPage = () => {
  const location = useLocation()
  const olymp_slug = location.pathname.split('/')?.[location.pathname.split('/')?.length - 1]

  return <QualifyingTask olympSlug={olymp_slug} />
}
