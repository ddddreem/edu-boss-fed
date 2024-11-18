<template>
  <div class="alloc-kit">
    <el-card>
      <el-tree
        ref="menu-tree"
        node-key="id"
        :data="menus"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
      ></el-tree>
      <div style="margin: 20px;">
        <el-button
          @click="onReset"
        >清空</el-button>
        <el-button
          type="primary"
          @click="onSave"
        >保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getRoleMenusById, getRoleResourcesById, getMenuNodeList, getResourceNodeList, allocateRoleMenus, allocateRoleResources } from '@/services/role'

export default {
  name: 'AllocKit',
  props: {
    parentSign: {
      type: String,
      required: true
    },
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    if (this.parentSign === 'alloc-menu') {
      this.loadMenuTree()
      this.loadSelectedMenus()
    } else if (this.parentSign === 'alloc-resource') {
      this.loadResourceTree()
      this.loadSelectedResources()
    }
  },
  methods: {
    // chargeParentSign () {
    //   switch (this.parentSign) {
    //     case 'alloc-menu':
    //       return 'menu'
    //     case 'alloc-resource':
    //       return 'resource'
    //   }
    // },
    async loadMenuTree () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async loadSelectedMenus () {
      const { data } = await getResourceNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async loadResourceTree () {
      const { data } = await getRoleMenusById(this.roleId)
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async loadSelectedResources () {
      const { data } = await getRoleResourcesById(this.roleId)
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    // 自己封装的用于数据筛选的方法（筛选出被选中菜单项的 ID）
    getCheckedKeys (menus) {
      // 遍历数据（将所有存在子节点的 node 排除，对子节点列表进行筛选）
      menus.forEach(menu => {
        // 未选中，结束
        if (!menu.selected) {
          return
        }
        // 检测是否存在子节点
        if (menu.subMenuList) {
          // 对子节点进行选中状态检测。结束
          return this.getCheckedKeys(menu.subMenuList)
        }
        // 说明为选中的叶子节点（不存在子节点的节点），存储 ID
        // this.checkedKeys.push(menu.id)
        this.checkedKeys = [...this.checkedKeys, menu.id]
      })
    },
    // 重置勾选的多选项
    onReset () {
      this.$refs['menu-tree'].setCheckedKeys([])
    },
    // 提交已经勾选的分配数组
    onSubmit () {
      if (this.parentSign === 'alloc-menu') {
        this.allocMenus()
      } else if (this.parentSign === 'alloc-resource') {
        this.allocResources()
      }
    },
    // 分配用户菜单权限
    async allocMenus () {
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: this.$refs['menu-tree'].getCheckedKeys()
      })
      if (data === '000000') {
        this.$message.success('菜单分配成功')
        this.$router.push({
          name: 'role'
        })
      }
    },
    // 分配用户资源权限
    async allocResources () {
      const { data } = await allocateRoleResources({
        roleId: this.roleId,
        menuIdList: this.$refs['menu-tree'].getCheckedKeys()
      })
      if (data === '000000') {
        this.$message.success('资源分配成功')
        this.$router.push({
          name: 'role'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
