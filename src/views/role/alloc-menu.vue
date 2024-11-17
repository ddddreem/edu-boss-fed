<template>
  <div class="alloc-menu">
    <alloc-kit
      :parentSign="parentSign"
      :roleId="roleId"></alloc-kit>
  </div>
</template>

<script>
import AllocKit from './components/alloc-kit'

export default ({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    AllocKit
  },
  data () {
    return {
      parentSign: 'alloc-menu'
    }
  }
})
</script>

<style lang="less" scoped>
</style>
