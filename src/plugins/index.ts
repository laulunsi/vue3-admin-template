import type { App } from 'vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import registerElementPlusIcon from './element-plus-icon'

export default {
  install(app: App) {
    /** 注册 ElementPlus 提供的常用图标集合 */
    app.use(registerElementPlusIcon)

    /** 解决 v-html 指令潜在的 xss 攻击 v-dompurify-html */
    app.use(VueDOMPurifyHTML)
  },
}
