<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="$router.push({ name: 'menu-create' })">添加菜单</el-button>
    </div>
    <!-- 底部菜单列表展示区域 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" type="index">
      </el-table-column>
      <el-table-column prop="name" label="菜单名称">
      </el-table-column>
      <el-table-column prop="level" label="菜单级数">
      </el-table-column>
      <el-table-column prop="icon" label="前端图标">
      </el-table-column>
      <el-table-column prop="orderNum" label="排序">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <!-- 将element组件包裹在作用域插槽内，才能获取到本行的行信息 -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getAllMenus, deleteMenu } from '@/services/menu'

export default {
  name: 'Menu',
  data () {
    return {
      tableData: [
        { name: '权限管理', level: '1', icon: 'lock', orderNum: '1' },
        { name: '菜单管理', level: '2', icon: 'menu', orderNum: '0' },
        { name: '接口管理', level: '2', icon: 'interface', orderNum: '0' },
        { name: '用户管理', level: '1', icon: 'user', orderNum: '0' }
      ]
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    handleEdit (rowData) {
      // 设置跳转功能
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: rowData.id
        }
      })
    },
    handleDelete (rowData) {
      // 删除的确认提示
      this.$confirm('确认删除这条记录吗？', '删除提示')
        .then(async () => {
          // 发送删除请求
          const { data } = deleteMenu(rowData.id)
          if (data.code === '000000') {
            this.$message.success('删除成功...')
            this.loadAllMenus()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除...')
        })
    },
    async loadAllMenus () {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.tableData = data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
