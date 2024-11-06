<template>
  <div class="menu-create-or-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-page-header @back="goBack" :content="isEdit ? '编辑菜单' : '添加菜单'">
        </el-page-header>
        <!-- <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span> -->
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="href">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <!-- 无上级菜单 -->
            <el-option
              label="无上级菜单"
              :value="-1"
            ></el-option>
            <!-- 选择一级菜单 -->
            <el-option
              v-for="item in parentMenuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" prop="shown">
          <el-radio-group v-model="form.shown">
            <!-- label 的数据会在选择后设置给 v-model 的 shown -->
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getEditMenuInfo, createOrEditMenu } from '@/services/menu'

export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      // 默认为添加功能
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      // 储存上级菜单数据
      parentMenuList: [],
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        href: [
          { required: true, message: '请输入菜单路径', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择上级菜单', trigger: 'blur' }
        ],
        shown: [
          { required: true, message: '请选择是否显示', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 加载上级菜单
    this.loadMenuInfo()
  },
  methods: {
    async loadMenuInfo () {
      const id = this.$route.params.id || -1
      const { data } = await getEditMenuInfo(id)
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
        if (data.data.menuInfo) {
          this.form = data.data.menuInfo
        }
      }
    },
    async onSubmit () {
      // 1. 表单验证
      await this.$refs.form.validate()
      // 2. 发送请求
      const { data } = await createOrEditMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'menu'
        })
      }
    },
    goBack () {
      // 接收之前路由传递过来的分页信息：页号和页大小
      // 返回到上一级菜单展示页面
      this.$router.push({
        name: 'menu',
        params: {
          page: this.$route.params.page || 1,
          size: this.$route.params.size || 10
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
