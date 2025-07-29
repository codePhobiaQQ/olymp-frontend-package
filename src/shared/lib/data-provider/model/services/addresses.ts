import axios from 'axios'

const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address\n'

type City = {
  value: string
  data: unknown
}

export const getCities = async (query: string): Promise<City[]> => {
  return await axios
    .post(
      url,
      JSON.stringify({
        count: 5,
        query: query,
        to_bound: { value: 'region' },
        from_bound: { value: 'region' },
        locations_boost: [
          {
            postal_code: '356557',
            country: 'Россия',
            country_iso_code: 'RU',
            federal_district: 'Северо-Кавказский',
            region_fias_id: '327a060b-878c-4fb4-8dc4-d5595871a3d8',
            region_kladr_id: '2600000000000',
            region_iso_code: 'RU-STA',
            region_with_type: 'Ставропольский край',
            region_type: 'край',
            region_type_full: 'край',
            region: 'Ставропольский',
            area_fias_id: '51e6a2bc-ef6a-48d5-90e2-0bf4a534b904',
            area_kladr_id: '2602600000000',
            area_with_type: 'Туркменский р-н',
            area_type: 'р-н',
            area_type_full: 'район',
            area: 'Туркменский',
            settlement_fias_id: '089a267a-03c7-4e4e-8855-661429b27a40',
            settlement_kladr_id: '26026000005003600',
            settlement_with_type: 'кв-л 26-09-101201 (аул Куликовы Копани)',
            settlement_type: 'кв-л',
            settlement_type_full: 'квартал',
            settlement: '26-09-101201 (аул Куликовы Копани)',
            fias_id: '089a267a-03c7-4e4e-8855-661429b27a40',
            fias_level: '65',
            fias_actuality_state: '0',
            kladr_id: '26026000005003600',
            capital_marker: '0',
            okato: '07256000010',
            oktmo: '07556000146',
            tax_office: '2646',
            tax_office_legal: '2646',
            geo_lat: '45.317268',
            geo_lon: '43.561329',
            qc_geo: '3',
          },
        ],
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
