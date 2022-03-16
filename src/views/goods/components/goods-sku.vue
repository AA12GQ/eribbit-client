<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected:val.selected}" @click="clickSpecs(item,val)" v-if="val.picture" :src="val.picture" :title="val.name">
          <span :class="{selected:val.selected}" @click="clickSpecs(item,val)" v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import getPowerSet from '@/vender/power-set'
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    },
    skuId: {
      type: String,
      default: ''

    },
    setup (props, { emit }) {
      const star = '★'
      const getPathMap = (skus) => {
        const pathMap = {}
        skus.forEach(sku => {
        // 1. 过滤出有库存有效的sku
          if (sku.inventory) {
          // 2. 得到sku属性值数组
            const specs = sku.specs.map(spec => spec.valueName)
            // 3. 得到sku属性值数组的子集
            const powerSet = getPowerSet(specs)
            // 4. 设置给路径字典对象
            powerSet.forEach(set => {
              const key = set.join(star)
              // 没有key设置一个数组，用于存放 skuid
              if (!pathMap[key]) pathMap[key] = []
              // 往数组追加 skuid
              pathMap[key].push(sku.id)
            })
          }
        })
        return pathMap
      }

      // 得到当前选中规格集合
      const getSelectedArr = (specs) => {
        const arr = []
        specs.forEach(spec => {
          const obj = spec.values.find(val => val.selected)
          arr.push(obj ? obj.name : undefined)
        })
        return arr
      }
      // 更新按钮的禁用状态
      const updateDisabledStatus = (specs, pathMap) => {
        specs.forEach((spec, index) => {
        // 先获取当前选中的规格集合
          const curr = getSelectedArr(specs)
          // 🔔 根据当前选中集合，模拟用户的下一次选中
          spec.values.forEach(val => {
          // 已经选中的，不用模拟
            if (val.selected) return
            // 模拟其他未选中的值，注意下标顺序要对应起来
            curr[index] = val.name
            // 过滤无效值，并最终得到key
            const key = curr.filter(v => v).join(star)
            // 根据 key 在字典从查找，最终设置禁用状态
            val.disabled = !pathMap[key]
          })
        })
      }

      // 根据 skuId 实现默认选中状态
      const initSelectedStatus = (goods, skuId) => {
        // 根据 skuId 查询到 sku 对象
        const skuObj = goods.skus.find(item => item.id === skuId)
        if (skuObj) {
          // 遍历商品规格数组，获取规格和下标
          goods.specs.forEach((spec, index) => {
            // 从 sku 对象中，根据下标获取到规格名
            const name = skuObj.specs[index].valueName
            // 更新页面的规格选中状态
            spec.values.forEach(val => { val.selected = val.name === name })
          })
        }
      }

      const pathMap = getPathMap(props.goods.skus)
      initSelectedStatus(props.goods, props.skuId)
      updateDisabledStatus(props.goods.specs, pathMap)

      const clickSpecs = (item, val) => {
        if (val.disabled) return
        if (val.selected) {
          val.selected = false
        } else {
          item.values.forEach(bv => { bv.selected = false })
          val.selected = true
          // 父组件可通过 change 事件，获取子组件传递出去的 sku 数据
          const currSpec = getSelectedArr(props.goods.specs)
          // 如果没有包含 undefined 表示规格选择完整
          if (!currSpec.includes(undefined)) {
            const key = currSpec.join(star)
            // 根据选中的规格查找到 skuId
            const skuIds = pathMap[key]
            // 根据 skuId 查找到商品信息
            const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
            // 父组件可通过 change 接收到商品信息
            emit('change', {
              skuId: sku.id,
              price: sku.price,
              oldPrice: sku.oldPrice,
              inventory: sku.inventory,
              attrsText: sku.specs.map(item => `${item.name}：${item.valueName}`).join(' ')
            })
          } else {
            emit('change', {})
          }
        }
        updateDisabledStatus(props.goods.specs, pathMap)
      }

      return { clickSpecs, pathMap }
    }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
