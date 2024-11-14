import request from '@/utils/request'

// 接口-按条件分页查询资源接口
export const getResourcePages = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 接口-获取所有的资源分类信息
export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

// 接口-新增资源
export const createOrEditResource = data => {
  return request({
    method: 'POST',
    url: '/boss/resource/createOrEditResource',
    data
  })
}

// 接口-删除资源
export const deleteResource = id => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

// 接口-根据资源id获取资源
export const getResourceById = id => {
  return request({
    method: 'GET',
    url: `/boss/resource/getResourceById/${id}`
  })
}
