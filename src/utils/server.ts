import type { Manifest } from '../entry-server'
import { basename } from 'path'
import { UAParser } from 'ua-parser-js'

const uaCache = new Map<string | undefined, AdaptiveServerProps>()

type AdaptiveServerProps = {
  ssrIsMobile: boolean
  ssrIsTablet: boolean
  ssrIsDesktop: boolean
}
export const getAdaptiveSSR = (userAgent?: string) => {
  if (uaCache.has(userAgent)) {
    return uaCache.get(userAgent)!
  }

  const ua = new UAParser(userAgent).getResult()
  const isMobile: boolean = ua.device.type === 'mobile'
  const isTablet: boolean = ua.device.type === 'tablet'

  const output = {
    ssrIsMobile: isMobile,
    ssrIsTablet: isTablet,
    ssrIsDesktop: !isMobile && !isTablet,
  }

  uaCache.set(userAgent, output)

  return output
}

export const renderPreloadLinks = (modules: string[], manifest: Manifest) => {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: string) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

const renderPreloadLink = (file: string) => {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  }
}
