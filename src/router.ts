import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'
import About from './pages/About.vue'
import Resources from './pages/Resources/Resources.vue'
import Resource from './pages/Resources/Resource.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Resources,
    children: [
      {
        path: 'resource/:id',
        component: Resource,
        children: [
          {
            path: 'transactions',
            component: () => import('./pages/Resources/Transactions.vue'),
          },
          {
            path: 'requisites',
            component: () => import('./pages/Resources/Requisites.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/home',
    component: () => import('./pages/Home.vue'),
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/redirect',
    component: () => import('./pages/Redirect.vue'),
  },
  {
    path: '/redirected-to',
    component: () => import('./pages/RedirectedTo.vue'),
  },
]

export const createRouter = () =>
  _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })
