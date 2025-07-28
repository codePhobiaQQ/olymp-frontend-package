import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary, NotificationProvider } from '@app/lib/providers'
import { StoreProvider } from '@app/lib/store'
import { antdConfig } from '@shared/config/antd.ts'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <StoreProvider>
        <BrowserRouter future={{ v7_startTransition: true }} basename="/">
          <ConfigProvider theme={antdConfig}>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </ConfigProvider>
        </BrowserRouter>
      </StoreProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
