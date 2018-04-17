import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Detail from '@/components/detail/MovieDetail'
import Cinama from '@/components/cinama/Cinama'
import CinamaDetail from '@/components/detail/CinamaDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/cinama',
      name: 'cinama',
      component: Cinama
    },
    {
      path: '/cinama/detail/:id',
      name: 'cdetail',
      component: CinamaDetail
    }
  ]
})
