<template>
  <div class="alloc-resource">
    <alloc-kit
      :parentSign="parentSign"
      :roleId="roleId"></alloc-kit>
  </div>
</template>

<script>
import AllocKit from './components/alloc-kit'

export default {
  name: 'AllocResource',
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
      parentSign: 'alloc-resource'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
