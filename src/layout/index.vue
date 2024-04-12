<template>
  <!-- 左侧模式 -->
  <SideLayout v-if="isSide || appStore.isMobile" />
  <!-- 顶部模式 -->
  <TopLayout v-else-if="isTop" />

  <!-- 右侧设置面板 -->
  <SettingPanel v-if="settingStore.showSetting"></SettingPanel>
</template>

<script setup lang="ts">
defineOptions({ name: 'Layout' })
import { LayoutModeEnum } from '@/enums'
import SideLayout from './SideLayout/index.vue'
import TopLayout from './TopLayout/index.vue'
import { SettingPanel } from '@/layout/components'

/** Layout 布局响应式 */
useResize()

const appStore = useApp()
const settingStore = useSetting()
const { isMix, isTop, isSide } = useLayoutModel()

watchEffect(() => {
  // 解决色彩样式冲突
  const classes = ['showGreyMode', 'showColorWeakness']
  const rootClassList = document.documentElement.classList
  classes.forEach((className) => rootClassList.contains(className) && rootClassList.remove(className))
  if (settingStore.showGreyMode) rootClassList.add('showGreyMode')
  if (settingStore.showColorWeakness) rootClassList.add('showColorWeakness')

  // 解决布局模式样式冲突
  const layoutClasses = [LayoutModeEnum.SIDE, LayoutModeEnum.MIX, LayoutModeEnum.TOP].map((item) => `layout-mode-${item}`)
  layoutClasses.forEach((className) => rootClassList.contains(className) && rootClassList.remove(className))
  rootClassList.add(`layout-mode-${settingStore.layoutMode}`)
})
</script>

<style lang="scss" scoped></style>
