<template>
  <div class="create-or-edit-course">
    <div class="msg-header">
      <el-page-header @back="goBack" :content="isEdit ? '编辑课程' : '新增课程'">
      </el-page-header>
      <el-button type="primary">保存</el-button>
    </div>
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div> -->
      <!-- <div class="form-body"> -->
        <!-- <el-tabs
          tab-position="left"
          v-model="activeTag"
          size="middle"
          @tab-click="tabHandle">
          <el-tab-pane label>基本信息</el-tab-pane>
          <el-tab-pane>课程封面</el-tab-pane>
          <el-tab-pane>销售信息</el-tab-pane>
          <el-tab-pane>秒杀信息</el-tab-pane>
          <el-tab-pane>课程详情</el-tab-pane>
        </el-tabs> -->
      <!-- <el-steps direction="vertical" :active="1">
        <el-step title="基本信息" status="success"></el-step>
        <el-step title="课程封面"></el-step>
        <el-step title="销售信息"></el-step>
        <el-step title="秒杀信息"></el-step>
        <el-step title="课程详情"></el-step>
      </el-steps> -->
      <el-divider content-position="left">基本信息</el-divider>
      <!-- 步骤对应的表单结构 -->
      <el-form label-width="80px">
        <!-- 基本信息 -->
        <div>
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input v-model="course.previewFirstField" placeholder="概述1"
              style="width: 49%;min-width: 300px; margin-right: 15px;">
              <template slot="append">{{ course.previewFirstField.length }}/20</template>
            </el-input>
            <el-input v-model="course.previewSecondField" placeholder="概述2"
              style="width: 49%;min-width: 300px;"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number v-model="course.sortNum" label="描述文字" controls-position="right"></el-input-number>
          </el-form-item>
        </div>
        <el-divider content-position="left">课程封面</el-divider>
        <!-- 课程封面 -->
        <div>
          <!-- 封装为图片上传组件 -->
          <course-image v-model="course.courseListImg" label="课程封面" :limit="3"></course-image>
          <course-image v-model="course.courseImgUrl" label="解锁封面"></course-image>
        </div>
        <el-divider content-position="left">销售信息</el-divider>
        <!-- 销售信息 -->
        <div>
          <el-form-item label="售卖价格">
            <el-input v-model="course.discounts" type="number" :min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model="course.price" type="number" :min="0">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model="course.sales" type="number" :min="0">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="course.discountsTag"></el-input>
          </el-form-item>
        </div>
        <el-divider content-position="left">秒杀信息</el-divider>
        <!-- 秒杀信息 -->
        <div>
          <el-form-item label="限时秒杀开关" label-width="120px">
            <el-switch v-model="course.activityCourse" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <template v-if="course.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker v-model="course.activityCourseDTO.beginTime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker v-model="course.activityCourseDTO.endTime" type="datetime" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input v-model="course.activityCourseDTO.amount" type="number" :min="0">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="库存">
              <el-input v-model="course.activityCourseDTO.stock" type="number" :min="0">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <el-divider content-position="left">课程详情</el-divider>
        <!-- 课程详情 -->
        <div>
          <el-form-item label="课程详情">
            <text-editor v-model="course.courseDescriptionMarkDown"></text-editor>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-switch v-model="course.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
              :inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button>取消</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </div>
        <!-- 下一步按钮 -->
        <!-- <el-form-item>
          <el-button @click="activeStep++">下一步</el-button>
        </el-form-item> -->
      </el-form>
      <!-- </div> -->
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'CreateOrEditCourse',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      course: {
        courseName: '',
        brief: '',
        previewFirstField: '',
        previewSecondField: '',
        teacherDTO: {
          teacherName: '',
          description: ''
        },
        sortNum: '',
        courseListImg: '',
        courseImgUrl: '',
        discounts: '',
        price: '',
        sales: '',
        discountsTag: '',
        activityCourse: '',
        activityCourseDTO: {
          endTime: '',
          amount: '',
          stock: ''
        },
        courseDescriptionMarkDown: '',
        status: ''
      },
      activeStep: 3,
      steps: 6
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        name: 'course'
      })
    },
    handleSave () {
      console.log('test')
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.form-body {
  display: flex;
  height: 100%;
  // justify-items: space-between;
}
</style>
