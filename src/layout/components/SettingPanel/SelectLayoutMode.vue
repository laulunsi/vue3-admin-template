<template>
  <div class="select-layout-mode">
    <el-tooltip content="侧栏模式">
      <el-container class="layout-mode side" :class="{ active: isSide }">
        <el-aside />
        <el-container>
          <el-header />
          <el-main />
        </el-container>
      </el-container>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SelectLayoutMode' })

const isSide = ref(true)
</script>

<style lang="scss" scoped>
.select-layout-mode {
  display: flex;
  justify-content: space-between;
}

.layout-mode {
  width: 60px;
  flex-grow: 0;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid transparent;
  overflow: hidden;
  &:hover {
    border: 2px solid var(--el-color-primary);
  }
}

.active {
  border: 2px solid var(--el-color-primary);
}

.el-header {
  height: 12px;
}

.el-aside {
  width: 16px;
}

/* 侧栏布局的样式 */
.side {
  .el-header {
    background-color: var(--el-fill-color-darker);
  }
  .el-aside {
    background-color: var(--app-menu-bg-color);
  }
  .el-main {
    background-color: var(--el-fill-color-lighter);
  }
}
</style>
