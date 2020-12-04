import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Users',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/devices',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/devices/index'),
        name: 'End divices',
        meta: { title: 'End Devices', icon: 'el-icon-s-platform' }
      }
    ]
  },
  {
    path: '/network',
    component: Layout,
    redirect: '/network/network',
    name: 'Network',
    meta: { title: 'Network Monitoring', icon: 'international' },
    children: [
      {
        path: 'Speed-test',
        component: () => import('@/views/network/Speedtest'),
        name: 'Speedtest',
        meta: { title: 'Speed Test' }
      },
      {
        path: 'ISP',
        component: () => import('@/views/network/Ispd'),
        name: 'ISP',
        meta: { title: 'ISP Performance' }
      },
      {
        path: 'network',
        component: () => import('@/views/network/network'),
        name: 'ISP',
        meta: { title: 'WIFI Details' }
      }
    ]
  },
  {
    path: '/access',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/access/index'),
        name: 'Access Control',
        meta: { title: 'Access Control', icon: 'el-icon-key' }
      }
    ]
  },
  {
    path: '/apps',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/apps/index'),
        name: 'Installed Apps',
        meta: { title: 'Installed Apps', icon: 'el-icon-mobile-phone' }
      }
    ]
  },
  {
    path: '/Users',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Users/index'),
        name: 'Tab',
        meta: { title: 'Users', icon: 'peoples' }
      }
    ]
  },
  {
    path: '/notifications',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/notifications/index'),
        name: 'Notifications',
        meta: { title: 'Notifications', icon: 'el-icon-message-solid' }
      }
    ]
  },

  {
    path: '/charts',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/charts/mix-chart'),
        name: 'nalytics',
        meta: { title: 'Analytics', icon: 'el-icon-data-analysis' }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    children: [
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Application Permissions',
          icon: 'lock',
          name: 'Permission'
          // you can set roles in root nav
        }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/

  {
    path: '/parameters',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/parameters/parameters'),
        name: 'Settings',
        meta: { title: 'Settings', icon: 'el-icon-setting' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
