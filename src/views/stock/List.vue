<template>
  <div class="stock-list">
    <ItemTitle name="列表展示"></ItemTitle>
    <div class="select-box">
      <div class="select-left">
        <el-form :inline="true" :model="companySelect" class="demo-form-inline">
          <el-form-item label="名称代码：">
            <el-input v-model="companySelect.name" size="small" style="width: 136px" placeholder="请输入名称或代码" clearable />
          </el-form-item>
          <el-form-item label="所有制性质：">
            <el-select v-model="companySelect.classi_name" size="small" style="width: 136px">
              <el-option v-for="item in companySelectOption.classi_name_option" :key="item.value" :label="item.name"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="companySelect.status" size="small" style="width: 88px">
              <el-option v-for="item in companySelectOption.status_option" :key="item.value" :label="item.name"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="select-right">
        <el-button type="primary" size="small" @click="queryList">查询</el-button>
        <el-button type="success" size="small" @click="resetList">重置</el-button>
      </div>
    </div>
    <el-table :data="stockList" stripe style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="60" />
      <el-table-column prop="stock_symbol" label="股票代码" align="center" width="100" />
      <el-table-column label="公司简称" align="center" width="111">
        <template #default="scope">
          <div class="table-click" @click="gotoDetails(scope.row.stock_symbol)">{{ scope.row.stock_name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="classi_name" label="所有制性质" align="center" width="110" />
      <el-table-column label="股息率" align="center" width="123">
        <template #default="scope">
          <div v-if="scope.row.dividend_yield">{{ scope.row.dividend_yield }}%</div>
          <div v-else></div>
        </template>
      </el-table-column>
      <el-table-column prop="market_value" label="总市值" align="center" />
      <el-table-column prop="updated_at" label="更新时间" align="center" width="170" />
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="pageData.currentPage" v-model:page-size="pageData.pageSize"
        :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="pageData.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemTitle from '@/components/itemTitle/ItemTitle.vue'
import { ref, reactive, onMounted, type Ref } from 'vue'
import { useRouter } from "vue-router"

import {
  getStockList
} from '@/api/stock'

const router = useRouter()

const stockList = ref([])

const companySelect = reactive({
  name: '',
  classi_name: '',
  status: ''
})

const pageData = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
})

const companySelectOption = reactive({
  classi_name_option: [
    { name: '全部', value: '' },
    { name: '央企国资控股', value: '央企国资控股' },
    { name: '地方国资控股', value: '地方国资控股' },
    { name: '民营企业', value: '民营企业' },
    { name: '外资企业', value: '外资企业' },
    { name: '上市公司', value: '上市公司' },
    { name: '其他', value: '其他' }
  ],
  status_option: [
    { name: '全部', value: '' },
    { name: '正常', value: 1 },
    { name: '停牌', value: 2 },
    { name: '退市', value: 3 },
    { name: '未上市', value: 0 },
  ]
})

// 查询
const queryList = () => {
  const params = {
    page: pageData.currentPage,
    page_size: pageData.pageSize,
    name: companySelect.name,
    classi_name: companySelect.classi_name,
    status: companySelect.status
  }
  getStockList(params).then((res: any) => {
    if(res.count) pageData.total = res.count
    if(res.results) {
      stockList.value = res.results
    } else {
      stockList.value = []
    }
  })
}

// 重置
const resetList = () => {
  pageData.currentPage = 1
  pageData.pageSize = 10
  companySelect.name = ''
  companySelect.classi_name = ''
  companySelect.status = ''
  queryList()
}

const handleSizeChange = (val: number) => {
  pageData.pageSize = val
  queryList()
}

const handleCurrentChange = (val: number) => {
  pageData.currentPage = val
  queryList()
}

onMounted(() => {
  queryList()
})

// 跳转到详情页
const gotoDetails = (symbol: string) => {
  router.push(`/security/stock/details/${symbol}`)
}
</script>

<style lang="scss" scoped>
.stock-list {
  position: relative;
  width: 100%;
  user-select: none;

  .select-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 20px 10px 20px 0;
    box-sizing: border-box
  }

  .table-click {
    color: #409EFF;
    cursor: pointer;
  }
}
</style>