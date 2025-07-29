import { UploadOutlined } from '@ant-design/icons'
import { PWAInstallElement } from '@khmyznikov/pwa-install'
import PWAInstall from '@khmyznikov/pwa-install/react-legacy'
import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'

export const PwaInstallBtn = () => {
  const [promptEvent, setPromptEvent] = useState(null)
  const [btnVisible, setBtnVisible] = useState(true)
  const pwaInstallRef = useRef<PWAInstallElement>(null)

  useEffect(() => {
    // @ts-ignore
    let lastPromptEvent = window?.promptEvent

    if (pwaInstallRef.current && pwaInstallRef.current?.isUnderStandaloneMode) {
      setBtnVisible(false)
    }

    const intervalId = setInterval(() => {
      // @ts-ignore
      if (window?.promptEvent !== lastPromptEvent) {
        // @ts-ignore
        lastPromptEvent = window?.promptEvent
        // @ts-ignore
        setPromptEvent(window?.promptEvent)
      }
    }, 100)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const installPwaHandler = () => {
    pwaInstallRef.current?.showDialog()
  }

  // ---------------------

  const icon = <UploadOutlined />

  return (
    <>
      {btnVisible && (
        <Button type='primary' onClick={installPwaHandler} icon={icon}>
          Установить приложение
        </Button>
      )}

      <PWAInstall icon='/images/logos/logo-512x512.png' ref={pwaInstallRef} externalPromptEvent={promptEvent} />
    </>
  )
}
