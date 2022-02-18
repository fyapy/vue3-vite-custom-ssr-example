import type { Middleware, AppContext as SSRAppContext } from './ssr'

declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    asyncData?(ctx: SSRAppContext): void
    middleware?: Middleware | Middleware[]
  }
}

export {}
