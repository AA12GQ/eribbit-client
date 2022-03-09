<template>
  <div class="container">
    <!-- 修改数据，测试是否持久化 -->
    App {{$store.state.user.profile.account}}
    <button @click="$store.commit('user/setUser',{account:'王炸'})">设置用户信息</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  setup () {

  }
}
</script>

<style lang="less">

</style>
