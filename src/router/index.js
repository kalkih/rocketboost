import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Launch from '../views/Launch.vue'
import NotFound from '../views/NotFound.vue'
import List from '../views/List.vue'

Vue.use(Router)

const router = new Router({
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
      path: '/rocket/:name',
      name: 'rocket',
      component: List,
      props: { icon: 'rocket', state: 'rocket', query: { filterKey: 'rocket.name' } },
      meta: { title: 'Rocket' },
    },
    {
      path: '/location/:name',
      name: 'location',
      component: List,
      props: { icon: 'globe-americas', state: 'location', query: { filterKey: 'location.name' } },
      meta: { title: 'Location' },
    },
    {
      path: '/lsp/:name',
      name: 'lsp',
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
    { path: '*', redirect: '/404' },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || process.env.VUE_APP_NAME
  next()
})

export default router
