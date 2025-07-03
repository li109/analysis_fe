<template>
  <div class="app">
    <el-container>
      <Menu></Menu>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-main :class="{ 'close': isCollapse }">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive && isRouterAlive" :key="$route.fullPath"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive && isRouterAlive" :key="$route.fullPath"></router-view>
        </el-main>
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/layout/Menu.vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { ref, computed } from "vue"
import { useCommonStore } from '@/stores/common'

const store = useCommonStore()
const isCollapse = computed(() => store.expand)

const isRouterAlive = ref(true)

</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
.el-container {
  overflow: hidden;
  .el-header {
    --el-header-padding: 0;
    --el-header-height: 40px;
  }

  .el-main {
    width: calc(100vw - $menuWidth);
    height: calc(100vh - 70px);
    box-sizing: border-box;
    padding-bottom: 10px;

    &.close {
      width: calc(100vw - $miniMenuWidth);
    }
  }

  .el-footer {
    padding: 0;
    height: 30px;
  }
}
</style>

