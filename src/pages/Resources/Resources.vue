<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../../store'

export default defineComponent({
  asyncData: ({ pinia }) => useStore(pinia).fetchResources(),
  setup() {
    const store = useStore()

    const list = computed(() => store.allList)

    return {
      list,
    }
  },
})
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.list">
      <router-link
        v-for="item in list"
        :key="item.id"
        :to="`/resource/${item.id}`"
        :class="$style.item"
      >
        <div>
          <span>{{ item.title }}{{ item.isBlocked ? ' (blocked)' : '' }}</span>
          <span>{{ item.balance }}$</span>
        </div>
      </router-link>
    </div>
    <div :class="$style.view">
      <router-view></router-view>
    </div>
  </div>
</template>

<style module lang="scss">
.wrapper {
  display: flex;
}
.list {
  width: 300px;
  margin-top: 3px;
  min-height: calc(100vh - 35px);

  display: flex;
  flex-flow: column;

  border: 1px solid rgb(222, 222, 222);
}
.item {
  padding: 16px;
  margin: 3px;

  border: 1px solid rgb(222, 222, 222);

  > div {
    display: flex;
    justify-content: space-between;
  }
}
.view {
  width: calc(100% - 300px);
}
</style>
