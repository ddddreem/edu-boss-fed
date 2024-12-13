<template>
  <div class="course-edit">
    <create-or-edit :is-edit="true" :course-id="courseId"></create-or-edit>
  </div>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit'

export default {
  name: 'CourseEdit',
  components: {
    CreateOrEdit
  },
  props: {
    courseId: {
      type: [String, Number],
      require: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
