import { ElLoading, ElMessage, ElMessageBox, ElNotification } from 'element-plus'

/** 消息提示 */
function msg(content: string) {
  ElMessage.info(content)
}

/** 错误消息 */
function msgError(content: string) {
  ElMessage.error(content)
}

/** 成功消息 */
function msgSuccess(content: string) {
  ElMessage.success(content)
}

/** 警告消息 */
function msgWarning(content: string) {
  ElMessage.warning(content)
}

/** 弹出提示 */
function alert(content: string) {
  ElMessageBox.alert(content, '系统提示')
}

/** 错误提示 */
function alertError(content: string) {
  ElMessageBox.alert(content, '系统提示', { type: 'error' })
}

/** 成功提示 */
function alertSuccess(content: string) {
  ElMessageBox.alert(content, '系统提示', { type: 'success' })
}

/** 警告提示 */
function alertWarning(content: string) {
  ElMessageBox.alert(content, '系统提示', { type: 'warning' })
}

/** 通知提示 */
function notify(content: string) {
  ElNotification.info(content)
}

/** 错误通知 */
function notifyError(content: string) {
  ElNotification.error(content)
}

/** 成功通知 */
function notifySuccess(content: string) {
  ElNotification.success(content)
}

/** 警告通知 */
function notifyWarning(content: string) {
  ElNotification.warning(content)
}

/** 确认窗体 */
function confirm(content: string) {
  return ElMessageBox.confirm(content, '系统提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
}

/** 提交内容 */
function prompt(content: string) {
  return ElMessageBox.prompt(content, '系统提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
}

/* 全局请求 loading 的唯一实例 */
let loadingInstance: ReturnType<typeof ElLoading.service>

/** 打开遮罩层 */
function showLoading(content: string = '正在加载...') {
  loadingInstance = ElLoading.service({ lock: true, text: content, background: 'rgba(0, 0, 0, 0.7)' })
}

/** 关闭遮罩层 */
function closeLoading() {
  loadingInstance.close()
}

export default () => {
  return {
    msg,
    msgError,
    msgSuccess,
    msgWarning,
    alert,
    alertError,
    alertSuccess,
    alertWarning,
    notify,
    notifyError,
    notifySuccess,
    notifyWarning,
    confirm,
    prompt,
    showLoading,
    closeLoading,
  }
}
