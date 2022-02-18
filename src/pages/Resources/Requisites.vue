<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../../store'

export default defineComponent({
  asyncData: ({ pinia, params }) => useStore(pinia).fetchRequisites(params.id),
  setup() {
    const store = useStore()

    const requisites = computed(() => store.requisites)

    return {
      requisites,
    }
  },
})
</script>

<template>
  <div :class="$style.wrapper">
    <template v-if="requisites.length">
      <div
        v-for="requisite in requisites"
        :key="requisite.id"
        :class="$style.item"
      >
        <span>{{ requisite.name }}</span>
        <span>{{ requisite.value }}</span>
      </div>
    </template>
    <div v-else>Requisite not found</div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  margin: 3px;
  padding: 12px;

  display: flex;
  flex-flow: column;

  border: 1px solid rgb(222, 222, 222);
}
.item {
  margin: 3px;
  padding: 12px;

  display: flex;
  justify-content: space-between;

  border: 1px solid rgb(222, 222, 222);
}
</style>
