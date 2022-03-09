<template>
  <AppTopnav/>
  <AppHeader/>
  <nav>公共顶栏</nav>
  <header>公共头部</header>
  <main>
    <!-- 二级路由 -->
    <RouterView></RouterView>
  </main>
  <footer>公共底部</footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
export default {
  name: 'xtx-layout',
  components: { AppTopnav, AppHeader }
}
</script>

<style scoped lang="less">
</style>
