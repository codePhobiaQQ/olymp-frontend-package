import { olymp } from './../../model/details-page/provider'
import { NewsSubjectPage } from '@lib/news'

export const News = () => {
  return (
    <NewsSubjectPage
      subject={olymp.value ?? 'cryptography'}
      className="pt-16 pb-16"
      id="news"
    />
  )
}