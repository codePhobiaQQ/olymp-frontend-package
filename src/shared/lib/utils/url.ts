export const setUri = (currentSearchParams: URLSearchParams) => {
  const newUrl = `${window.location.pathname}?${currentSearchParams.toString()}`
  window.history.replaceState({}, '', newUrl)
}
