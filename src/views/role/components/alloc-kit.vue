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
import { getRoleMenusById, getRoleResourcesById, getMenuNodeList, getResourceNodeList } from '@/services/role'

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
    // 重置勾选的多选项
    onReset () {
      this.$refs['menu-tree'].setCheckedKeys([])
    },
    // 提交已经勾选的分配数组
    async onSubmit () {

    },
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
    }
  }
}
</script>

<style lang="less" scoped>
</style>
