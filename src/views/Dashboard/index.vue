<template>
  <div class="app-content">
    <p v-for="(item, index) in 999" :key="index">{{ item }}、Dashboard</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
</script>

<style lang="scss" scoped>
.app-content {
  height: 90vh;
}
</style>
