import type {
  LocationQuery,
  Router,
  RouteRecordNormalized,
} from 'vue-router'
import type { Request, Response } from 'express'
import { defineStore, Pinia } from 'pinia'
import { ComponentCustomOptions, DefineComponent } from 'vue'
import NProgress from 'nprogress'

export interface AppContext {
  req: Request | null
  res: Response | null
  pinia: Pinia
  router: Router
  query: LocationQuery
  params: Record<string, string>
}

type RedirectLocation = {
  path: string
  status: number
}

export type RedirectTo = void | string | RedirectLocation
export type Middleware = (
  ctx: AppContext
) => RedirectTo | PromiseLike<RedirectTo>

export class RedirectError extends Error {
  redirectTo: string
  status: number
  _isMtfRedirect = true

  constructor(redirectTo: string, status = 302) {
    super()

    this.redirectTo = redirectTo
    this.status = status
  }
}

export const matchedComponents = (matched: RouteRecordNormalized[]) =>
  matched.map((m) => Object.values(m.components)).flat() as DefineComponent[]

export const fireMiddlewares = async (
  components: DefineComponent[],
  context: AppContext
) => {
  const middles = components
    .map((c) => c.middleware)
    .filter(Boolean)
    .flat() as Middleware[]

  if (middles.length !== 0) {
    const redirects = (
      await Promise.all(middles.map(m => m(context)))
    ).filter(Boolean)

    if (redirects.length !== 0) {
      for (const to of redirects) {
        if (typeof to === 'string') {
          throw new RedirectError(to)
        } else if (typeof to === 'object') {
          throw new RedirectError(to.path, to.status)
        }
      }
    }
  }
}

export const fireAsyncData = async (
  components: DefineComponent[],
  context: AppContext
) => {
  const asyncs = components.map((c) => c.asyncData).filter(Boolean) as Exclude<ComponentCustomOptions['asyncData'], undefined>[]

  if (asyncs.length !== 0) {
    await Promise.all(asyncs.map(a => a(context)))
  }
}

declare global {
  interface Window {
    __pinia: Record<string, any>
  }
}

export const setupMft = ({
  router,
  pinia,
}: {
  pinia: Pinia
  router: Router
}) => {
  pinia.state.value = window.__pinia
  useHistory(pinia)._setRouter(router)

  router.beforeEach(() => {
    NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
  router.beforeResolve(async (to, _from, next) => {
    try {
      const context: AppContext = {
        req: null,
        res: null,
        pinia,
        router,
        query: to.query,
        params: to.params as AppContext['params'],
      }

      const components = matchedComponents(to.matched)

      await fireMiddlewares(components, context)
      await fireAsyncData(components, context)

      next()
    } catch (e) {
      if (e instanceof RedirectError) return next(e.redirectTo)

      throw e
    }
  })
}

type HistoryState = {
  _router: Router | null
  status: number
}

export const useHistory = defineStore('history', {
  state: (): HistoryState => ({
    _router: null,
    status: 200,
  }),
  getters: {
    currentRoute: (state) => state._router!.currentRoute,
  },
  actions: {
    setStatus(status: number) {
      this.status = status
    },
    _setRouter(_router: HistoryState['_router']) {
      ;(this._router as unknown as HistoryState['_router']) = _router
    },
    push(path: string, status = 302) {
      this.status = status
      this._router?.push(path)
    },
    replace(path: string, status = 302) {
      this.status = status
      this._router?.replace(path)
    },
    go(delta: number) {
      this._router?.go(delta)
    },
    back() {
      this._router?.go(-1)
    },
    forward() {
      this._router?.go(1)
    },
  },
})
