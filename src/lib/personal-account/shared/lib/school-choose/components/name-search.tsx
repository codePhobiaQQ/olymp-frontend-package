import { Select, Spin } from 'antd'
import { useMemo, useRef, useState } from 'react'
import { dataProvider } from '@shared/lib/data-provider'
import debounce from 'lodash/debounce'
import { CityType, SchoolType } from '../../../model/types.ts'

const DEBOUNCE_TIME_INTERVAL = 500

export const NameSearch = () => {
  // ---------------------
  // ------- CITY --------
  // ---------------------
  const [cityValue, setCityValue] = useState<CityType>()
  const [citiesOptions, setCitiesOptions] = useState<CityType[]>([])
  const [cityFetching, setCityFetching] = useState(false)
  const cityFetchRef = useRef(0)

  const debounceCityFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      cityFetchRef.current += 1
      const fetchId = cityFetchRef.current

      setCitiesOptions([])
      setCityFetching(true)

      if (fetchId !== cityFetchRef.current) {
        return
      }

      dataProvider
        .getCities(value)
        .then((suggestions) => {
          setCitiesOptions(
            suggestions?.map((suggestion) => {
              console.log(suggestion)
              return {
                label: suggestion.value,
                value: JSON.stringify(suggestion.data),
              }
            })
          )
        })
        .finally(() => {
          setCityFetching(false)
        })
    }

    return debounce(loadOptions, DEBOUNCE_TIME_INTERVAL)
  }, [])

  // ------------------
  // ----- SCHOOL -----
  // ------------------
  const [schoolValue, setSchoolValue] = useState<SchoolType>()
  const [schoolOptions, setSchoolOptions] = useState<SchoolType[]>([])
  const [schoolFetching, setSchoolFetching] = useState(false)
  const schoolFetchRef = useRef(0)
  const debounceSchoolFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      schoolFetchRef.current += 1
      const fetchId = schoolFetchRef.current

      setSchoolOptions([])
      setSchoolFetching(true)

      if (fetchId !== schoolFetchRef.current) {
        return
      }

      console.log(cityValue)

      dataProvider
        .getOrganisation(value, { locations_boost: cityValue })
        .then((suggestions) => {
          setSchoolOptions(
            suggestions?.map((suggestion) => {
              return {
                label: suggestion.value,
                value: JSON.stringify(suggestion.data),
              }
            })
          )
        })
        .finally(() => {
          setSchoolFetching(false)
        })
    }

    return debounce(loadOptions, DEBOUNCE_TIME_INTERVAL)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <Select
        mode="multiple"
        maxCount={1}
        filterOption={false}
        onSearch={debounceCityFetcher}
        value={cityValue}
        onChange={(newValue) => {
          setCityValue(newValue as SchoolType)
        }}
        notFoundContent={cityFetching ? <Spin size="small" /> : null}
        placeholder="Выберете регион проживания"
        options={citiesOptions}
      />

      <Select
        disabled={!cityValue}
        mode="multiple"
        maxCount={1}
        filterOption={false}
        onSearch={debounceSchoolFetcher}
        value={schoolValue}
        onChange={(newValue) => {
          setSchoolValue(newValue as SchoolType)
        }}
        notFoundContent={schoolFetching ? <Spin size="small" /> : null}
        placeholder="Выберете Организацию"
        options={schoolOptions}
      />
    </div>
  )
}
