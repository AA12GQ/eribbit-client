<template>
  <div class="home-new">
    <HomePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <!-- 具名插槽 -->
      <template #right><XtxMore path="/"/></template>
      <Transition name="fade">
      <!-- 默认插槽 - 面板内容 -->
      <ul v-if="list.length" ref="pannel" class="goods-list">
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else/>
      </Transition>
    </HomePanel>
  </div>
</template>
<script>
import HomePanel from './home-panel.vue'
import { findNew } from '@/api/home'
import HomeSkeleton from './home-skeleton'
import { useLazyData } from '@/hooks'
export default {
  components: { HomePanel, HomeSkeleton },
  name: 'HomeNew',
  setup () {
    const { target, list } = useLazyData(findNew)
    return { target, list }
  }

}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
