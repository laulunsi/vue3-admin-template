import { getLayoutConfig } from '@/utils/cache/local-storage'

/** 项目配置类型 */
export interface LayoutConfig {
  /** 是否显示 Settings Panel */
  showSetting: boolean
  /** 是否显示灰色模式 */
  showGreyMode: boolean
  /** 是否显示色弱模式 */
  showColorWeakness: boolean
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

/** 默认配置 */
const defaultSetting: LayoutConfig = {
  showSetting: false,
  showGreyMode: false,
  showColorWeakness: false,
  showBreadcrumb: true,
  showLogo: true,
  showScreenfull: true,
  showTagsView: true,
  fixedHeader: true,
  transitionName: 'fade-transform',
}

/** 合并后的配置 */
export default Object.assign(defaultSetting, getLayoutConfig())
