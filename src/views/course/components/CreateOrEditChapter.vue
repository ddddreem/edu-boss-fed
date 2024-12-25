<template>
  <div class="create-or-edit-chapter">
    <el-dialog title="章节信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="章节描述" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.name" autocomplete="off" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.name" autocomplete="off" :disabled="isEdit">
            <template slot="append">数字控制排序，数字越大越靠后</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSectionStatus">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreateOrEditChapter',
  props: {
    isEdit: {
      type: [String, Boolean],
      default: true
    },
    componentDisplay: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
