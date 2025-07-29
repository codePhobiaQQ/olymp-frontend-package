import { Suspense, useCallback } from 'react'
import { AppRoutesProps, routeConfig } from './../model/routes'
import { PageLoader } from '@shared/components/loaders/page-loader'
import { Route, Routes } from 'react-router-dom'
import { SiderLayout } from './../../../components/layouts/sider-layout'
import { MainLayout } from './../../../components/layouts/main-page-layout'

export const AppRoute = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    let elementComponent = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>

    if (route?.layout === 'personal-account') {
      elementComponent = <SiderLayout>{elementComponent}</SiderLayout>
    } else {
      elementComponent = <MainLayout>{elementComponent}</MainLayout>
    }

    return <Route key={route.path} path={route.path} element={elementComponent} />
  }, [])

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}
