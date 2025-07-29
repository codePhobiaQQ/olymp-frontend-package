import { getOrganisation, getOrganisationByOGRN } from './model/services/organisations'
import { getCities } from './model/services/addresses'

export const dataProvider = {
  // Organization
  getOrganisation,
  getOrganisationByOGRN,

  // Cities
  getCities,
}
