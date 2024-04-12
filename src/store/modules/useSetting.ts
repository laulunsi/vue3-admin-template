import defaultSetting, { LayoutConfig } from '@/config/defaultSetting'

export default defineStore('setting', () => {
  const state: LayoutConfig = reactive(defaultSetting)

  return state
})
