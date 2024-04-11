import { Layout } from '@/config/constants'
import type { RouteRecordRaw } from 'vue-router'

/** 常驻路由 除了 redirect/403/404/login 等隐藏页面，其它页面建议设置 Name 属性 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/index.vue'),
    meta: { title: '登录', hidden: true },
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { title: '重定向', hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard/index.vue'),
        meta: { title: '首页', icon: 'Dashboard', affix: true },
      },
    ],
  },

  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: { title: '系统管理', icon: 'Setting', alwaysShow: true },
    children: [
      {
        path: 'user-manage',
        name: 'UserManage',
        component: () => import('@/views/System/UserManage/index.vue'),
        meta: { title: '用户管理', icon: 'User' },
      },
      {
        path: 'role-manage',
        name: 'RoleManage',
        component: () => import('@/views/System/RoleManage/index.vue'),
        meta: { title: '角色管理', icon: 'Role' },
      },
      {
        path: 'menu-manage',
        name: 'MenuManage',
        component: () => import('@/views/System/MenuManage/index.vue'),
        meta: { title: '菜单管理', icon: 'Menu' },
      },
    ],
  },

  {
    path: '/monitor',
    name: 'Monitor',
    component: Layout,
    meta: { title: '系统监控', icon: 'Monitor', alwaysShow: true },
    children: [
      {
        path: 'server',
        name: 'Server',
        component: () => import('@/views/Monitor/Server/index.vue'),
        meta: { title: '服务监控', icon: 'Monitor' },
      },
    ],
  },

  {
    path: '/404',
    component: () => import('@/views/ExceptionPage/NotFound.vue'),
    meta: { title: 'NotFound', hidden: true },
    alias: '/:pathMatch(.*)*',
  },
]
