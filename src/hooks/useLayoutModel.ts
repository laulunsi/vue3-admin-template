import { LayoutModeEnum } from '@/enums'

const settingStore = useSetting()

const isSide = computed(() => settingStore.layoutMode === LayoutModeEnum.SIDE)
const isMix = computed(() => settingStore.layoutMode === LayoutModeEnum.MIX)
const isTop = computed(() => settingStore.layoutMode === LayoutModeEnum.TOP)

function setLayoutMode(layoutMode: LayoutModeEnum) {
  if (layoutMode === LayoutModeEnum.MIX) return useModal().msgWarning(`${layoutMode} 布局正在努力开发中...`)
  settingStore.layoutMode = layoutMode
}

export default () => {
  return { isSide, isTop, isMix, setLayoutMode }
}
