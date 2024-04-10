<template>
  <nav class="tags-view-container">
    <el-tag
      v-for="(tag, index) in tagsViewStore.visitedViews"
      :key="index"
      :closable="!isAffix(tag)"
      :effect="isActive(tag) ? 'dark' : 'light'"
      @click="clickTag(tag)"
      @close="closeSelectedTag(tag)"
      @contextmenu.prevent="openMenu(tag, $event)"
    >
      <i class="circle-icon" v-show="isActive(tag)"></i>
      <span> {{ tag.meta?.title }}</span>
    </el-tag>

    <ul v-show="visible" class="contextmenu" :style="{ left: left + 'px', top: top + 'px' }">
      <li @click="refreshSelectedTag(selectedTag)">
        <i class="iconfont icon-Refresh"></i>
        <span>刷新</span>
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <i class="iconfont icon-Close"></i>
        <span>关闭</span>
      </li>
      <li @click="closeOthersTags">
        <i class="iconfont icon-Close"></i>
        <span>关闭其它</span>
      </li>
      <li @click="closeAllTags(selectedTag)">
        <i class="iconfont icon-Close"></i>
        <span>关闭所有</span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineOptions({ name: 'TagsView' })
import path from 'path-browserify'
import type { TagView } from '@/store/modules/useTagsView'
import type { RouteRecordRaw } from 'vue-router'
import { setVisitedViews, setCachedViews } from '@/utils/cache/local-storage'

const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsView()
const permissionStore = usePermission()

const affixTags = ref<TagView[]>([]) // 固定的标签页

// 判断标签页是否激活
const isActive = (tag: TagView): boolean => tag.path === route.path

// 判断标签页是否固定
const isAffix = (tag: TagView): boolean => tag.meta?.affix === true

// 筛选出固定标签页
const filterAffixTags = (routeList: RouteRecordRaw[], basePath = '/'): TagView[] => {
  const tags: TagView[] = []
  for (const route of routeList) {
    if (isAffix(route)) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({ fullPath: tagPath, path: tagPath, name: route.name, meta: { ...route.meta } })
    }
    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      tags.push(...childTags)
    }
  }
  return tags
}

// 跳转到最后一个标签页
const toLastView = (visitedViews: TagView[], view: TagView) => {
  const latestView = visitedViews.at(-1)
  const fullPath = latestView?.fullPath
  fullPath ? router.push(fullPath) : router.push('/')
}

// 初始化标签页
const initTags = () => {
  affixTags.value = filterAffixTags(permissionStore.routes)
  // 必须含有 name 属性
  for (const tag of affixTags.value) tag.name && tagsViewStore.addVisitedView(tag)
}

// 添加标签页
const addTags = () => {
  if (!route.name) return
  tagsViewStore.addVisitedView(route)
  tagsViewStore.addCachedView(route)
}

const clickTag = (tagView: TagView) => {
  if (tagView.path === route.path) return
  router.push({ path: tagView.path as string, query: tagView.query })
}

/* -------------------------------------------------------------------------- */
/*                                    右键菜单                                 */
/* -------------------------------------------------------------------------- */
const instance = getCurrentInstance()
const visible = ref(false) // 右键菜单的状态
const top = ref(0) // 右键菜单的 top 位置
const left = ref(0) // 右键菜单的 left 位置
const selectedTag = ref<TagView>({}) // 当前正在右键操作的标签页

const openMenu = (tagView: TagView, event: MouseEvent) => {
  const menuMinWidth = 105
  // 当前组件距离浏览器左端的距离
  const offsetLeft = instance!.proxy!.$el.getBoundingClientRect().left
  // 当前组件宽度
  const offsetWidth = instance!.proxy!.$el.offsetWidth
  // 面板的最大左边距
  const maxLeft = offsetWidth - menuMinWidth
  // 面板距离鼠标指针的距离
  const left_pos = event.clientX - offsetLeft
  left.value = left_pos > maxLeft ? maxLeft : left_pos
  top.value = event.clientY
  visible.value = true
  // 更新当前正在右键操作的标签页
  selectedTag.value = tagView
}

// 关闭右键菜单面板
const closeMenu = () => (visible.value = false)
watch(visible, (value) => (value ? document.body.addEventListener('click', closeMenu) : document.body.removeEventListener('click', closeMenu)))

// 关闭右键选中的标签页
const closeSelectedTag = (tagView: TagView) => {
  tagsViewStore.delVisitedView(tagView)
  isActive(tagView) && toLastView(tagsViewStore.visitedViews, tagView)
}
// 刷新右键选中的标签页
const refreshSelectedTag = (tagView: TagView) => {
  router.replace({ path: '/redirect' + tagView.path, query: tagView.query })
}
// 关闭其它标签页
const closeOthersTags = () => {
  const fullPath = selectedTag.value.fullPath
  if (fullPath !== route.path && fullPath !== undefined) router.push(fullPath)
  tagsViewStore.delOthersVisitedViews(selectedTag.value)
}
// 关闭所有标签页
const closeAllTags = (view: TagView) => {
  tagsViewStore.delAllVisitedViews()
  if (affixTags.value.some((tag) => tag.path === route.path)) return
  toLastView(tagsViewStore.visitedViews, view)
}

// 监听路由
watch(route, () => addTags(), { deep: true })

// atchEffect 会立即执行一遍回调函数
watchEffect(() => {
  setVisitedViews(tagsViewStore.visitedViews)
  setCachedViews(tagsViewStore.cachedViews)
})

onMounted(() => {
  initTags()
  addTags()
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tags-view-height);
  padding-right: 16px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  overflow: auto;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }

  .el-tag {
    cursor: pointer;
    margin-left: 16px;

    :deep(.el-tag__content) {
      display: flex;
      align-items: center;

      .circle-icon {
        width: 8px;
        height: 8px;
        margin-right: 4px;
        border-radius: 50%;
        background-color: #fff;
      }
    }
  }

  .contextmenu {
    position: absolute;
    z-index: 3000;
    padding: 5px 0;
    font-size: 12px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: var(--el-box-shadow-light);
    li {
      cursor: pointer;
      display: flex;
      align-items: center;
      min-width: 100px;
      padding: 4px 10px;
      transition: background-color 0.28s;
      i {
        font-size: 12px;
        margin-right: 4px;
      }
      &:hover {
        color: var(--el-color-primary);
        background-color: rgba(0, 21, 41, 0.08);
      }
    }
  }
}
</style>
