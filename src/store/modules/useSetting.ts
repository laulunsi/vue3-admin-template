type TransitionName = 'fade-transform' | 'el-fade-in' | 'el-fade-in-linear' | 'el-zoom-in-top' | 'el-zoom-in-center' | 'el-zoom-in-bottom'

export default defineStore('setting', () => {
  /** 是否显示 Settings Panel */
  const showSetting = ref<boolean>(false)
  /** 是否显示 Logo */
  const showLogo = ref<boolean>(true)
  /** 是否固定 Header */
  const fixedHeader = ref<boolean>(true)
  /** 是否显示面包屑导航 */
  const showBreadcrumb = ref<boolean>(true)
  /** 是否显示标签栏 */
  const showTagsView = ref<boolean>(true)
  /** 是否显示全屏按钮 */
  const showScreenfull = ref<boolean>(true)

  const transitionName = ref<TransitionName>('el-zoom-in-bottom')

  return { showSetting, showLogo, fixedHeader, showBreadcrumb, showTagsView, showScreenfull, transitionName }
})
