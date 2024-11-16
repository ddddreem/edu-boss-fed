<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" :model="form">
          <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              v-loading="isLoading"
            >查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 显示对话框 -->
      <el-button @click="handleAdd">添加角色</el-button>
      <el-table
        :data="roles"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column
          prop="id"
          label="编号"
        />
        <el-table-column
          prop="name"
          label="角色名称"
        />
        <el-table-column
          prop="description"
          label="描述"
        />
        <el-table-column
          prop="createdTime"
          label="添加时间"
        />
        <el-table-column
          label="操作"
          align="center"
          width="150px"
        >
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="$router.push({
                  name: 'alloc-menu',
                  params: {
                    roleId: scope.row.id
                  }
                })"
              >分配菜单</el-button>
              <el-button
                type="text"
              >分配资源</el-button>
            </div>
            <div>
              <el-button
                type="text"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加角色的对话框结构 -->
      <el-dialog
        :title="isEdit ? '编辑角色' : '添加角色'"
        :visible.sync="dialogVisible"
        width="30%">
        <!-- 将添加与编辑功能单独封装到组件中 -->
        <create-or-edit
          :is-edit="isEdit"
          :role-id="roleId"
          @success="handleSuccess"
          @cancel="handleCancel"
        ></create-or-edit>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getAllRoles } from '@/services/role'
import CreateOrEdit from './CreateOrEdit'

export default {
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data () {
    return {
      form: {
        name: ''
      },
      dialogVisible: false,
      roleId: '',
      isEdit: false,
      isLoading: false,
      roles: [
        { id: 1, name: 'test001', description: 'test0001', createdTime: new Date() }
      ]
    }
  },
  created () {
    // 获取所有的角色信息，并赋值给页面用以展示
    // this.loadAllRoles()
  },
  methods: {
    async loadAllRoles () {
      this.isLoading = true
      const { data } = await getAllRoles(this.form)
      if (data.code === '000000') {
        this.roles = data.data.records
      }
      this.isLoading = false
    },
    handleAdd () {
      this.isEdit = false
      this.dialogVisible = true
    },
    handleEdit (rowData) {
      this.isEdit = true
      this.roleId = rowData.id
      this.dialogVisible = true
    },
    handleDelete () {

    },
    handleCancel () {
      this.dialogVisible = false
    },
    onSubmit () {
      this.loadAllRoles()
    },
    onReset () {
      this.form.name = ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
