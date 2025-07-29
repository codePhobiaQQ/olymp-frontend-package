import axios from 'axios'

const GET_BY_NAME_URI = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'

type School = {
  value: string
  data: unknown
}

export const getOrganisation = async (
  query: string,
  options?: { locations_boost: unknown }
): Promise<School[]> => {
  return await axios
    .post(
      GET_BY_NAME_URI,
      JSON.stringify({
        query: query,
        // @ts-ignore
        locations_boost: [JSON.parse(options?.locations_boost || [])],
        from_bound: { value: 'city' },
        to_bound: { value: 'settlement' },
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + import.meta.env['VITE_DDATA_API_KEY'],
        },
      }
    )
    .then((res) => {
      console.log(res.data.suggestions)
      return res.data.suggestions
    })
}

// ------------------------

const GET_BY_OGRN_URI = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party'

export const getOrganisationByOGRN = async (query: string): Promise<School> => {
  return await axios
    .post(
      GET_BY_OGRN_URI,
      JSON.stringify({
        query: query,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + import.meta.env['VITE_DDATA_API_KEY'],
        },
      }
    )
    .then((res) => {
      console.log(res.data.suggestions)
      return res.data.suggestions?.[0]
    })
}
