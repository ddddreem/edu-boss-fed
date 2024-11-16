<template>
  <div class="create-or-edit">
    <el-form ref="form" :model="role">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input
          type="textarea"
          v-model="role.description"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">取消</el-button>
        <el-button
          type="primary"
          @click="onSubmit"
        >确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRoleById, saveOrEditRole } from '@/services/role'

export default {
  name: 'CreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: [String, Number],
      default: -1
    }
  },
  data () {
    return {
      role: {
        roleId: this.roleId,
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadRoleById()
    }
  },
  methods: {
    async loadRoleById () {
      const { data } = await getRoleById(this.roleId)
      if (data === '000000') {
        this.role = data.data.records
      }
    },
    async onSubmit () {
      const { data } = await saveOrEditRole(this.role)
      if (data === '000000') {
        // 请求完成后，将对话框关闭
        this.$emit('success')
        // 添加/编辑成功提示
        let msg = '编辑成功...'
        if (this.roleId === '-1') {
          msg = '添加成功...'
        }
        this.$message.success(msg)
        // 清空对话框中的内容
        this.$refs.form.resetFields()
      }
    },
    onCancel () {
      // 通知父组件关闭对话框
      this.$emit('cancel')
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
