<template>
  <div class="app-content">
    <el-alert show-icon title="图片与视频暂未联动服务器，不过预留了自定义上传的方法" type="warning" effect="dark" />

    <el-row>
      <el-button type="success" plain @click="handleCopy">复制内容</el-button>
    </el-row>

    <Editor v-model="content" :height="350" />
  </div>
</template>

<script setup lang="ts">
import { copyText } from '@/utils/download'

defineOptions({ name: 'RichEditor' })

const content = ref<string>()

function handleCopy() {
  copyText(content.value || '')
  useModal().msgSuccess(`富文本内容复制成功`)
}
</script>

<style lang="scss" scoped>
.el-row {
  margin: 16px 0;
}
</style>
