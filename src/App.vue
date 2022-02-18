<script lang="ts">
import { defineComponent } from 'vue'
import { AdaptiveProvider } from './providers'
import Navbar from './ui/Navbar.vue'

import './style/main.scss'

export default defineComponent({
  components: {
    AdaptiveProvider,
    Navbar,
  },
})
</script>

<template>
  <adaptive-provider>
    <navbar></navbar>
    <router-view></router-view>
  </adaptive-provider>
</template>
