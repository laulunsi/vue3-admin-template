<template>
  <i class="iconfont icon-Fold" @click="toggleClick"></i>
</template>

<script setup lang="ts">
defineOptions({ name: 'Hamburger' })
const $emits = defineEmits(['toggleClick'])
const toggleClick = () => $emits('toggleClick')
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 24px;
}

.hide-sidebar .iconfont {
  transform: rotate(180deg);
}
</style>
