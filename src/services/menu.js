import request from '@/utils/request'

// 接口-获取编辑菜单页面信息，获取上一级菜单信息
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

// 接口-添加菜单
export const createOrEditMenu = data => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 接口-获取所有菜单
export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

// 接口-删除菜单
export const deleteMenu = id => {
  return request({
    method: 'DELETE',
    url: `/bos/menu/${id}`
  })
}
