<template>
  <h1 :class="$style.heading">About page</h1>

  <div v-if="mobile.isMobile">isMobile</div>
  <div v-else-if="mobile.isTablet">isTablet</div>
  <div v-else>isDesktop</div>

  <button @click="toHome">Redirect to '/home' url from Pinia</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMobile } from '../composes'
import { useStore } from '../store'

export default defineComponent({
  name: 'About',
  setup() {
    const mobile = useMobile()

    const store = useStore()

    const toHome = store.fetchAbout

    return {
      mobile,
      toHome,
    }
  },
})
</script>

<style module lang="scss">
.heading {
  color: red;
}
</style>
