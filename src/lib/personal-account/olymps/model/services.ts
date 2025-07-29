import { UseAppDispatch } from '@shared/hooks/useAppDispatch'
import { finalApi } from './provider/final-api'
import { getCurrentAcademicYear } from '@shared/utils/olymps'

export const finalRegistrationInit = async (dispatch: UseAppDispatch, { slug }: { slug: string }): Promise<boolean> => {
  try {
    const applicationData = await dispatch(finalApi.endpoints.getFinalStageApplication.initiate({ slug, year: '[' + getCurrentAcademicYear() + ']' }, { forceRefetch: true })).unwrap()
    if (applicationData) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}