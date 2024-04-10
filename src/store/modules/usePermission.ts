import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router/constants-routes'
import { LoginService } from '@/api/login.api'
import { loadView, filterDynamicRoutes } from '@/router/router-helper'

export default defineStore('permission', {
  state() {
    return {
      routes: [] as RouteRecordRaw[], // 静态路由 + 筛选后的动态路由
      dynamicRoutes: [] as RouteRecordRaw[], // 筛选后有权限访问的路由
    }
  },

  actions: {
    /** 处理静态、动态、后端路由表 */
    async generateRoutes(roles: string[]) {
      try {
        const data = await LoginService.getRoutes()
        const backRouteList = loadView(data.result)
        this.dynamicRoutes = filterDynamicRoutes(backRouteList, roles)
        this.routes = constantRoutes.concat(this.dynamicRoutes)
        return this.dynamicRoutes
      } catch (error) {
        return Promise.reject(error)
      }
    },
  },
})
