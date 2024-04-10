import type { RouteRecordRaw } from 'vue-router'

export class LoginService {
  static getRoutes(): ApiResult<RouteRecordRaw[]> {
    return new Promise((resolve, reject) => {
      resolve({ code: 200, message: '请求成功', success: true, timestamp: Date.now(), result: [] })
    })
  }
}
