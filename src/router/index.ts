import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Answers from '../views/Answers.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Answers',
    name: 'Answers',
    component: Answers
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'catchAll',
    component: Home
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: "/piafagent/"
})

export default router
