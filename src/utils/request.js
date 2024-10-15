import axios from 'axios'

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
  return config
})

export default request
