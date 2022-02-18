import { Ref } from 'vue'

export type AdaptiveContext = Ref<{
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}>

export const AdaptiveKey = Symbol('adaptive')
