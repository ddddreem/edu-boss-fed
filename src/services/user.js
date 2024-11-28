// 目的是为了统一管理接口，方便集中管理，功能的可维护性会更高
import request from '@/utils/request'
import qs from 'qs'

// 用户登录接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

// 用户信息接口
export const userInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

export const getUserPages = data => {
  return request({
    method: 'POST',
    url: '/user/getUserPages',
    data
  })
}

export const forbidUser = id => {
  return request({
    method: 'POST',
    url: `/user/forbidUser/${id}`
  })
}
