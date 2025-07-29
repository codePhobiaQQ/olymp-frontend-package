import { activeSegment, olymp, SEGMENT_URI_KEY, SegmentType } from './../details-page/provider'
import { effect } from '@preact/signals-react'
import { setUri } from '@shared/utils'

export const init = () => {
  const currentSearchParams = new URLSearchParams(window.location.search)

  // ----- Get chosen olymp ------
  const arr = window.location.pathname.split('/')
  const olymp_name = arr[arr.length - 1]
  olymp.value = olymp_name

  // ----- Get active segment ----
  let searchedNewsCategory = currentSearchParams.get(SEGMENT_URI_KEY) as SegmentType
  if (searchedNewsCategory) {
    activeSegment.value = searchedNewsCategory
    return
  }
  activeSegment.value = 'news'
}

// ----- Change Segment -----
export const changeSegmentHandler = (segment: string) => {
  activeSegment.value = segment as SegmentType
}

effect(() => {
  const uri = new URLSearchParams(window.location.search)
  if (!activeSegment.value) {
    return
  }
  uri.set(SEGMENT_URI_KEY, activeSegment.value)
  setUri(uri)
})
