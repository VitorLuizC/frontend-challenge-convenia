import Vue from 'vue'
import Router from 'vue-router'
import Bills from '@/views/Bills.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Bills',
      path: '/',
      component: Bills
    },
    {
      name: 'Bill',
      path: '/bill/:id',
      props: true,
      component: () => import('@/views/Bill.vue')
    }
  ]
})
