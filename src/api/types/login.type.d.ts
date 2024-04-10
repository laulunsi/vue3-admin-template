/** 账号登录所需要的参数类型 */
interface LoginParams {
  account: string
  password: string
  captcha: string
  uuid: string
  rememberMe: boolean
}
