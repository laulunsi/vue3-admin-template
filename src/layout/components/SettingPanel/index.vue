<template>
  <el-drawer v-model="settingStore.showSetting" size="300px" :with-header="false">
    <div class="setting-container">
      <h2 class="title text-center">布局配置</h2>
      <SelectLayoutMode />

      <el-divider />

      <h2 class="title text-center">功能配置</h2>

      <div class="switch-item">
        <span class="switch-item__label">显示 Logo</span>
        <el-switch v-model="settingStore.showLogo" />
      </div>
      <div class="switch-item">
        <span class="switch-item__label">固定 Header</span>
        <el-switch v-model="settingStore.fixedHeader" />
      </div>
      <div class="switch-item">
        <span class="switch-item__label">动态标题</span>
        <el-switch v-model="settingStore.dynamicTitle" @change="settingStore.handleDynamicTitle(route.meta.title)" />
      </div>
      <div class="switch-item">
        <span class="switch-item__label">面包屑导航</span>
        <el-switch v-model="settingStore.showBreadcrumb" :disabled="isTop" />
      </div>
      <div class="switch-item">
        <span class="switch-item__label">全屏控件</span>
        <el-switch v-model="settingStore.showScreenfull" />
      </div>
      <div class="switch-item">
        <span class="switch-item__label">多标签模式</span>
        <el-switch v-model="settingStore.showTagsView" />
      </div>
      <div class="switch-item">
        <span class="switch-item__label">灰色模式</span>
        <el-switch v-model="settingStore.showGreyMode" @change="settingStore.showColorWeakness = false" />
      </div>
      <div class="switch-item">
        <span class="switch-item__label">色弱模式</span>
        <el-switch v-model="settingStore.showColorWeakness" @change="settingStore.showGreyMode = false" />
      </div>

      <el-divider />

      <div class="btn-container">
        <el-button type="primary" plain icon="DocumentAdd" @click="settingStore.saveSetting">保存配置</el-button>
        <el-button type="danger" plain icon="Refresh" @click="settingStore.resetSetting">重置配置</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
defineOptions({ name: 'SettingPanel' })
import SelectLayoutMode from './SelectLayoutMode.vue'

const route = useRoute()
const settingStore = useSetting()
const { isMix, isSide, isTop } = storeToRefs(settingStore)
</script>

<style lang="scss" scoped>
/** reset element plus style */
.el-divider--horizontal {
  margin: 20px auto;
}

.title {
  margin-bottom: 10px;
  font-weight: bold;
  letter-spacing: 2px;
}
.switch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  font-size: 14px;
  color: var(--el-text-color-regular);
  &__label {
    font-weight: 500;
  }
}

.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
