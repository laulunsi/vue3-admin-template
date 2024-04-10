<template>
  <div class="navbar relative w-full flex items-center">
    <!-- 侧栏折叠控制 -->
    <Hamburger class="menu-item hamburger" @toggleClick="appStore.toggleSidebar" />
    <!-- 面包屑导航 -->
    <Breadcrumb class="breadcrumb-container" v-if="appStore.isDesktop && settingStore.showBreadcrumb" />
    <div class="right-menu flex items-center h-full">
      <!-- 全屏控件 -->
      <Screenfull class="menu-item" v-if="settingStore.showScreenfull" />
      <!-- 个人中心 -->
      <el-dropdown class="menu-item">
        <el-image :src="userStore.avatar" fit="fill" class="avatar" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push({ path: `/user/profile` })">个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Navbar' })
import Hamburger from '../Hamburger/index.vue'
import Breadcrumb from '../Breadcrumb/index.vue'

const route = useRoute()
const router = useRouter()
const appStore = useApp()
const userStore = useUser()
const settingStore = useSetting()

/** 退出登录 */
async function logout() {
  try {
    await useModal().confirm('确定要退出系统吗？')
    await userStore.logout()
    window.location.reload()
  } catch (error) {
    console.log('error: ', error)
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: var(--navbar-height);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  overflow: hidden;
}

.right-menu {
  margin-left: auto;

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 4px;
  }
}
.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  transition: background-color 0.3s;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 21, 41, 0.08);
  }

  &.icon-Refresh {
    font-size: 20px;
  }
}
</style>
