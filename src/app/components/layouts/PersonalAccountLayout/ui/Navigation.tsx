import { Link } from 'react-router-dom'
import { routes } from '@app/lib/route/routes.tsx'
import { useCallback } from 'react'

interface NavigationProps {}

const navigationList = routes.filter((route) => {
  return route.path.match(/\/personal-account.*/gm)?.length
})

export const Navigation = (props: NavigationProps) => {
  const {} = props

  const renderLinks = useCallback(() => {
    return navigationList.map((link) => {
      if (!link?.navIcon) return
      return (
        <Link className="flex items-center justify-center" key={link.path} to={link.path}>
          {link?.navIcon && link?.navIcon?.('w-8 h-8 fill-current')}
        </Link>
      )
    })
  }, [])

  return (
    <div className="mx-auto mt-4 flex flex-grow flex-col items-center space-y-4 text-gray-400">
      {renderLinks()}
    </div>
  )
}
