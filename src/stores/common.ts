import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', () => {
  const expand = ref(false)
  function changeExpand(value: boolean) {
    expand.value = value
  }
  
  return { expand, changeExpand }
})