import request from '@/utils/request'

// 接口-获取所有角色信息
export const getAllRoles = data => {
  return request({
    method: 'GET',
    url: '/role/getAll',
    data
  })
}

// 接口-根据用户id获取用户信息
export const getRoleById = id => {
  return request({
    method: 'GET',
    url: `/role/${id}`
  })
}

// 接口-新增角色信息和更新角色信息
export const saveOrEditRole = data => {
  return request({
    method: 'POST',
    url: '/role/saveoredit',
    data
  })
}
