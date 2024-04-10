import type { RouteRecordRaw } from 'vue-router'

export class LoginService {
  /** 登录并返回 Token */
  static login(data: LoginParams): ApiResult<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ code: 200, message: '请求成功', success: true, timestamp: Date.now(), result: '录并返回 Token' }), 3000)
    })
  }

  /** 获取路由信息 */
  static getRoutes(): ApiResult<RouteRecordRaw[]> {
    return new Promise((resolve, reject) => {
      resolve({ code: 200, message: '请求成功', success: true, timestamp: Date.now(), result: [] })
    })
  }

  /** 退出登录 */
  static logout(): ApiResult<string> {
    return new Promise((resolve, reject) => {
      resolve({ code: 200, message: '请求成功', success: true, timestamp: Date.now(), result: '退出登录成功' })
    })
  }
}
