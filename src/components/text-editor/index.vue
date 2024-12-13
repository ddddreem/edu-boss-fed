<template>
  <div class="text-editor" ref="text-editor"></div>
</template>

<script>
import { uploadCourseImage } from '@/services/course'
import E from 'wangeditor'

export default {
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initEditor()
  },
  data () {
    return {
      editor: null,
      isLoaded: false
    }
  },
  methods: {
    initEditor () {
      const editor = new E(this.$refs['text-editor'])
      editor.config.onchange = value => {
        this.$emit('input', value)
      }
      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        if (data.code === '000000') {
          // 通过 inserImgFn 传回给富文本编辑器进行显示
          insertImgFn(data.data.name)
        }
      }
      editor.create()
      editor.txt.html(this.value)
      this.editor = editor
    }
  },
  watch: {
    value () {
      if (this.isLoaded === false) {
        // 得到了加载的新数据，设置给富文本编辑器
        this.editor.txt.html(this.value)
        this.isLoaded = true
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
