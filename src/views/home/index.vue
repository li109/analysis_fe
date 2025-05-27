<template>
  <div class="home">
    <div class="search">
      <el-row>
        <el-col :span="21">
          <el-form :model="search" ref="search" :inline="true" label-width="100px">
            <el-form-item label="股票代码">
              <el-input v-model="search.stockSymbol" clearable placeholder="股票代码" class="input"></el-input>
            </el-form-item>
            <el-form-item label="公司简称">
              <el-input v-model="search.orgShortNameCn" clearable placeholder="公司简称" class="input"></el-input>
            </el-form-item>
            <el-form-item label="企业性质">
              <el-select v-model="search.classiName" clearable placeholder="企业性质" class="input">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3" class="bth">
          <el-button 
            type="primary"
            @click="onSearch()"
            icon="el-icon-search"
            :loading="loading"
          >查询</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="table">
      <el-table
        border
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        :data="tableData" 
        style="width: 100%"
        @sort-change="handleSortChange"
      >
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="stockSymbol" label="股票代码" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orgShortNameCn" label="公司简称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="classiName" label="企业性质" show-overflow-tooltip></el-table-column>
        <el-table-column prop="dividendYield" label="股息率" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="marketCapital" label="总市值" :formatter="formatterValue" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="time" label="更新时间" show-overflow-tooltip></el-table-column>
        
        <!-- <el-table-column prop="orgShortNameEn" label="公司简称(英文)" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="orgNameEn" label="公司名称(英文)" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="orgNameCn" label="公司名称(中文)" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="orgId" label="公司id" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="mainOperationBusiness" label="主营业务" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="operatingScope" label="经营范围" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="districtEncode" label="地区编码" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="orgCnIntroduction" label="公司简介" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="legalRepresentative" label="法人代表" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="generalManager" label="总经理" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="secretary" label="董秘" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="establishedDate" label="成立日期" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="regAsset" label="注册资本" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="staffNum" label="员工人数" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="telephone" label="联系电话" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="postcode" label="邮政编码" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="fax" label="传真" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="email" label="电子邮箱" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="orgWebsite" label="公司网址" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="regAddressCn" label="注册地址(中文)" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="regAddressEn" label="注册地址(英文)" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="officeAddressCn" label="办公地址(中文)" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="officeAddressEn" label="办公地址(英文)" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="currencyEncode" label="货币编码" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="currency" label="货币" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="listedDate" label="上市日期" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="provincialName" label="所属省份" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="actualController" label="实际控制人" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="classiName" label="所有制性质名称" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="preNameCn" label="曾用名" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="chairman" label="董事长" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="executivesNums" label="管理层人数" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="actualIssueVol" label="发行量" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="issuePrice" label="发行价格" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="actualRcNetAmt" label="募集资金" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="peAfterIssuing" label="发行市盈率" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="onlineSuccessRateOfIssue" label="网上中签率" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="indCode" label="行业代码" show-overflow-tooltip width="120"></el-table-column>
        <el-table-column prop="indName" label="行业名称" show-overflow-tooltip width="120"></el-table-column> -->
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="search.pageNo"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="search.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { company } from '@/api/home'
export default {
  name: 'Home',
  data () {
    return {
      tableData: [],
      search: {
        stockSymbol: '',
        orgShortNameCn: '',
        classiName: '',
        sortList: [{
          field: 'market_capital',
          direction: 'DESC'
        }],
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      loading: false,
      rules: {},
      options: ['民营企业','外资企业','集体企业','地市国资控股','省属国资控股','其他','央企国资控股','其他国有']
    }
  },
  components: {},
  mounted() {
    this.getCompany()
  },
  methods: {
    onSearch() {
      this.getCompany(1)
    },
    reset() {
      this.search = {
        stockSymbol: '',
        orgShortNameCn: '',
        classiName: '',
        sortList: [{
          field: 'market_capital',
          direction: 'DESC'
        }],
        pageNo: 1,
        pageSize: 10
      }
      this.getCompany(1)
    },
    getCompany(val) {
      if (val) this.search.pageNo = val
      this.loading = true
      company(this.search).then(res => {
        this.tableData = res.records
        this.total = res.total
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    handleSortChange(sortInfo) {
      const { prop, order } = sortInfo;
      this.search.sortList[0].field = prop == 'dividendYield' ? 'dividend_yield' : 'market_capital'
      this.search.sortList[0].direction = order == 'ascending' ? 'ASC' : 'DESC'
      this.getCompany(1)
    },
    formatterValue(row, column, cellValue, index) {
      if (cellValue) return String(cellValue).separate()
    },
    handleSizeChange(val) {
      this.search.pageSize = val
      this.getCompany(1)
    },
    handleCurrentChange(val) {
      this.search.pageNo = val
      this.getCompany()
    }
  },
}
</script>
<style lang='scss' scoped>
.input {
  width: 220px;
}
.bth {
  text-align: end;
}
.table {
  .pagination {
    text-align: end;
    padding-top: 20px;
  }
}
</style>