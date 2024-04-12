<template>
  <div :class="classes" class="relative wh-full clearFix">
    <!-- 头部导航栏和标签栏 -->
    <header class="layout-mode-top__header" :class="{ 'fixed-header': settingStore.fixedHeader }">
      <!-- <div class="navbar flex">
        <AppLogo :collapse="false" />
        <AppMenu mode="horizontal" class="app-menu-conatiner" />
      </div> -->
      <Navbar />
      <TagsView v-if="settingStore.showTagsView" />
    </header>

    <AppMain />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'TopLayout' })
import { AppLogo, AppMenu, Navbar, TagsView, AppMain, SettingPanel } from '@/layout/components'

const appStore = useApp()
const settingStore = useSetting()

const classes = computed(() => ({
  mobile: appStore.isMobile,
  'has-tags-view': settingStore.showTagsView,
}))
</script>

<style lang="scss" scoped>
.layout-mode-top {
  &__header {
    display: flex;
    flex-direction: column;
  }
}

.fixed-header {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  background-color: var(--app-menu-bg-color);
  transition: width 0.28s;
}
.navbar {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
