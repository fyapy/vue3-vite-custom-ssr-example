<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '../../store'

export default defineComponent({
  asyncData: ({ pinia, params }) =>
    useStore(pinia).fetchTransactions(params.id),
  setup() {
    const store = useStore()

    const transactions = computed(() => store.transactions)

    return {
      transactions,
    }
  },
})
</script>

<template>
  <div :class="$style.wrapper">
    <template v-if="transactions.length">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="$style.item"
      >
        <span>{{ transaction.title }}</span>
        <span>
          {{ transaction.type === 'decrement' ? '-' : '+'}}{{ transaction.amount }}$
        </span>
      </div>
    </template>
    <div v-else>Transactions not found</div>
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
