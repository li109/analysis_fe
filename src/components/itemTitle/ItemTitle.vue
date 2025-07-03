<template>
  <div class="item-title">
    <div class="before"></div>
    <div class="title">{{ props.name }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ name: String })

</script>

<style lang="scss" scoped>
.item-title {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;

  .before {
    width: 6px;
    height: 16px;
    margin-top: 2px;
    margin-right: 8px;
    background-color: #3639A4;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #3639A4;
  }
}
</style>