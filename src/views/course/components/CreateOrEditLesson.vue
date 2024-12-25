<template>
  <div class="create-or-edit-lesson">
    <el-dialog title="课时基本信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item v-if="componentType == 'Chapter'" label="课程名称" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.name" autocomplete="off" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item v-if="componentType == 'Chapter'" label="时长" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.name" autocomplete="off" :disabled="isEdit">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="componentType == 'Chapter'" label="是否开放试听" :label-width="formLabelWidth">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item :label="componentType == 'Chapter' ? '章节排序' : '课时排序'" :label-width="formLabelWidth">
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
  name: 'CreateOrEditLesson',
  props: {
    isEdit: {
      type: [String, Boolean],
      default: true
    },
    componentType: {
      type: String,
      default: 'Chapter'
    }
  }
}
</script>

<style lang="scss" scoped></style>
