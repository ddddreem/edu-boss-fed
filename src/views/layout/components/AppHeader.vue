<template>
  <div class="app-header">
    <!-- 左侧面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 18. 右侧用户信息展示 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <!-- 18.1 用户头像使用 Avatar 组件 -->
        <el-avatar
          :size="30"
          :src="userInfo.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <!-- 默认添加事件不会添加在当前元素上，需要加上.native 才能将事件添加到底层结构上 -->
        <el-dropdown-item
          divided
          @click.native="handleLogout"
          >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/user'

export default {
  name: 'AppHeader',
  created () {
    // 加载用户信息
    this.loadUserInfo()
  },
  data () {
    return {
      userInfo: null
    }
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    handleLogout () {
      this.$store.commit('setUser', null)
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
}
</style>
