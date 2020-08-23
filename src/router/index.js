import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Launch from '../views/Launch'
import NotFound from '../views/NotFound'
import List from '../views/List'
import Topic from '../views/Topic'
import Subscription from '../views/Subscription'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/launch/:id',
      name: 'launch',
      component: Launch,
      meta: { title: 'Launch' },
    },
    {
      path: '/rockets/:name',
      name: 'rocket',
      component: List,
      props: { icon: 'rocket', state: 'rocket', query: { filterKey: 'rocket.name' } },
      meta: { title: 'Rocket' },
    },
    {
      path: '/rockets',
      name: 'rockets',
      component: Topic,
      props: { icon: 'rocket', title: 'Rockets', state: 'rockets' },
      meta: { title: 'Rockets' },
    },
    {
      path: '/locations/:name',
      name: 'location',
      component: List,
      props: { icon: 'globe-americas', state: 'location', query: { filterKey: 'location.name' } },
      meta: { title: 'Location' },
    },
    {
      path: '/locations',
      name: 'locations',
      component: Topic,
      props: { icon: 'globe-americas', title: 'Launch locations', state: 'locations' },
      meta: { title: 'Launch locations' },
    },
    {
      path: '/lsp',
      name: 'lsps',
      component: Topic,
      props: { icon: 'building', title: 'Launch Providers', state: 'providers' },
      meta: { title: 'Launch Providers' },
    },
    {
      path: '/lsp/:name',
      name: 'lsp',
      component: List,
      props: { icon: 'building', state: 'lsp', query: { filterKey: 'lsp.name' } },
      meta: { title: 'Launch Provider' },
    },
    {
      path: '/providers',
      name: 'providers',
      component: Topic,
      props: { icon: 'building', title: 'Launch Providers', state: 'providers' },
      meta: { title: 'Launch Providers' },
    },
    {
      path: '/providers/:name',
      name: 'provider',
      component: List,
      props: { icon: 'building', state: 'lsp', query: { filterKey: 'lsp.name' } },
      meta: { title: 'Launch Provider' },
    },
    {
      path: '/search',
      name: 'search',
      component: List,
      props: { title: 'Results', icon: 'search', state: 'search' },
      meta: { title: 'Search Results' },
    },
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: Subscription,
      meta: { title: 'Subscriptions' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      meta: { title: 'About' },
    },
    {
      path: '/404',
      component: NotFound,
      meta: { title: '404: Not found' },
    },
    { path: '/rocket/:name', redirect: '/rockets/:name' },
    { path: '/location/:name', redirect: '/locations/:name' },
    { path: '/*', redirect: '/404' },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || process.env.VUE_APP_NAME
  next()
})

export default router
