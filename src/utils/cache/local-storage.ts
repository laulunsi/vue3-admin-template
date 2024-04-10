/** 统一处理 localStorage */
import { CacheKey } from '@/common/constants/cache-key'
import type { TagView } from '@/store/modules/useTagsView'

/* -------------------------------------------------------------------------- */
/*                                    Token                                   */
/* -------------------------------------------------------------------------- */
export function setToken(token: string): void {
  localStorage.setItem(CacheKey.TOKEN, token)
}
export function getToken(): string {
  return localStorage.getItem(CacheKey.TOKEN) || ''
}
export function removeToken(): void {
  localStorage.removeItem(CacheKey.TOKEN)
}

/* -------------------------------------------------------------------------- */
/*                               Sidebar Status                               */
/* -------------------------------------------------------------------------- */
export function setSidebarStatus(status: boolean): void {
  const data = { [CacheKey.SIDEBAR_STATUS]: status }
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, JSON.stringify(data))
}
export function getSidebarStatus(): boolean {
  const json = localStorage.getItem(CacheKey.SIDEBAR_STATUS)
  return json ? JSON.parse(json)[CacheKey.SIDEBAR_STATUS] : true
}

/* -------------------------------------------------------------------------- */
/*                                  TagsView                                  */
/* -------------------------------------------------------------------------- */
export function setVisitedViews(views: TagView[]) {
  // 删除不必要的属性，防止 JSON.stringify 处理到循环引用
  for (const view of views) {
    delete view.matched
    delete view.redirectedFrom
  }
  localStorage.setItem(CacheKey.VISITED_VIEWS, JSON.stringify(views))
}
export function getVisitedViews(): TagView[] {
  const json = localStorage.getItem(CacheKey.VISITED_VIEWS)
  return json ? JSON.parse(json) : []
}
export function setCachedViews(views: string[]) {
  localStorage.setItem(CacheKey.CACHED_VIEWS, JSON.stringify(views))
}
export function getCachedViews(): string[] {
  const json = localStorage.getItem(CacheKey.CACHED_VIEWS)
  return json ? JSON.parse(json) : []
}
