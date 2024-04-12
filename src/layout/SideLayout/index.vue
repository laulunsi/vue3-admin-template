<template>
  <div class="app-container" :class="classes">
    <!-- 左侧边栏 -->
    <aside class="sidebar-container" :class="{ 'has-logo': settingStore.showLogo }">
      <AppLogo v-if="settingStore.showLogo" :collapse="isCollapse" />
      <AppMenu />
    </aside>

    <!-- mobile 端侧边栏遮罩层 -->
    <div v-if="appStore.device === 'mobile' && appStore.sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>

    <!-- 主容器 -->
    <section class="main-container clearFix" :class="{ 'has-tags-view': settingStore.showTagsView }">
      <!-- 头部导航栏和标签栏 -->
      <header :class="{ 'fixed-header': settingStore.fixedHeader }">
        <Navbar />
        <TagsView v-if="settingStore.showTagsView" />
      </header>

      <AppMain />
    </section>

    <!-- 右侧设置面板 -->
    <SettingPanel v-if="settingStore.showSetting"></SettingPanel>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SideLayout' })
import { AppLogo, AppMenu, Navbar, TagsView, AppMain, SettingPanel } from '@/layout/components'

/** Layout 布局响应式 */
useResize()

/** 读取 Pinia 仓库 */
const appStore = useApp()
const settingStore = useSetting()
const isCollapse = computed(() => !appStore.sidebar.opened)

/** 用来添加到根组件的动态类的集合 */
const classes = computed(() => {
  const cls: string[] = [appStore.device]
  cls.push(appStore.sidebar.opened ? 'open-sidebar' : 'hide-sidebar')
  appStore.sidebar.withoutAnimation && cls.push('withoutAnimation')
  return cls
})

/** 用于处理点击 mobile 端侧边栏遮罩层的事件 */
function handleClickOutside() {
  appStore.closeSidebar(false)
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 左侧边栏抽屉背景遮罩 */
.drawer-bg {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

/* 头部固定 */
.fixed-header {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  width: calc(100% - var(--sidebar-width));
  background-color: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(6px);
  transition: width 0.28s;
}
</style>
