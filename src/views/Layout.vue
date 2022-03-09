<template>
  <AppTopnav/>
  <AppHeader/>
  <main>
    <!-- 二级路由 -->
    <RouterView></RouterView>
  </main>
  <AppFooter/>
</template>

<script>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
export default {
  name: 'xtx-layout',
  components: { AppTopnav, AppHeader, AppFooter }
}
</script>

<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
