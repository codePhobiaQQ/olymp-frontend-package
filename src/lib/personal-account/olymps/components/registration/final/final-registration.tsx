import { Drawer, Form, Select, Spin, Typography } from 'antd'
import { Button } from '@shared/components/button'
import {
  useCreateFinalStageApplication,
  useGetFinalStageVenues,
} from './../../../model/provider/final-api'
import cn from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { error, success, warning } from '@app/lib/notification'
import { finalRegistrationInit as init } from './../../../model/services'
import { useAppDispatch } from '@shared/hooks'
import { useNavigate } from 'react-router-dom'
import { isOlympSlug } from '@shared/utils/olymps'
import { getFinalStageRoute } from '@app/lib/route'
import { SearchOutlined } from '@ant-design/icons'
import { Map } from '@shared/lib/yandex-maps'

export const FinalRegistration = () => {
  const dispatch = useAppDispatch()
  const [searchOnMap, setSearchOnMap] = useState<boolean>(false)
  const navigate = useNavigate()
  const slug = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]

  const changeSearchOnMap = (value: boolean) => () => {
    setSearchOnMap(value)
  }

  const [isLoadingApplicationData, setIsLoadingApplicationData] = useState<boolean>()

  useEffect(() => {
    if (!slug || !isOlympSlug(slug)) {
      return
    }
    init(dispatch, { slug }).then((shouldRedirect) => {
      if (shouldRedirect) {
        navigate(getFinalStageRoute() + `/details` + `/${slug}`)
        return
      }
      setIsLoadingApplicationData(shouldRedirect)
    })
  }, [slug])

  // Get venues data
  const { data: venuesData, isLoading: isLoadingVenues } = useGetFinalStageVenues(
    { slug: slug! },
    { skip: !slug || isLoadingApplicationData }
  )

  const [createFinalStageApplication] = useCreateFinalStageApplication()
  const [finalRegForm] = Form.useForm<{ city: string; university: string; venue: string }>()

  const venuesCities = Object.keys(venuesData ?? {})

  const selectedCity = Form.useWatch('city', finalRegForm)
  const selectedUniversity = Form.useWatch('university', finalRegForm)
  const venue = Form.useWatch('venue', finalRegForm)

  const venuesUniversities = useMemo(() => {
    if (!selectedCity) {
      return []
    }
    return Object.keys(venuesData?.[selectedCity] ?? {}).map((place) => {
      return {
        key: place,
        value: place,
      }
    })
  }, [venuesCities, selectedCity])
  const universityPlaces = useMemo(() => {
    if (!selectedCity || !selectedUniversity) {
      return []
    }
    return (venuesData?.[selectedCity]?.[selectedUniversity] ?? []).map((place) => {
      return {
        label: place.address,
        value: place.place_id,
      }
    })
  }, [venuesCities, selectedCity, selectedUniversity])

  const submitHandler = async (data: { venue: string }) => {
    if (!slug || !data.venue) {
      warning({ text: 'Простите, Вы не выбрали место участия в олимпиаде' })
      return
    }

    const { error: e } = await createFinalStageApplication({ slug, place_id: Number(data.venue) })

    if (e) {
      error({ text: 'Ошибка во время регистрации на заключительный этап' })
      console.log(e)
      return
    }

    success({ text: 'Вы успешно зарегистрировались на заключительный этап' })
    navigate(getFinalStageRoute() + `/details` + `/${slug}`)
  }

  let content
  if (isLoadingVenues || isLoadingApplicationData) {
    content = <Spin />
  } else {
    content = (
      <Form
        onFinish={submitHandler}
        form={finalRegForm}
        layout="vertical"
        className="flex max-w-96 flex-col gap-5"
      >
        <Form.Item label="Город" name="city">
          <Select
            showSearch
            allowClear
            placeholder="Москва"
            options={venuesCities?.map((el) => ({ label: el, value: el }))}
          />
        </Form.Item>

        <div>
          <Button
            onClick={changeSearchOnMap(true)}
            disabled={!venuesUniversities?.length}
            icon={<SearchOutlined />}
          >
            Выбрать на карте
          </Button>
        </div>

        {Boolean(venuesUniversities?.length) && (
          <Drawer
            styles={{ wrapper: { height: '80vh' }, content: { padding: '0' }, body: { padding: '0' } }}
            placement="bottom"
            title="Выберете место проведения на карте"
            onClick={changeSearchOnMap(false)}
            open={searchOnMap}
          >

            <Map />

            {/*<Map*/}
            {/*  style={{ width: '100%', height: '100%', minHeight: '60vh' }}*/}
            {/*  defaultState={{ center: [55.75, 37.57], zoom: 9 }}*/}
            {/*/>*/}

          </Drawer>
        )}

        <Form.Item label="Университет" name="university">
          <Select
            showSearch
            allowClear
            rootClassName={cn({ ['opacity-50 pointer-events-none']: !venuesUniversities?.length })}
            placeholder="Академия ФСБ"
            options={venuesUniversities}
          />
        </Form.Item>

        <Form.Item label="Адрес проведения" name="venue">
          <Select
            showSearch
            allowClear
            rootClassName={cn({
              ['opacity-50 pointer-events-none']:
                !venuesUniversities?.length || !universityPlaces?.length,
            })}
            placeholder="Мичуринский проспект, д.70"
            options={universityPlaces}
          />
        </Form.Item>

        <Form.Item className="mt-4">
          <Button className={cn({ ['pointer-events-none opacity-50']: !venue })} htmlType="submit">
            Создать заявку
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <section id="final-stage-registration" className="flex flex-col gap-12">
        <Typography.Title className="mb-0" level={3}>
          Регистрация на заключительный этап
        </Typography.Title>
        {content}
    </section>
  )
}
