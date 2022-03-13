<template>
  <HomePanel ref="target" title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a @click="moveX=0" :class="{disabled:moveX === 0}" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="moveX= '-50%'" :class="{disabled:movex=== '-50%'}" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
      <Transition name="fade">
      <ul v-if="list.length" class="list" :style="`transform: translateX(${ moveX });`">
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
          </RouterLink>
        </li>
      </ul>
      <div v-else class="skeleton">
        <XtxSkeleton class="item" v-for="i in 5" :key="i" width="240px" height="305px" bg="#e4e4e4"></XtxSkeleton>
      </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel.vue'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hooks'
import { ref } from 'vue'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    const { list, target } = useLazyData(findBrand)
    const moveX = ref(0)
    return { list, target, moveX }
  }
}
</script>

<style scoped lang="less">
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
</style>
