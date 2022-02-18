import type { Request, Response } from 'express'
import { renderToString, SSRContext } from 'vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'
import serialize from 'serialize-javascript'
import { getAdaptiveSSR, renderPreloadLinks } from './utils/server'
import { createApp } from './main'
import {
  fireAsyncData,
  fireMiddlewares,
  matchedComponents,
  AppContext,
  RedirectError,
  useHistory,
} from './ssr'

export type Manifest = Record<string, string[]>

export const render = async ({
  url,
  req,
  res,
  manifest,
}: {
  url: string
  manifest: Manifest
  req: Request
  res: Response
}) => {
  const { app, router, pinia, head } = createApp()

  router.push(url)
  await router.isReady()

  const _route = router.currentRoute.value

  const context: AppContext = {
    req,
    res,
    pinia,
    router,
    query: _route.query,
    params: _route.params as AppContext['params'],
  }

  const mftStore = useHistory(pinia)
  useHistory(pinia)._setRouter(router)

  const components = matchedComponents(_route.matched)

  await fireMiddlewares(components, context)
  await fireAsyncData(components, context)

  if (url !== mftStore.currentRoute.fullPath) {
    throw new RedirectError(mftStore.currentRoute.fullPath, mftStore.status)
  }
  if (mftStore.status !== 200) {
    res.status(mftStore.status)
  }

  const ssrAdaptiveProps = getAdaptiveSSR(req.headers['user-agent'])
  const ctx: SSRContext = {
    ...ssrAdaptiveProps,
  }

  const html = await renderToString(app, ctx)

  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head)

  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)

  useHistory(pinia)._setRouter(null)
  const initialState = serialize(pinia.state.value)

  return {
    html,
    initialState,
    preloadLinks,
    headTags,
    htmlAttrs,
    bodyAttrs,
  }
}
