import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '@/store'

Vue.use(VueRouter)

// 12.路由懒加载，一减少单个打包后文件体积更小，二是按需加载路由组件，三是在进行多功能组件分开打包的时候，可以使用魔法注释来自定义包名称
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index') // 12.1 魔法注释，给打包的文件重新命名
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layout' */'@/views/layout/index'),
    // 直接给某个路由设置，这时内部的子路由都需要认证（包含当前路由）
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index')
      },
      // 添加菜单路由组件
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/create')
      },
      // 编辑菜单路由组件
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/edit')
      }
      // // 分配菜单路由组件
      // {
      //   path: '/role/:roleId/alloc-menu',
      //   name: 'alloc-menu',
      //   component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu'),
      //   props: true
      // },
      // // 添加课程组件
      // {
      //   path: '/course/create',
      //   name: 'course-create',
      //   component: () => import(/* webpackChunkName: 'course-create' */'@/views/course/create')
      // },
      // // 编辑课程组件
      // {
      //   path: '/course/:courseId/edit',
      //   name: 'course-edit',
      //   component: () => import(/* webpackChunkName: 'course-edit' */'@/views/course/edit'),
      //   props: true
      // },
      // // 课程内容组件
      // {
      //   path: '/course/:courseId/section',
      //   name: 'course-section',
      //   component: () => import(/* webpackChunkName: 'course-section' */'@/views/course/section'),
      //   props: true
      // },
      // // 上传课时视频
      // {
      //   path: '/course/:courseId/video',
      //   name: 'course-video',
      //   component: () => import(/* webpackChunkName: 'course-video' */'@/views/course/video'),
      //   props: true
      // }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */'@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // 验证 to 路由是否需要进行身份认证
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // 验证 vuex 的 store 中是否存储了用户信息
//     if (!store.state.user) {
//       return next({
//         name: 'login',
//         query: {
//           // 降本次访问的完整路径传递给的登录页面，使得用户登录后可以条状到一开始访问的页面
//           redirect: to.fullPath
//         }
//       })
//     }
//     next()
//   }
//   next()
// })

export default router
