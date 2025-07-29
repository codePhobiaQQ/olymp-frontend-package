import { Container } from '@/app/components/layouts/container'
import { PageWrapper } from '@shared/components/page-wrapper'
import { Typography } from 'antd'
import { useNavigate } from 'react-router-dom'


const NewsDetailsPage = () => {
  const navigate = useNavigate()

  return (
    <PageWrapper id="news" className="section-padding-first min-h-screen bg-section1">
      <Container containerInnerClassname="gap-16 flex flex-col">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-[#2B1CCB] underline transition-opacity hover:opacity-80"
          >
            Назад
          </button>
        </div>

        <div className="font-normal">
          <div className="flex items-center gap-8">
            <Typography.Text className="font-bold">6 мая 2023</Typography.Text>
            <Typography.Text className="font-bold text-[#D8540A]">Русский язык</Typography.Text>
          </div>

          <div className="mt-16 border-b border-t border-b-[#000000] border-t-[#000000] pb-2.5 pt-2.5 text-2xl font-semibold uppercase">
            Награждение призеров и победителей межрегиональной олимпиады школьников на базе
            ведомственных образовательных организаций
          </div>

          <div className="mt-10">
            <p className="font-semibold">Уважаемые победители и призеры Олимпиады!</p>

            <p className="mt-8">
              Награждение памятными дипломами Межрегиональной олимпиады школьников на базе
              ведомственных образовательных организаций для участников из Московского региона
              пройдет <span className="font-bold underline">4 июня 2025</span> года по адресу: г. Москва, Мичуринский проспект, дом 70 (Академия
              ФСБ России).
            </p>

            <p className="mt-8">
              Время прохода строго с <span className="text-[#D8540A]">14.00 до 14.40</span>
              <br />
              Начало мероприятия в <span className="text-[#D8540A]">15.00</span>
            </p>

            <p className="mt-8">
              В ходе мероприятия в торжественной обстановке состоится церемония награждения
              победителей и призеров Олимпиады по следующим профилям:
            </p>

            <ul>
              <li>иностранный язык</li>
              <li>русский язык</li>
              <li>математика</li>
              <li>физика</li>
              <li>обществознание</li>
            </ul>

            <p className="font-semibold mt-8">Как принять участие в награждении?</p>
            <p>
              Желающим принять участие в указанном мероприятии необходимо отправить заявку (до
              01.06.2025 г. до 18.00) на сайте <a className="font-light text-[#2B1CCB] underline" href="https://v-olymp.ru">www.v-olymp.ru</a> (личный кабинет - обращение в
              оргкомитет - олимпиада по соответствующему профилю)
            </p>
          </div>
        </div>
      </Container>
    </PageWrapper>
  )
}

export default NewsDetailsPage
