import { getToken, removeToken } from '@/utils/cache/local-storage'

export default defineStore('user', () => {
  const token = ref<string>(getToken())
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])
  const avatar = ref(`https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80`)

  function logout() {
    token.value = ''
    removeToken()
  }

  return { token, roles, permissions, avatar, logout }
})
