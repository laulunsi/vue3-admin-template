import { LoginService } from '@/api/login.api'
import { setToken, getToken, removeToken } from '@/utils/cache/local-storage'

export default defineStore('user', () => {
  const token = ref<string>(getToken())
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])
  const avatar = ref(`https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80`)

  /** 登录并返回 Token */
  async function login(loginParams: LoginParams) {
    const data = await LoginService.login(loginParams)
    token.value = data.result
    setToken(token.value)
  }

  /** 退出登录 */
  async function logout() {
    await LoginService.logout()
    token.value = '' // 重置 user 仓库的数据
    roles.value = []
    permissions.value = []
    removeToken() // 移除缓存中的 token
    const tagsViewStore = useTagsView() // 清空缓存的标签数据
    tagsViewStore.delAllVisitedViews()
    tagsViewStore.delAllCachedViews()
  }

  return { token, roles, permissions, avatar, login, logout }
})
