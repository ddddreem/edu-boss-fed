<template>
  <div class="course-section">
    <div class="msg-header">
      <div class="add-episode">
        <el-page-header @back="goBack" content="新增课程">
        </el-page-header>
        <el-button type="primary" @click="handleSave" icon="el-icon-plus">添加阶段</el-button>
      </div>
    </div>
    <el-card>
      <el-tree
        v-loading="isLoading"
        :data="sections"
        :props="defaultProps"
        draggable
        :allow-drop="handleAllowDrop"
        @node-drop="handleNodeDrop"
      >
        <div class="inner" slot-scope="{ node, data }">
          <!-- 内容设置 -->
          <span>{{ node.label }}</span>
          <!-- 后续按钮结构 -->
          <span v-if="data.sectionName" class="actions">
            <el-button>编辑</el-button>
            <el-button>添加课时</el-button>
            <el-button>状态</el-button>
          </span>
          <span v-else class="actions">
            <el-button>编辑</el-button>
            <el-button
              @click="$router.push({
                name: 'course-video',
                params: {
                  courseId
                },
                query: {
                  lessonId: data.id
                }
              })"
            >上传视频</el-button>
            <el-button>状态</el-button>
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import { getSectionAndLesson, saveOrUpdateSection, saveOrUpdateLesson } from '@/services/course-section'

export default {
  name: 'CourseSection',
  props: {
    courseId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      sections: [
        {
          id: '1',
          courseId: 169,
          sectionName: 'testddd',
          description: 'adfasdfs',
          createTime: new Date(),
          isDe: false,
          isVisible: null,
          orderNum: 2,
          status: 0,
          updateTime: new Date(),
          lessonDTOS: [
            { id: '123', courseId: 143, sectionId: 169, theme: '课时1', duration: '0', createTime: new Date(), orderNum: 0, publishTime: null, resourceUrl: null, startImgUrl: null, status: 2, updateTime: '2024-12-14T19:23:06' },
            { id: '125', courseId: 143, sectionId: 169, theme: '课时2', duration: '0', createTime: new Date(), orderNum: 0, publishTime: null, resourceUrl: null, startImgUrl: null, status: 2, updateTime: '2024-12-14T19:23:06' }
          ]
        },
        { id: '2', courseId: 169, sectionName: 'test-8888', description: 'adfasdfs', createTime: new Date(), isDe: false, isVisible: null, orderNum: 2, status: 0, updateTime: new Date(), lessonDTOS: null }
      ],
      defaultProps: {
        children: 'lessonDTOS',
        label (data) {
          // data 是章节或课时的时候，label 的属性名不同，需要检测后使用
          return data.sectionName || data.theme
        }
      },
      isLoading: false
    }
  },
  created () {
    // // 组件创建后，请求章节和课时数据
    // this.loadSection()
  },
  methods: {
    async loadSection () {
      this.isLoading = true
      const { data } = await getSectionAndLesson(this.courseId)
      if (data.code === '000000') {
        this.sections = data.data
      }
      this.isLoading = false
    },
    // 节点拖拽处理函数
    handleAllowDrop (draggingNode, dropNode, type) {
      // - 规则1： 只能同级移动，type 不能为 'inner'
      // - 规则2： 课时不能移动到其他章节中
      return type !== 'inner' && draggingNode.data.sectionId === dropNode.data.sectionId
    },
    // 节点拖拽完毕后的处理函数
    async handleNodeDrop (draggingNode, dropNode, type, event) {
      this.isLoading = true
      try {
        // 由于有很多章节与课时，需要给每个章节与课时都进行最新的排序顺序的请求
        await Promise.all(dropNode.parent.childNodes.map((item, index) => {
          // 判断当前是章节还是课时，再给对应接口发送请求即可
          if (draggingNode.data.sectionId) {
            // 课时接口处理
            return saveOrUpdateLesson({
              id: item.data.id,
              orderNum: index
            })
          } else {
            // 章节接口处理
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index
            })
          }
        }))
        this.$message.success('数据更新成功')
      } catch (err) {
        this.$message.error('数据更新失败', err)
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.inner {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}

::v-deep .el-tree-node__content {
  height: auto;
}

.add-episode {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
