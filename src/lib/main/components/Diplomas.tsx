import Usor from '@public/images/decore/usor2.png'
import { Typography } from 'antd'

export const Diplomas = () => {
  return (
    <section
      id="diplomas"
      className="relative flex items-center justify-center rounded-lg pb-28 pt-28"
      style={{
        background: `#281455 url(${Usor}) center center / cover no-repeat`,
      }}
    >
      <div className="decore top-1/6">
        <div />
      </div>
      <div className="w-10/12 max-w-screen-lg text-center">
        <Typography.Text className="text-secondary text-2xl md:text-3xl">
          Победителям и призёрам олимпиад электронные копии дипломов направляются посредством
          сервисов портала{' '}
          <a target="_blank" href="https://rsr-olymp.ru" className="text-secondary underline">
            rsr-olymp.ru
          </a>
        </Typography.Text>
      </div>
    </section>
  )
}
