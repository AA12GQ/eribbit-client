import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const useLazyData = (apiFn) => {
  const target = ref(null)
  const list = ref([])

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        console.log('元素可见')
        apiFn().then(({ result }) => {
          list.value = result
        })
        stop()
      }
    }
  )
  return { list, target }
}
