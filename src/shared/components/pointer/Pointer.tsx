import cn from 'classnames'
import PointerSvg from '@public/svg/decore/pointer.svg?react'

type PointerVariant = 'blue' | 'white-transparent'

const wrapperCls: Record<PointerVariant, string> = {
  blue: 'bg-accentBlue',
  'white-transparent': 'bg-transparent border border-secondary',
}
const arrowCls: Record<PointerVariant, string> = {
  blue: 'fill-secondary',
  'white-transparent': 'fill-secondary',
}

export const Pointer = ({
  className,
  variant = 'blue',
}: {
  className?: string
  variant?: PointerVariant
}) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-center rounded-full',
        wrapperCls[variant]
      )}
    >
      <PointerSvg className={cn('h-1/3 w-1/3', arrowCls[variant])} />
    </div>
  )
}
