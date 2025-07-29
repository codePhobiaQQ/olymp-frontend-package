import React from 'react'
import cn from 'classnames'
import { EqualHeight, EqualHeightElement } from 'react-equal-height'
import { useWindowSize } from '@react-hook/window-size'

type TimelineStep = {
  title: string
  description: string
  active?: boolean
}

interface TimelineProps {
  steps: TimelineStep[]
  active?: number
  vertical?: boolean
  className?: string
}

export const Timeline: React.FC<TimelineProps> = ({
  // active,
  steps,
  vertical = false,
  className,
}) => {
  const [width] = useWindowSize()
  const isVertical = Boolean(width < 768 || vertical)

  return (
    <EqualHeight>
      <div
        className={cn(
          'flex',
          isVertical ? 'flex-col items-start gap-8' : 'flex-row items-start justify-start gap-2',
          className
        )}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              'relative flex flex-1',
              isVertical ? 'flex-row items-start' : 'items-start-center flex-col',
              'max-w-sm'
            )}
          >
            {/* Content */}
            <div className={cn(isVertical ? 'ml-6' : 'mb-4 text-start', 'flex flex-col  gap-2')}>
              <EqualHeightElement name="title">
                <h3 className="text-lg font-semibold text-accentBlue">{step.title}</h3>
              </EqualHeightElement>
              <EqualHeightElement name="description">
                <p className="text-sm text-gray-600">{step.description}</p>
              </EqualHeightElement>
            </div>

            <div
              className={cn(
                'flex items-center justify-start gap-2',
                isVertical ? 'absolute h-full flex-col mt-1' : 'mt-3 flex-row'
              )}
            >
              {/* Circle */}
              <div
                className={cn(
                  'flex h-4 w-4 items-center justify-center rounded-full border-2',
                  step.active
                    ? 'border-accentBlueMedium bg-accentBlueMedium text-white'
                    : 'border-accentBlueMedium bg-white'
                )}
              >
                <div
                  className={cn(
                    'h-2 w-2 rounded-full',
                    step.active ? 'bg-white' : 'bg-accentBlueMedium'
                  )}
                ></div>
              </div>

              {/* Connector line */}
              <div
                className={cn(
                  'flex-1',
                  isVertical
                    ? 'absolute left-2 top-6 h-full w-0.5 bg-accentBlueMedium'
                    : 'h-0.5 w-full bg-accentBlueMedium'
                )}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </EqualHeight>
  )
}
