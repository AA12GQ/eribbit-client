import XtxSkeleton from './xtx-skeleton'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'
import { useIntersectionObserver } from '@vueuse/core'
import XtxBread from './xtx-bread.vue'
import XtxBreadItem from './xtx-bread-item.vue'

const importFn = require.context('./', false, /\.vue$/)
console.dir(importFn.keys())

const defineDirective = (app) => {
  app.directive('lazy', {
    mounted (el, { value }) {
      const { stop } = useIntersectionObserver(
        el,
        // isIntersecting 布尔值，元素可见为 true，元素不可见为 false
        ([{ isIntersecting }], observerElement) => {
          // 图片标签是否可见
          if (isIntersecting) {
            // 如果目标可见，替换图片地址，自动加载图片
            el.src = value
            // 如果图片地址是错误的，无法加载图片，显示占位图
            el.onerror = () => {
              el.src = defaultImg
            }
            stop()
          }
        },
        { threshold: [0] }
      )
    }
  })
}

export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBreadItem)
    defineDirective(app)

    importFn.keys.forEach(key => {
      const component = importFn(key).default
      app.component(component.name, component)
    })
  }
}
