<template>
  <!-- 左侧模式 -->
  <SideLayout v-if="settingStore.isSide || appStore.isMobile" />
  <!-- 顶部模式 -->
  <TopLayout v-else-if="settingStore.isTop" />

  <!-- 右侧设置面板 -->
  <SettingPanel v-if="settingStore.showSetting"></SettingPanel>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import SideLayout from './SideLayout/index.vue'
import TopLayout from './TopLayout/index.vue'
import { SettingPanel } from '@/layout/components'

/** Layout 布局响应式 */
useResize()

const appStore = useApp()
const settingStore = useSetting()
console.log('settingStore.isSide: ', settingStore.isSide)

watchEffect(() => {
  const classes = ['showGreyMode', 'showColorWeakness']
  const rootClassList = document.documentElement.classList
  classes.forEach((className) => rootClassList.contains(className) && rootClassList.remove(className))
  if (settingStore.showGreyMode) rootClassList.add('showGreyMode')
  if (settingStore.showColorWeakness) rootClassList.add('showColorWeakness')
  rootClassList.add(`layout-mode-${settingStore.layoutMode}`)
})
</script>

<style lang="scss" scoped></style>
