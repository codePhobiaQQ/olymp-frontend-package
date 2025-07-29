import { ReactNode } from 'react'

export const NewsLayout = ({ filters, content }: { filters: ReactNode, content: ReactNode }) => {
  return <div className="menu-content-gap flex flex-col md:flex-row">
    <div className="w-full md:w-1/5">
      {filters}
    </div>
    <div className="flex-1">
      {content}
    </div>
  </div>
}
