<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu unique-opened :collapse="isCollapse" :collapse-transition="false" :defaultActive :textColor :backgroundColor :mode>
      <AppMenuItem v-for="(route, index) in routeList" :key="index" :item="route" :basePath="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppMenu' })
import { getCssVariableValue } from '@/utils'
import AppMenuItem from './AppMenuItem.vue'

const props = defineProps({
  /** 菜单展示模式 */
  mode: { type: String as PropType<'horizontal' | 'vertical'>, default: 'vertical' },
})

/** 读取 Pinia 仓库 */
const appStore = useApp()
const settingStore = useSetting()
const permissionStore = usePermission()
/** 构建路由和路由器 */
const route = useRoute()
const router = useRouter()
/** 读取配值的 CSS 变量 */
const textColor = getCssVariableValue('--app-menu-text-color')
const backgroundColor = getCssVariableValue('--app-menu-bg-color')
/** 计算当前激活路径 */
const defaultActive: ComputedRef<string> = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path))
/** 计算当前侧边栏的开关状态 */
const isCollapse = computed(() => !appStore.sidebar.opened)
/** 计算当前路由表 */
// const routeList = computed(() => permissionStore.routes)
const routeList = computed(() => router.options.routes)

// 当为顶部模式时隐藏垂直滚动条
const hiddenScrollbarVerticalBar = computed(() => {
  return true ? 'none' : 'block'
})
</script>

<style lang="scss" scoped>
/** 修改滚动条样式 */
.el-scrollbar {
  height: 100%; // 多 1% 是为了在顶部模式时防止垂直滚动
  :deep(.scrollbar-wrapper) {
    overflow-x: hidden !important; // 限制水平宽度
    .el-scrollbar__view {
      height: 100%;
    }
  }
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      display: none; // 隐藏水平滚动条
    }
    &.is-vertical {
      display: v-bind(hiddenScrollbarVerticalBar); // 当为顶部模式时隐藏垂直滚动条
    }
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--navbar-height)); // 多 1% 是为了在左侧模式时侧边栏最底部不显示 1px 左右的白色线条
  }
}

.el-menu {
  width: 100% !important;
  height: 100%;
  margin: 0 auto;
  border: none;
  background-color: var(--app-menu-bg-color);
}

.el-menu--collapse {
  /* 去除折叠状态左侧栏的多余边距 */
  :deep(.el-sub-menu__title) {
    padding-right: var(--el-menu-base-level-padding);
  }
  :deep(.el-tooltip__trigger) {
    display: flex;
    justify-content: center;
  }
  /** 移除折叠状态下的一级和多级菜单间的图标偏移 */
  :deep(.el-icon) {
    margin-right: 0;
  }
}

/* 折叠时的激活 sub 主标题样式 */
:deep(.el-sub-menu.is-active) {
  .el-sub-menu__title.el-tooltip__trigger {
    color: var(--app-menu-text-color);
    background-color: var(--app-menu-bg-color) !important;
  }
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: var(--app-menu-item-height);
  line-height: var(--app-menu-item-height);
  &.is-active {
    color: var(--app-menu-active-color);
    background-color: var(--app-menu-active-bgc) !important;
  }
}
</style>
