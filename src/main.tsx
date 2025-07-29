import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary, NotificationProvider } from '@app/lib/providers'
import { StoreProvider } from '@app/lib/store'
import { ConfigProvider } from 'antd'
import { antdTheme } from '@app/lib/antd'

export const app = () => {
  return ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <StoreProvider>
          <BrowserRouter future={{ v7_startTransition: true }} basename="/">
            <ConfigProvider theme={antdTheme}>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </ConfigProvider>
          </BrowserRouter>
        </StoreProvider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}

