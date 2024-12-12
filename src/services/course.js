import request from '@/utils/request'

// 获取所有课程信息
export const getAllCourses = () => {
  return request({
    method: 'GET',
    url: '/course/getAllCourses'
  })
}

//  接口-分页和条件查询接口
export const getCoursesSelective = form => {
  return request({
    method: 'GET',
    url: '/course/getCoursesSelective',
    params: {
      form
    }
  })
}

// 接口-新增或修改课程信息
export const saveOrEditCourse = form => {
  return request({
    method: 'POST',
    url: '/course/saveOrAEditCourse',
    form
  })
}
