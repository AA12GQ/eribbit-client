<template>
<Transition name="fade">
  <div class="sub-category" v-if="subFilter">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选分区 -->
      <SubFilter />
      <!-- 商品分区 -->
    </div>
  </div>
  <SubSkeleton v-else></SubSkeleton>
  </Transition>
</template>

<script>
import SubBread from './components/sub-bread'
import { findSubFilter } from '@/api/category'
import SubFilter from './components/sub-filter'
import { useRoute } from 'vue-router'
import { provide, ref, watch } from 'vue'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter },
  setup () {
    const route = useRoute()
    const subFilter = ref(null)
    watch(() => route.params.id, async (id) => {
      if (route.path !== `/category/sub/${id}`) return
      subFilter.value = null
      const { result } = await findSubFilter(id)
      console.log(result)
      subFilter.value = result
    }, { immediate: true })
    provide('subFilter', subFilter)
    return { subFilter }
  }
}
</script>

<style scoped lang="less">
</style>
