<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <h1>后台管理系统登录</h1>
      <el-form-item
        label="手机号"
        prop="phone"
      >
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="form.password"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="isLoginLoading"
          @click="onSubmit"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/services/user'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        phone: '123456',
        password: '123456'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // { len: 11, message: '请输入正确的手机号', trigger: 'blur' }
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度应为 6 - 18 位', trigger: 'blur' }
        ]
      },
      // 24 用来设置按钮的加载状态，用来避免重复发送登录请求
      isLoginLoading: false
    }
  },
  methods: {
    // 21. 登录功能
    async onSubmit () {
      try {
        // 21.1 设置校验成功后的功能（请求）
        await this.$ref.form.validate()

        this.isLoginLoading = true
        // 22.1 发送请求
        // const { data } = await request({
        // method: 'POST',
        //   header: { 'content-tyle': 'application/x-www-form-urlencoded'}, 通过这个方式，也能设置发送的请求为 urlencoded 格式
        // url: '/front/user/login',
        // 后台需要接收的是 urlencoded 格式（例：名=值&名=值）
        // 可以使用 qs 模块，用来将对象装换为 urlencoded 格式（他人写的模块，需使用 npm 下载）
        // data: qs.stringify(this.from)
        // })
        const { data } = await login(this.form)
        this.isLoginLoading = false // 发送请求成功后，再将按钮设置为可点击

        if (data.state === 1) {
          // 23 element 给Vue实例中注册了一个 $message 组件, 用来设置消息提示框
          this.$message.success(data.message)
          // 将用户信息存储到 Vuex 中
          this.$store.commit('setUser', data.content)
          // 跳转上次访问的页面
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          this.$message.error(data.message)
        }
      } catch (err) {
        // 21.2 设置校验失败后的功能（请求）
        console.log('验证错误')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  // 设置内部元素垂直水平居中
  justify-content: center;
  align-items: center;

  .el-form {
    background-color: #ffe;
    padding: 20px;
    width: 300px;
    border-radius: 10px;

    .el-button {
      width: 100%;
    }
  }
}
</style>
