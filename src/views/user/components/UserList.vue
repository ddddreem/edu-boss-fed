<template>
  <div class="user-list">
    <el-card>
      <div slot="header">
        <el-form
        :inline="true"
        :model="filterParams"
        ref="filter-form">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="filterParams.phone"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="rangeDate">
            <el-date-picker
              v-model="filterParams.rangeDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :disabled="isLoading"
              @click="handleReset"
            >重置</el-button>
            <el-button
              type="primary"
              @click="handleQuery"
              :disabled="isLoading"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="users"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column
          prop="id"
          label="用户ID"
          width="150">
        </el-table-column>
        <el-table-column
          prop="portrait"
          label="头像"
          width="100">
          <template slot-scope="scope">
            <img width="30px" :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
          <!-- 用户状态操作（服务端没有开放权限，只能演示） -->
        >
          <template slot-scope="scope">
            <span> {{ scope.row.createdTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleForbidUser(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleSelectRole(scope.row)"
            >分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 设置分配角色的 Dialog 组件 -->
      <el-dialog
        title="分配角色"
        :visible.sync="dialogVisible"
        width="50%">
        <!-- 下拉菜单组件位置 -->
        <el-select v-model="roleIdList" multiple placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAllocRole">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getUserPages, forbidUser } from '@/services/user'
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role'

export default {
  name: 'UserList',
  data () {
    return {
      users: [
        { id: 1, name: '用户1', phone: '12345678910', createdTime: new Date() },
        { id: 2, name: '用户1', phone: '12345678910', createdTime: new Date() },
        { id: 3, name: '用户3', phone: '12345678910', createdTime: new Date() },
        { id: 4, name: '用户4', phone: '12345678910', createdTime: new Date() }
      ],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      isLoading: false,
      // 用于控制分配角色对话框是否显示
      dialogVisible: false,
      // 下拉菜单数据
      roles: [],
      // 选中选项的 ID 组成的数组
      roleIdList: [],
      // 当前要进行角色分配的用户 ID
      currentRoleID: null
    }
  },
  created () {
    // this.loadAllUsers()
  },
  methods: {
    async loadAllUsers () {
      this.isLoading = true
      const { rangeDate } = this.filterParams
      if (rangeDate && rangeDate.length) {
        this.filterParams.startCreateTime = rangeDate[0]
        this.filterParams.endCreateTime = rangeDate[1]
      } else {
        this.filterParams.startCreateTime = ''
        this.filterParams.endCreateTime = ''
      }
      const { data } = await getUserPages(this.filterParams)
      if (data === '000000') {
        this.users = data.data.records
        this.isLoading = false
      }
    },
    async handleQuery () {
      this.filterParams.currentPage = 1
      this.loadAllUsers()
    },
    handleReset () {
      this.$refs['filter-form'].resetFields()
      this.handleQuery()
    },
    async handleForbidUser (row) {
      const { data } = await forbidUser(row.id)
      if (data.code === '000000') {
        console.log(data)
      }
    },
    // 点击用户的分配角色按钮
    async handleSelectRole (row) {
      this.dialogVisible = true
      this.currentRoleID = row.id
      // 请求所有角色列表数据
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.roles = data.data
      }
      // 请求当前用户的已分配角色信息
      const { data: data2 } = await getUserRoles(row.id)
      if (data2.code === '000000') {
        this.roleIdList = data.data.map(item => item.id)
      }
    },
    async handleAllocRole () {
      const { data } = await allocateUserRoles({
        userId: this.currentRoleID,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('分配角色成功...')
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
