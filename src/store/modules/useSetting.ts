import defaultSetting, { LayoutConfig } from '@/config/defaultSetting'
import { setLayoutConfig, removeLayoutConfig } from '@/utils/cache/local-storage'

export default defineStore('setting', () => {
  const state: LayoutConfig = reactive(defaultSetting)

  /** 处理动态标题 */
  function handleDynamicTitle(title?: string) {
    const staticTitle = useEnv().VITE_APP_TITLE
    document.title = state.dynamicTitle ? `${staticTitle} | ${title}` : staticTitle
  }

  /** 处理保存配置的操作 */
  function saveSetting() {
    useModal().showLoading('正在保存到本地，请稍候...')
    const { showSetting, ...config } = state
    setLayoutConfig(config)
    setTimeout(() => useModal().closeLoading(), 1000)
  }

  /** 处理重置配置的操作 */
  function resetSetting() {
    useModal().showLoading('正在清除设置缓存并刷新，请稍候...')
    removeLayoutConfig()
    setTimeout(() => window.location.reload(), 1000)
  }

  return { ...toRefs(state), saveSetting, resetSetting, handleDynamicTitle }
})
