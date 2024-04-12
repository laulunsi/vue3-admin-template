<template>
  <div class="editor-container">
    <Toolbar class="editor-container__toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" />
    <Editor v-model="modelValue" :style="styles" :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated" @customPaste="handleCustomPaste" />
  </div>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IEditorConfig, IDomEditor, IToolbarConfig } from '@wangeditor/editor'
import toolbarKeys from './toolbarKeys'
import { CSSProperties } from 'vue'

/** 父子双向绑定数据字段 */
const modelValue = defineModel({ default: '', type: String })

const props = defineProps({
  /** 工具栏中需要隐藏的菜单的 key */
  excludeToolBar: { type: Array as PropType<Array<WangEditorToolbarKey>>, default: ['fullScreen', 'redo', 'undo'] },
  /** 编辑器为空时的提示字符 */
  placeholder: { type: String, default: '请输入内容...' },
  /** 编辑器是否只读 */
  readOnly: { type: Boolean, default: false },
  /** 编辑器内容区域高度 */
  height: { type: Number, default: 300 },
})

/** 编辑器实例，必须用 shallowRef */
const editorRef = shallowRef<IDomEditor>()
/** 工具栏配置 */
const toolbarConfig: Partial<IToolbarConfig> = { toolbarKeys, excludeKeys: props.excludeToolBar, modalAppendToBody: false }
/** 编辑器配置 */
const editorConfig = ref<Partial<IEditorConfig>>({
  readOnly: props.readOnly,
  placeholder: props.placeholder,
  MENU_CONF: {
    uploadImage: { customUpload: handleImageUpload }, // 自定义图片上传逻辑
    uploadVideo: { customUpload: handleVideoUpload }, // 自定义视频上传逻辑
  },
})

/** 富文本编辑器生成后触发 */
const handleCreated = (editor: IDomEditor) => (editorRef.value = editor)
const styles = computed<CSSProperties>(() => ({ height: `${props.height}px`, overflow: 'hidden' }))

/** 自定义图片上传逻辑 */
async function handleImageUpload(file: File, insertFn: (fileURL: string, type: string) => void) {
  const fileSize = file.size // 单位 bit
  const blobURL = URL.createObjectURL(file) // 此处可以替换为真正的图片上传逻辑
  insertFn(blobURL, 'img') // 调用inserFn函数将url加载到富文本编辑器中
}

/** 自定义视频上传逻辑 */
async function handleVideoUpload(file: File, insertFn: (fileURL: string, type: string) => void) {
  console.log('上传视频', file)
}

/**
 * 自定义粘贴。可阻止编辑器的默认粘贴，实现自己的粘贴逻辑
 * https://www.wangeditor.com/v5/editor-config.html#custompaste
 */
function handleCustomPaste(editor: IDomEditor, event: ClipboardEvent, callback: (status: boolean) => void) {
  // event 是 ClipboardEvent 类型，可以拿到粘贴的数据 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent
  callback(true)
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => editorRef.value && editorRef.value.destroy())
</script>

<style lang="scss" scoped>
.editor-container {
  border: 1px solid var(--el-border-color);

  &__toolbar {
    border-bottom: 1px solid var(--el-border-color);
  }
}

:deep(.w-e-text-container) {
  em {
    font-style: italic;
  }
  strong {
    font-weight: bold;
  }
  em strong {
    font-style: italic;
  }
  h1 {
    font-size: 2em;
    font-weight: bold;
  }
  h2 {
    font-size: 1.5em;
    font-weight: bold;
  }
  h3 {
    font-size: 1.17em;
    font-weight: bold;
  }
  h4 {
    font-weight: bold;
  }
  h5 {
    font-size: 0.83em;
    font-weight: bold;
  }
  h6 {
    font-size: 0.67em;
    font-weight: bold;
  }
}
</style>
