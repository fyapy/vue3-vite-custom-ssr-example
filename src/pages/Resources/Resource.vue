<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../../store'

export default defineComponent({
  asyncData: ({ pinia, params }) => useStore(pinia).fetchResource(params.id),
  setup() {
    const store = useStore()

    const data = computed(() => store.data!)

    return {
      data,
    }
  },
})
</script>

<template>
  <div :class="$style.wrapper">
    <h3>{{ data.title }}</h3>
    <div>balance - {{ data.balance }}$</div>
    <div>status - {{ data.isBlocked ? 'blocked' : 'active' }}</div>

    <div :class="$style.tabs">
      tabs:
      <router-link
        :class="$style.link"
        :exact-active-class="$style.active"
        :to="`/resource/${data.id}/transactions`"
      >
        Transactions </router-link
      >|
      <router-link
        :class="$style.link"
        :exact-active-class="$style.active"
        :to="`/resource/${data.id}/requisites`"
      >
        Requisites
      </router-link>
    </div>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<style module lang="scss">
.wrapper {
  height: 200px;
  margin: 3px;
  padding: 16px;

  display: flex;
  flex-flow: column;

  border: 1px solid rgb(222, 222, 222);

  h3 {
    margin: 0;
  }
}
.active {
  color: orange;
}
.link {
  margin: 4px 8px;
  display: inline-block;
}
.tabs {
  margin: auto 0 0;
  padding-left: 12px;

  border: 1px solid rgb(222, 222, 222);
}
</style>
