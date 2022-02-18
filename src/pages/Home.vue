<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useHead } from '@vueuse/head'
import { useStore } from '../store'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()

    useHead({
      title: computed(() => 'Home'),
      htmlAttrs: {
        lang: 'ru',
      },
      bodyAttrs: {
        class: 'head',
      },
    })

    const state = reactive({
      count: 0,
    })

    const toAbout = store.fetchHome

    return {
      state,
      toAbout,
    }
  },
})
</script>

<template>
  <h1 :class="$style.title">Home</h1>
  <button @click="state.count++">count is: {{ state.count }}</button>
  <button @click="toAbout">Redirect to '/about' url from Pinia</button>
</template>

<style module lang="scss">
.title {
  color: green;
}
</style>
