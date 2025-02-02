import router from '@/router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getToken } from '@/utils/cache/local-storage' // 从缓存读取 Token 的方法
import isWhiteList from './white-list' // 路由是否在白名单的判断判断方法

const NProgress = useNProgress() // 顶部进度条

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start()
  const settingStore = useSetting()
  settingStore.handleDynamicTitle(to.meta.title)
  if (getToken()) {
    if (to.path.toLowerCase() === '/login') {
      next({ path: '/', replace: true }) // 如果已经登录，并准备进入 Login 页面，则重定向到主页
    } else {
      next()
    }
  } else {
    // 如果没有 Token，但在免登录的白名单中，则直接进入；否则将被重定向到登录页面
    isWhiteList(to) ? next() : next(`/login?redirect=${to.fullPath}`)
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  NProgress.done()
})
