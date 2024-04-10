<template>
  <div class="login-container w-full h-full flex justify-center items-center">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login-form">
      <h3 class="title text-center">{{ title }}</h3>
      <el-form-item prop="account">
        <el-input v-model="loginForm.account" type="text" auto-complete="off" placeholder="账号">
          <template #prefix> <i class="iconfont icon-User"></i> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" show-password auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <template #prefix> <i class="iconfont icon-Lock"></i> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="loginForm.captcha" auto-complete="off" placeholder="验证码" style="width: 65%" @keyup.enter.native="handleLogin">
          <template #prefix> <i class="iconfont icon-Guard"></i> </template>
        </el-input>
        <div class="login-code" @click="getCaptchaCode" style="width: 33%">
          <p v-if="captchaURL" v-html="captchaURL" class="login-code-img"></p>
          <img v-else src="../../assets/images/no-captcha.png" class="login-code-img h-full" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
      <el-form-item>
        <el-button :loading="loading" type="primary" class="w-full" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

    <!--  底部  -->
    <div class="login-footer w-full text-center">
      <!-- <span>Copyright © 2008-2023 sky.vip All Rights Reserved.</span> -->
      <span>少时，春风得意马蹄疾，不信人间有别离。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Login' })
// import Cookies from 'js-cookie'
// import { getCaptcha, login } from '@/api/login.api'
import { IsDevelopment } from '@/config/constants'
// import { CacheKeyEnum } from '@/enums'
import { timeFix, welcome } from '@/utils'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUser()

/** 计算需要跳转的路径 */
const redirect = (route.query.redirect as string) || '/'

/** 应用默认标题 */
const title = computed(() => import.meta.env.VITE_APP_TITLE)
/** 表单实例 */
const loginFormRef = ref<FormInstance>()
/** 登录状态 */
const loading = ref<boolean>(false)
/** 验证码链接 */
const captchaURL = ref<string>('')
/** 登录表单 */
const loginForm = ref<Partial<LoginParams>>({})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  account: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  captcha: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
}

function handleRememberMe() {
  // if (loginForm.value.rememberMe) {
  //   const { account, password, rememberMe } = loginForm.value
  //   localStorage.setItem(CacheKeyEnum.LOGIN_REMEMBER_ME, JSON.stringify({ account, password, rememberMe }))
  // } else {
  //   localStorage.removeItem(CacheKeyEnum.LOGIN_REMEMBER_ME)
  // }
}
function handleLoadRememberMe() {
  // const jsonString = localStorage.getItem(CacheKeyEnum.LOGIN_REMEMBER_ME)
  // jsonString && Object.assign(loginForm.value, JSON.parse(jsonString))
}

/** 处理获取验证码的回调 */
async function getCaptchaCode() {
  // const data = await getCaptcha()
  // captchaURL.value = data.result.img
  // loginForm.value.uuid = data.result.uuid
}

/** 处理登录按钮的回调 */
async function handleLogin() {
  try {
    await loginFormRef.value?.validate()
    loading.value = true
    await userStore.login(loginForm.value as LoginParams)
    if (loginForm.value.rememberMe) handleRememberMe()
    loading.value = false
    await router.replace({ path: redirect })
    ElNotification({ title: '登录成功', type: 'success', message: `${timeFix()}，${welcome()}` })
  } catch (error) {
    console.log('error: ', error) // for debug
    loading.value = false
    loginForm.value.captcha = ''
    getCaptchaCode()
  }
}

/** created */
getCaptchaCode()
handleLoadRememberMe()
</script>

<style lang="scss" scoped>
.login-container {
  --input-height: 38px;

  /* 固定背景 防止滚动失效 */
  &::before {
    content: '';
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/login-bg.jpg');
  }
  :deep(.el-input__wrapper) {
    background-color: #f9f9f9;
  }
  .login-form {
    width: 400px;
    padding: 25px 25px 5px 25px;
    border-radius: 6px;
    background-color: #f3f3f3;
    .el-input {
      height: var(--input-height);
    }
    .title {
      margin: 0px auto 30px auto;
      color: #707070;
      font-weight: bold;
      font-size: 20px;
      letter-spacing: 3px;
    }
    .login-code {
      cursor: pointer;
      height: var(--input-height);
      margin-left: auto;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow: hidden;
      .login-code-img {
        width: 100%;
        // overflow: hidden;
      }
    }
  }

  .login-footer {
    position: fixed;
    bottom: 0;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 12px;
    letter-spacing: 1px;
  }
}
</style>
