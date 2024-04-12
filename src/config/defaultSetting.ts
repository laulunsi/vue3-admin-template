import { getLayoutConfig } from '@/utils/cache/local-storage'

export interface LayoutConfig {
  /** 是否显示 Settings Panel */
  showSetting: boolean
  /** 是否显示 Logo */
  showLogo: boolean
  /** 是否固定 Header */
  fixedHeader: boolean
  /** 是否显示面包屑导航 */
  showBreadcrumb: boolean
  /** 是否显示标签栏 */
  showTagsView: boolean
  /** 是否显示全屏按钮 */
  showScreenfull: boolean
  /** 内容区域转场动效 */
  transitionName: 'fade-transform' | 'el-fade-in' | 'el-fade-in-linear' | 'el-zoom-in-top' | 'el-zoom-in-center' | 'el-zoom-in-bottom'
}

type CacheLayoutConfig = Omit<LayoutConfig, 'showSetting'>

const defaultSetting: LayoutConfig = {
  showSetting: false,
  showBreadcrumb: true,
  showLogo: true,
  showScreenfull: true,
  showTagsView: true,
  fixedHeader: true,
  transitionName: 'fade-transform',
}

export default Object.assign(defaultSetting, getLayoutConfig())
