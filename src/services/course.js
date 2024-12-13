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

// 接口-上传图片
export const uploadCourseImage = (data, onUploadProgress) => {
  // data 应当为 FormData 对象
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // onUploadProgress 用于检测上传进度
    onUploadProgress
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

// 接口-根据课程id获取课程的详细信息
export const getCourseInfoById = id => {
  return request({
    method: 'GET',
    url: `/course/getCourseInfoById/${id}`
  })
}
