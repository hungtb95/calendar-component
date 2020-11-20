import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/week-calendar',
    name: 'WeekCalendar',
    component: () => import(/* webpackChunkName: "about" */ '../views/WeekCalendar.vue')
  },
  {
    path: '/month-calendar',
    name: 'MonthCalendar',
    component: () => import(/* webpackChunkName: "about" */ '../views/MonthCalendar.vue')
  },
  {
    path: '/datepicker',
    name: 'Datepicker',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Datepicker.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
