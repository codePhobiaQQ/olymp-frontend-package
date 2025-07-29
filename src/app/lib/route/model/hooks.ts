import { useEffect, useState } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { AppRouteByPathPattern, AppRoutesProps, routeConfig, Routes } from './routes.tsx'

export function useRouteChange() {
  const location = useLocation()

  const [appRouteName, setAppRouteName] = useState<Routes>(Routes.MAIN)
  const [appRoute, setAppRoute] = useState<AppRoutesProps>(routeConfig[Routes.MAIN])

  useEffect(() => {
    Object.entries(AppRouteByPathPattern).forEach(([pattern, routeName]) => {
      if (matchPath(pattern, location.pathname)) {
        setAppRouteName(routeName)
        setAppRoute(routeConfig[routeName])
      }
    })
  }, [location.pathname])

  return { appRoute, appRouteName }
}
