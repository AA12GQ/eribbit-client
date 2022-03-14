<template>
<Transition name="fade">
  <div class="sub-category" v-if="subFilter">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选分区 -->
      <SubFilter />
       <div class="goods-list">
        <!-- 排序 -->
        <SubSort />
        <!-- 商品列表 -->
        <ul class="list">
          <li v-for="i in 20" :key="i">
            <GoodsItem />
          </li>
        </ul>
      </div>
    </div>
  </div>
  <SubSkeleton v-else></SubSkeleton>
  </Transition>
</template>

<script>
import SubBread from './components/sub-bread'
import SubSort from './components/sub-sort.vue'
import GoodsItem from './components/goods-item.vue'
import { findSubFilter } from '@/api/category'
import SubFilter from './components/sub-filter'
import { useRoute } from 'vue-router'
import { provide, ref, watch, reactive } from 'vue'
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
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

    const reqParams = reactive({
      sortField: undefined,
      sortMethod: undefined,
      inventory: false,
      onlyDiscount: false
    })
    provide('reqParams', reqParams)
    return { subFilter }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
