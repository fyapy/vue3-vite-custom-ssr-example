<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  middleware: () => '/redirected-to',
})
</script>
Î
<template>
  <div>You cannot able to view this page</div>
</template>
