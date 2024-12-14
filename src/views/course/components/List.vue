<template>
  <div class="course-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
          <el-form-item label="课程名称">
            <el-input v-model="queryForm.courseName" placeholder="课程名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="queryForm.status" placeholder="活动区域" :disabled="isLoading">
              <el-option label="全部" value=""></el-option>
              <el-option label="上架" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" :disabled="isLoading">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" height="180" @click="addOrEditCourse(-1)" icon="el-icon-plus">新建课程</el-button>
      </div>
      <el-table :data="courses" style="width: 100%" v-loading="isLoading">
        <el-table-column prop="id" label="ID" width="60">
        </el-table-column>
        <el-table-column prop="courseName" label="课程名称" width="260">
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
        <el-table-column prop="rank" label="排序">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949" active-value="1"
              inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button :type="scope.row.status === '1' ? 'danger' : 'success'"
              @click="undisplayCourse(scope.row.id)"
            >{{ scope.row.status === '0' ? '下架' : '上架' }}</el-button>
            <el-button
              @click="addOrEditCourse(scope.row.id)"
            >编辑</el-button>
            <el-button
              @click="handleCourseContent(scope.row.id)"
            >内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        align="center"
        :disabled="isLoading"
        :current-page="queryForm.currentPage"
        :page-size="queryForm.pageSize"
        :page-sizes="sizeList"
        :pager-count="5"
        layout="prev, pager, next, sizes"
        :total="queryForm.total"
        @size-change="changePageSize"
        @current-change="reloadCourseList">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getCoursesSelective } from '@/services/course'

export default {
  name: 'CourseList',
  created () {
    // this.initCourseList()
  },
  data () {
    return {
      queryForm: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 20,
        total: 1000

      },
      sizeList: [10, 20, 30, 40, 50],
      isLoading: false,
      courses: [
        { id: 1, courseName: 'java 程序设计', price: '10', rank: '1', status: '1' },
        { id: 2, courseName: '嵌入式系统', price: '9.9', rank: '2', status: '1' },
        { id: 3, courseName: 'Vue.js 框架', price: '8.8', rank: '3', status: '0' }
      ]
    }
  },
  methods: {
    async initCourseList () {
      this.isLoading = true
      const data = await getCoursesSelective(this.queryForm)
      if (data.code === '000000') {
        this.courses = data.data
        this.queryForm.currentPage = 1
        this.queryForm.total = data.data.total
      }
      this.isLoading = false
    },
    changePageSize () {
      this.initCourseList()
    },
    reloadCourseList () {
      this.initCourseList()
    },
    addOrEditCourse (courseId) {
      if (courseId === -1) {
        this.$router.push({
          name: 'course-create'
        })
      } else {
        this.$router.push({
          name: 'course-edit',
          params: {
            courseId
          }
        })
      }
      // this.$message.info(routeObj)
      // console.log(routeObj)
    },
    handleCourseContent (courseId) {
      this.$router.push({
        name: 'course-section',
        params: {
          courseId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.clearfix {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
</style>
