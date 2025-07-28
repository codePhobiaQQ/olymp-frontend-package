declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.ComponentProps<'svg'> & { title?: string }>
  export default ReactComponent
}

declare type DeepPartial<T> = T extends object
  ? {
    [P in keyof T]?: DeepPartial<T[P]>
  }
  : T

declare module '*.jpg'
