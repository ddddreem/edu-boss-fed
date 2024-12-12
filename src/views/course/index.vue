<template>
  <div class="course">
    <course-list></course-list>
  </div>
</template>

<script>
import CourseList from './components/List'

export default {
  name: 'Course',
  components: {
    CourseList
  }
}
</script>

<style lang="scss" scoped></style>
