import Vue from 'vue'
import Router from 'vue-router'
import { getQueryStringWithPath } from '@/utils/index'
import Layout from '@/views/dashboard'
Vue.use(Router)

/* Router Modules */

export const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
    // component: () => import('@/views/dashboard/index'),
    component:Layout,
    children: [
      {
        path: '/dashboard',
        // component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/mylogin/index')
  },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }

]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
