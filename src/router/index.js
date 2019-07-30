import Vue from 'vue'
import Router from 'vue-router'
import TableMain from '@/components/TableMain'
import NCS from '@/components/NCS'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ncs',
      component: NCS
    }
  ]
})
