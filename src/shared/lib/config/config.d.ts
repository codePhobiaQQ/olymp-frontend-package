declare module 'config-yaml' {
  import { Config, ChainCollection } from 'config/types'
  export { ChainCollection }
  export type { Config }
  export const config: Config
}
