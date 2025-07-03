<template>
  <el-menu active-text-color="#409EF4" background-color="#304156" text-color="#BFCBD9" class="menu-container"
    :collapse="isCollapse" router :default-active="$route.path">
    <el-menu-item index="0" class="title-container">
      <div class="title">
        <div class="img">
          <img src="../../assets/image/common/logo.jpg" alt="">
        </div>
        <div class="text">后台管理系统</div>
      </div>
    </el-menu-item>
    <el-sub-menu :index="index + 1 + ''" v-for="(item, index) in menuList" :key="item.name">
      <template #title>
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{item.name}}</span>
      </template>
      <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.name">{{ subItem.name }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue"
import { useCommonStore } from '@/stores/common'
// @ts-ignore
import menuJson from '@/assets/menu/menu.json'

const store = useCommonStore()
const isCollapse = computed(() => store.expand)

const menuList = menuJson

</script>

<style lang="scss" scoped>
@import '@/style/variable.scss';
.menu-container {
  position: relative;
  width: $menuWidth;
  height: 100vh;
  padding-top: 56px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
  user-select: none;
  &.el-menu--collapse{
    width: $miniMenuWidth;
  }

  // 防止菜单宽度变化
  .el-sub-menu {
    span {
      width: 100px;
    }
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1F2D3D;
  }

  :deep(.el-menu--inline) {
    --el-menu-bg-color: #1F2D3D !important;
    --el-menu-hover-bg-color: #001528 !important;
  }

  .title-container {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #304156;

    .title {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      color: #fff;

      .img {
        width: 26px;
        height: 26px;
        margin-right: 19px;

        img {
          width: 100%;
          height: 100%;
          margin-top: -32px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
