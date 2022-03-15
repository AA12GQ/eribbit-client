<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle()">
      <span v-if="fullLocation" class="value">{{ fullLocation }}</span>
      <span v-else class="placeholder">请选择配送地址</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="isShow">
      <div v-if="!currList.length" class="loading"></div>
       <span @click="changeItem(item)" class="ellipsis" v-for="item in currList" :key="item.code">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const target = ref(null)
    const isShow = ref(false)

    const show = async () => {
      isShow.value = true
      const data = await getCityList()
      cityList.value = data
      // 每次打开的时候都重新收集数据
      for (const key in address) {
        address[key] = ''
      }
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
      // 省份
      let list = cityList.value
      // 城市
      if (address.provinceCode) {
        list = list.find(item => item.code === address.provinceCode).areaList
      }
      // 地区
      if (address.cityCode) {
        list = list.find(item => item.code === address.cityCode).areaList
      }
      return list
    })

    const address = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: ''
    })

    const changeItem = (item) => {
      // 省份：level === 0
      if (item.level === 0) {
        address.provinceCode = item.code
        address.provinceName = item.name
      }
      // 市：level === 1
      if (item.level === 1) {
        address.cityCode = item.code
        address.cityName = item.name
      }
      // 区/县：level === 2
      if (item.level === 2) {
        address.countyCode = item.code
        address.countyName = item.name
        hide()
        address.fullLocation = `${address.provinceName} ${address.cityName} ${address.countyName}`
        emit('change', address)
      }
    }
    return { isShow, toggle, target, currList, changeItem }
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
