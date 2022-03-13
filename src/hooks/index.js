import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const useLazyData = (apiFn) => {
  const target = ref(null)
  const list = ref([])

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        console.log('进入可视区')
        stop()
        apiFn().then(data => {
          list.value = data.result
        })
      }
    },
    {
      threshold: 0
    }
  )
  return { list, target }
}
