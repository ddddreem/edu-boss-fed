import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'

// create 创建 axios 实例
const request = axios.create({
  timeout: 2000
})

// 判断请求的url地址，并动态加上基地址前缀
function getBaseURL (url) {
  return url.startWith('/boss') ? 'http://eduboss.lagou.com' : 'http://edufront.lagou.com'
}

// 拦截器，用来动态给请求添加基地址前缀
request.interceptors.request.use(function (config) {
  config.baseURL = getBaseURL(config.url)
  const { user } = store.state
  // 统一设置 Token 信息
  if (user && user.access_auth) {
    config.headers.Authorization = user.access_auth
  }
  return config
})

// 跳转到登录页
function redirectLogin () {
  router.push({
    name: '/login',
    query: {
      // currentRoute 存储的是当前路由信息的对象
      redirect: router.currentRoute.fullPath
    }
  })
}

// 存储当前是否有请求在更新 token
// 信号量机制进行线程控制
let isRefreshing = false
// 存储因为等待 token 而挂起的请求
let pendingReqs = []

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码为 2XX 会执行这里面的逻辑
  console.log('响应成功', response)
  return response
}, function (error) {
  // 请求发送成功，响应接收完毕，但是状态码为失败的情况
  if (error.response) {
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) { // token 无效 / 过期
      // 存在多次请求在相同事件进来的情况，出现进程控制问题
      // 1. 通过一个信号量来控制进程，其他进程存储起来，最后统一执行
      // 其他多线程控制手段
      // store 中没有 token 信息，跳转登录页
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 使用 refresh_token 尝试更新 token
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // 判断是否有正在更新 token 的请求
        if (isRefreshing) {
          // 将当次请求存储在请求数组中
          return pendingReqs.push(() => {
            request(error.config)
          })
        }
        // 第一个更新token 的请求需要把 isRefreshing 设置为 true
        isRefreshing = true
        if (res.data.status !== 1) {
          // 更新失败，1. 跳转到登录页重新登录， 2. 保存路由信息以重新登录后跳转
          // a. 清除无效的用户信息
          store.commit('setUser', null)
          // b. 跳转到登录页
          redirectLogin()
          return Promise.reject(error)
        }
        // 更新成功，1. 保存更新后的 token 信息到 Vuex 中， 2. 重新发起请求
        // a. 存储新的 token，新的用户信息中带有新的 token 和 refresh_token 信息
        store.commit('setUser', res.data.content)
        // b. 重发等待的请求
        pendingReqs.forEach(res => res())
        // c. 清空请求等待数组
        pendingReqs = []
        // . 更新token 后，重新发送请求失败的请求
        // -- error.config 本次失败的请求的配置对象
        return request(error.config)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // 请求发送完毕，响应处理完毕，将刷新状态更改为 false 即可
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务器错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) { // 请求发送成功，但是没有收到响应
    Message.error('请求超时，请稍后重试')
  } else { // 意料之外的错误
    Message.error(error.message)
  }
  // 将本次请求的错误对象继续向后抛出，让接收响应的处理函数进行操作
  return Promise.reject(error)
})

export default request
