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

// 接口-根据id删除指定的用户记录
export const deleteRoleById = id => {
  return request({
    method: 'DELETE',
    url: `/role/delete/${id}`
  })
}

// 接口-根据用户id获取用户已经分配的菜单
export const getRoleMenusById = id => {
  return request({
    method: 'GET',
    url: `/role/alloc/${id}`
  })
}

// 接口-根据用户id获取用户已经分配的资源
export const getRoleResourcesById = id => {
  return request({
    method: 'GET',
    url: `/role/allocresource/${id}`
  })
}

// 接口-获取所有菜单
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/role/getAllMenus'
  })
}

// 接口-获取所有资源
export const getResourceNodeList = () => {
  return request({
    method: 'GET',
    url: '/role/getAllResources'
  })
}

// 接口-分配用户菜单
export const allocateRoleMenus = data => {
  return request({
    method: 'POST',
    url: '/role/allocRoleMenus',
    data
  })
}

// 接口-分配用户资源
export const allocateRoleResources = data => {
  return request({
    method: 'POST',
    url: '/role/allocRoleResources',
    data
  })
}
