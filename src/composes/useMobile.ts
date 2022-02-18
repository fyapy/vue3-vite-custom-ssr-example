import { inject } from 'vue'
import { type AdaptiveContext, AdaptiveKey } from '../providers'

export const useMobile = () => inject<AdaptiveContext>(AdaptiveKey)!
