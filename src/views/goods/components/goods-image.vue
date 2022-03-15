<template>
  <div class="goods-image">
    <div class="large" v-show="!isOutside">
      <img :src="images[activeIndex]" alt="" :style="largePos"/>
    </div>
    <div class="middle" ref="target">
      <img :src="images[activeIndex]" alt="">
      <div class="layer" v-show="!isOutside" :style="layerPos"></div>
    </div>
    <ul class="small">
      <li v-for="i in 5" :key="i">
       <img @mouseenter="activeIndex = index" :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const activeIndex = ref(0)
    const usePreviewImg = () => {
      const target = ref(null)
      const { isOutside, elementX, elementY } = useMouseInElement(target)
      const layerPos = reactive({ left: 0, top: 0 })
      const largePos = reactive({ left: 0, top: 0 })
      watch([elementX, elementY], () => {
        let left = elementX.value - 100
        let top = elementY.value - 100

        // 盒子的边界判断，左上右下的四个边界都要判断
        if (left < 0) left = 0
        if (top < 0) top = 0
        if (left > 200) left = 200
        if (top > 200) top = 200

        layerPos.left = left + 'px'
        layerPos.top = top + 'px'

        largePos.left = -1 * 2 * left + 'px'
        largePos.top = -1 * 2 * top + 'px'
      })
      return { target, isOutside, layerPos, largePos }
    }
    const { layerPos, largePos, isOutside, target } = usePreviewImg()
    return { activeIndex, layerPos, largePos, isOutside, target }
  }
}
</script>

<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
   .large {
  position: absolute;
  top: 0;
  left: 412px;
  width: 400px;
  height: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
  background-size: 800px 800px;
  background-color: #f8f8f8;
  overflow: hidden;
  z-index: 401;
  img {
    max-width: 800px;
    max-height: 800px;
    width: 800px;
    height: 800px;
    position: absolute;
    left: 0;
    top: 0;
  }
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0,0,0,.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
