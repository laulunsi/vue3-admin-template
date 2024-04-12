<template>
  <div class="select-layout-mode">
    <el-tooltip content="侧栏模式">
      <el-container class="layout-mode side" :class="{ active: isSide }" @click="setLayoutMode(LayoutModeEnum.SIDE)">
        <el-aside />
        <el-container>
          <el-header />
          <el-main />
        </el-container>
      </el-container>
    </el-tooltip>

    <el-tooltip content="顶部模式">
      <el-container class="layout-mode top" :class="{ active: isTop }" @click="setLayoutMode(LayoutModeEnum.TOP)">
        <el-header />
        <el-main />
      </el-container>
    </el-tooltip>

    <el-tooltip content="混合模式">
      <el-container class="layout-mode mix" :class="{ active: isMix }" @click="setLayoutMode(LayoutModeEnum.MIX)">
        <el-header />
        <el-container>
          <el-aside />
          <el-main />
        </el-container>
      </el-container>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SelectLayoutMode' })
import { LayoutModeEnum } from '@/enums'

const isSide = ref(true)
const isTop = ref(false)
const isMix = ref(false)

function setLayoutMode(layoutMode: LayoutModeEnum) {
  useModal().msgWarning(`${layoutMode} 布局正在努力开发中...`)
}
</script>

<style lang="scss" scoped>
.select-layout-mode {
  display: flex;
  justify-content: center;
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
  & ~ .layout-mode {
    margin-left: 16px;
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
    background-color: var(--el-color-primary);
  }
  .el-main {
    background-color: var(--el-fill-color-lighter);
  }
}
/* 顶部布局的样式 */
.top {
  .el-header {
    background-color: var(--el-color-primary);
  }
  .el-main {
    background-color: var(--el-fill-color-lighter);
  }
}
/* 混合布局的样式 */
.mix {
  .el-header {
    background-color: var(--el-fill-color-darker);
  }
  .el-aside {
    background-color: var(--el-color-primary);
  }
  .el-main {
    background-color: var(--el-fill-color-lighter);
  }
}
</style>
