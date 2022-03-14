<template>
  <!-- 筛选区 -->
  <div class="sub-filter">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a href="javascript:;">全部</a>
        <a href="javascript:;" v-for="p in item.properties" :key="p.id">
          {{ p.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue'
export default {
  name: 'SubFilter',
  setup () {
    const subFilter = inject('subFilter')
    const list = computed(() => {
      return [
        { id: 'brands', name: '品牌', properties: subFilter.value.brands },
        ...subFilter.value.saleProperties
      ]
    })
    return { list }
  }
}
</script>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
