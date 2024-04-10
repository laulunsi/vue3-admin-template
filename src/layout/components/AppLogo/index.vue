<template>
  <div class="app-logo-container flex items-center justify-center">
    <transition name="app-logo-fade">
      <!-- 侧栏折叠状态 -->
      <router-link v-if="collapse" key="collapse" to="/" class="app-logo-link">
        <img v-if="logoImg" :src="logoImg" class="app-logo" draggable="false" />
        <h1 v-else class="app-logo-text">{{ title }}</h1>
      </router-link>

      <!-- 侧栏展开状态 -->
      <router-link v-else key="expand" to="/" class="app-logo-link">
        <img v-if="logoImg" :src="logoImg" class="app-logo" alt="logo" draggable="false" />
        <h1 class="app-logo-text">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppLogo' })
import logoImg from '@/assets/images/logo.png'

defineProps({ collapse: { type: Boolean, required: true } })

const title = computed(() => import.meta.env.VITE_APP_TITLE)
</script>

<style lang="scss" scoped>
.app-logo-container {
  height: var(--navbar-height);
  overflow: hidden;

  .app-logo-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--el-color-white);

    .app-logo {
      width: 32px;
      height: 32px;
    }

    .app-logo-text {
      white-space: nowrap;
      margin-left: 4px;
      font-weight: 600;
      font-size: 14px;
    }
  }
}
</style>
