import { ReactNode, Suspense, useEffect } from 'react'

export const PageWrapper = ({
  className,
  id,
  children,
}: {
  className?: string
  id?: string
  children?: ReactNode
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <section className={className} id={id}>
      <Suspense fallback="Loading...">{children}</Suspense>
    </section>
  )
}
