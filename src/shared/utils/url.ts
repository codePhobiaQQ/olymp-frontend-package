import { copyHandler } from '@shared/utils/text.ts'

export const setUri = (currentSearchParams: URLSearchParams) => {
  const newUrl = `${window.location.pathname}?${currentSearchParams.toString()}`
  window.history.replaceState({}, '', newUrl)
}

export const shareLink = async ({
  url,
  title = '',
  text = '',
  withMessengers = true,
}: {
  url: string
  title?: string
  text?: string
  withMessengers?: boolean
}) => {
  copyHandler(url)

  if (withMessengers) {
    // Если API share недоступно, показываем ссылки на мессенджеры
    const shareOptions = [
      {
        name: 'Telegram',
        url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      },
      {
        name: 'WhatsApp',
        url: `https://wa.me/?text=${encodeURIComponent(text)} ${encodeURIComponent(url)}`,
      },
      {
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      },
      {
        name: 'Twitter',
        url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      },
    ]

    // Открываем пользовательский интерфейс с выбором мессенджеров
    const userChoice = prompt(
      'Where would you like to share this?',
      shareOptions.map((option) => option.name).join(', ')
    )

    const chosenOption = shareOptions.find(
      (option) => option.name.toLowerCase() === userChoice?.toLowerCase()
    )

    if (chosenOption) {
      window.open(chosenOption.url, '_blank')
    } else {
      alert('Please select a valid option.')
    }
  } else if (navigator.share) {
    try {
      await navigator.share({
        title: title || document.title,
        text: text || '',
        url: url,
      })
      console.log('Share successful')
    } catch (err) {
      console.error('Error sharing', err)
    }
  }
}
