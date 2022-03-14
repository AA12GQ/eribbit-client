<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i class="iconfont" :class="modelValue ? 'icon-checked' : 'icon-unchecked'"/>
     <span v-if="$slots.default" > <slot /> </span>
  </div>
</template>

<script>
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const changeChecked = () => {
      const temp = !props.modelValue
      emit('update:modelValue', temp)
    }
    return { changeChecked }
  }
}
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  cursor: pointer;
  user-select: none;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
