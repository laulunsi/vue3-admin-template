<template>
  <div class="app-main">
    <!-- key 采用 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用 -->
    <RouterView v-slot="{ Component, route }">
      <Transition :name="settingStore.transitionName" mode="out-in" :include="tagsViewStore.cachedViews">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppMain' })

const settingStore = useSetting()
const tagsViewStore = useTagsView()
</script>

<style lang="scss" scoped>
/** 顶部非固定状态 */
.app-main {
  position: relative;
  width: 100%;
  min-height: calc(100% - var(--navbar-height));
  overflow: hidden;
  // background-image: url('@/assets/images/bg.texture-58Pqblmy.png');
}

/* 顶部固定时，高度占满并添加上内边距占位 */
.fixed-header + .app-main {
  min-height: calc(100% - var(--navbar-height));
  margin-top: var(--navbar-height);
}

.has-tags-view {
  /** 顶部非固定状态 */
  .app-main {
    min-height: calc(100% - var(--navbar-height) - var(--tags-view-height));
  }
  .fixed-header + .app-main {
    min-height: calc(100% - var(--navbar-height) - var(--tags-view-height));
    margin-top: calc(var(--navbar-height) + var(--tags-view-height));
  }
}
</style>
