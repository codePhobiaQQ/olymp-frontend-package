import { ReactNode } from 'react'

interface SectionDescriptionProps {
  children?: ReactNode
}

export const SectionDescription = (props: SectionDescriptionProps) => {
  const { children } = props

  return <div className="w-full md:w-2/3 ml-auto mt-12">{children}</div>
}
