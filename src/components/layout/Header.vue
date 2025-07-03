<template>
  <div class="header-container">
    <div class="up-container">
      <div class="up-left">
        <div class="icon" @click="switchExpand">
          <el-icon :size="22" :color="'#333'">
            <Expand v-if="expand" />
            <Fold v-else />
          </el-icon>
        </div>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item> -->
            <el-breadcrumb-item v-for="(item,index) in breadcrumbList" :key="index">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="up-right"></div>
    </div>
    <div class="down-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue"
import { useRouter } from "vue-router"
import { useCommonStore } from '@/stores/common'

const store = useCommonStore()
const { changeExpand } = store
const expand = computed(() => store.expand)

function switchExpand() {
  changeExpand(!expand.value)
}

let breadcrumbList = reactive([])

let router = useRouter()

watch(
  () => router,
  (val) => {
    breadcrumbList.length = 0
    for(let item of val.currentRoute.value.meta.breadcrumb as any) {
      // @ts-ignore
      breadcrumbList.push(item)
    }
  },
  { deep: true, immediate: true }
)

</script>

<style lang="scss" scoped>
.header-container {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  box-shadow: 2px 2px 2px #ddd;

  .up-container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .up-left {
      display: flex;
      align-items: center;

      .icon {
        margin: 0 16px -6px 0;
        cursor: pointer;
      }
    }
  }
}
</style>
