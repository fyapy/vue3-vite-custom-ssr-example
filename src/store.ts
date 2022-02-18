import { defineStore } from 'pinia'
import { useHistory } from './ssr'
import { http } from './utils/http'

export type Requisite = {
  id: number
  name: string
  value: string
}
export type Transaction = {
  id: number
  type: 'increment' | 'decrement'
  title: string
  amount: number
}
export type Resource = {
  id: number
  title: string
  balance: number
  isBlocked: boolean
  transactions: Transaction[]
  requisites: Requisite[]
}

type State = {
  allList: Resource[]
  data: Resource | null
  transactions: Transaction[]
  requisites: Requisite[]
}

export const useStore = defineStore('store', {
  state: (): State => ({
    allList: [],
    data: null,
    requisites: [],
    transactions: [],
  }),
  actions: {
    async fetchResources() {
      if (this.allList.length) return

      try {
        const res = await http('/resources')

        this.allList = res
      } catch (e) {
        console.error(e)
      }
    },
    async fetchResource(id: string) {
      if (this.data?.id === +id) return

      try {
        const res = await http(`/resources/${id}`)

        this.data = res
      } catch (e) {
        console.error(e)
      }
    },
    async fetchTransactions(id: string) {
      try {
        const res = await http(`/resources/${id}`)

        this.transactions = res.transactions
      } catch (e) {
        console.error(e)
      }
    },
    async fetchRequisites(id: string) {
      try {
        const res = await http(`/resources/${id}`)

        this.requisites = res.requisites
      } catch (e) {
        console.error(e)
      }
    },
    async fetchHome() {
      const mtf = useHistory(this._p)

      mtf.push('/about')
    },
    async fetchAbout() {
      const mtf = useHistory(this._p)

      mtf.push('/home?lel=123')
    },
  },
})
