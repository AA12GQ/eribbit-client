<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle()">
      <!--<span class="value">广东省 广州市 天河区</span>-->
      <span class="placeholder">请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="isShow">
      <div v-if="!currList.length" class="loading"></div>
       <span class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  setup () {
    const target = ref(null)
    const isShow = ref(false)

    const show = async () => {
      isShow.value = true
      const data = await getCityList()
      cityList.value = data
    }

    const hide = () => {
      isShow.value = false
      // 后面还有有其他业务
    }

    const toggle = () => {
      isShow.value ? hide() : show()
    }

    // 点击目标元素之外  onClickOutside(目标元素,事件处理函数)
    onClickOutside(target, () => {
      console.log('你点击了元素外')
      hide()
    })
    const getCityList = async () => {
      if (window.cityList) {
        return window.cityList
      } else {
        const { data } = await axios.get('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
        window.cityList = data
        return data
      }
    }
    const cityList = ref([])
    const currList = computed(() => {
      const currList = cityList.value
      return currList
    })

    return { isShow, toggle, target, currList }
  }
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(~@/assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
