import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'
import { getVisitedViews, getCachedViews } from '@/utils/cache/local-storage'

export type TagView = Partial<RouteLocationNormalized>

export default defineStore('tags-view', {
  state() {
    return {
      visitedViews: getVisitedViews(),
      cachedViews: getCachedViews(),
    }
  },

  actions: {
    /** 添加新的 visitedView */
    addVisitedView(tagView: TagView) {
      // 检查是否已经存在相同的 visitedView
      const index = this.visitedViews.findIndex((v) => v.name === tagView.name)
      if (index !== -1) {
        // 防止 query 参数丢失
        this.visitedViews[index].fullPath !== tagView.fullPath && (this.visitedViews[index] = { ...tagView })
      } else {
        // 添加新的 visitedView
        this.visitedViews.push({ ...tagView })
      }
    },

    // 关闭标签
    delVisitedView(tagView: TagView) {
      const index = this.visitedViews.findIndex((v) => v.path === tagView.path)
      if (index !== -1) this.visitedViews.splice(index, 1)
    },

    // 关闭其它
    delOthersVisitedViews(tagView: TagView) {
      this.visitedViews = this.visitedViews.filter((tag) => tag.meta?.affix || tag.path === tagView.path)
    },

    // 关闭所有
    delAllVisitedViews() {
      this.visitedViews = this.visitedViews.filter((tag) => tag.meta?.affix)
    },

    addCachedView(tagView: TagView) {
      if (typeof tagView.name !== 'string') return
      if (this.cachedViews.includes(tagView.name)) return
      if (tagView.meta?.keepAlive) this.cachedViews.push(tagView.name)
    },
    delCachedView(tagView: TagView) {
      if (typeof tagView.name !== 'string') return
      const index = this.cachedViews.findIndex((v) => v === tagView.name)
      this.cachedViews.splice(index, 1)
    },
    delAllCachedViews() {
      this.cachedViews = []
    },
  },
})
