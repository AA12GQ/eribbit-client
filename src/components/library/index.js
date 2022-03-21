import defaultImg from '@/assets/images/200.png'
import { Message } from './Message'
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

// 批量注册组件
// 导入libray文件夹下的文件
// 批量导入组件需要使用到 require.context(dir,deep,matching)
// 第一个参数是 目录 第二个参数是 子目录 第三个参数是 加载的正则表达式
const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // 批量注册全局组件
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })

    // 定义指令
    defineDirective(app)
    app.config.globalProperties.$message = Message// 原型函数
  }
}
// 图片懒加载函数
const defineDirective = (app) => {
  // 1、图片懒加载指令 v-lazy
  // 原理：先存储图片地址 不能在src上 ，当图片进入可视区，将你存储图片地址设置给图片元素即可
  app.directive('lazy', {
    // vue2.0监听dom是否创建好，钩子函数，inserted
    // vue3.0指令拥有的钩子函数和组件一样 使用指令的dom是否创建好 使用mounted函数
    mounted (el, binding) {
      // 创建一个观察对象 来观察当前使用指令的对象
      // 第一个是回调函数，第二个是配置选项
      // isIntersecting用来判断是否进入可视区
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        // 停止观察
        if (isIntersecting) {
          observe.unobserve(el)
          // 把指令的值 设置给el的src属性 binding.value就是指令的值
          // 处理图片加载失败
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0 // 设置交叉比例为0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
