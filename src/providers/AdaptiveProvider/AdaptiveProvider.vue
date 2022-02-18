<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  provide,
  ref,
  toRefs,
  UnwrapRef,
  useSSRContext,
} from 'vue'
import { AdaptiveKey, type AdaptiveContext } from './constants'

const isBrowser = typeof window !== 'undefined'

const computeIsMobile = (): boolean =>
  isBrowser ? window.matchMedia('(max-width: 767px)').matches : false
const computeIsTablet = (): boolean =>
  isBrowser ? window.innerWidth >= 768 && window.innerWidth < 1024 : false
const computeIsDesktop = (): boolean =>
  isBrowser ? window.innerWidth >= 1024 : false

export default defineComponent({
  setup() {
    const context = ref<UnwrapRef<AdaptiveContext>>({
      isDesktop: computeIsDesktop(),
      isMobile: computeIsMobile(),
      isTablet: computeIsTablet(),
    })

    if (import.meta.env.SSR) {
      const ssrCtx = useSSRContext()!

      context.value = {
        isDesktop: ssrCtx.ssrIsDesktop,
        isMobile: ssrCtx.ssrIsMobile,
        isTablet: ssrCtx.ssrIsTablet,
      }
    }

    const setValues = () =>
      (context.value = {
        isDesktop: computeIsDesktop(),
        isMobile: computeIsMobile(),
        isTablet: computeIsTablet(),
      })

    onMounted(() =>
      window.addEventListener('resize', setValues, { passive: true })
    )
    onUnmounted(() => window.removeEventListener('resize', setValues))

    provide<AdaptiveContext>(AdaptiveKey, context)
  },
})
</script>

<template>
  <slot></slot>
</template>
