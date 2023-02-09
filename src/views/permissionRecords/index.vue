<template>
  <div>
    <el-card>
      <!-- 搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input placeholder="要搜索的账户名" prefix-icon="el-icon-user-solid" v-model="searchUserName" clearable
            @keyup.enter.native="getPage">
          </el-input>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
        <el-col :span="3">
          <el-input placeholder="要搜索的学工号" prefix-icon="el-icon-edit-outline" v-model="searchUserAccount" clearable
            @keyup.enter.native="getPage">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="要搜索的设备名" prefix-icon="el-icon-data-board" v-model="searchDeviceName" clearable
            @keyup.enter.native="getPage">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="searchBeingTime" type="datetime" placeholder="选择开始日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="searchEndTime" type="datetime" placeholder="选择结束日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getPage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table style="width: 100%; margin-top:20px" border stripe :data="dataList">
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="deviceName" label="通行设备名" width="width"></el-table-column>
        <el-table-column prop="permissionTime" label="通行时间" width="width"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="total" :current-page="page" :page-size="pageSize"
        :page-sizes="[5, 10, 20]" layout="prev, pager, next, jumper, ->, sizes, total"
        @current-change="getPageByPaginationCurrentChange" @size-change="getPageByPaginationSizeChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'permissionRecords',
  data() {
    return {
      page: 1,
      pageSize: 10,
      searchUserName: '',
      searchUserAccount: '',
      searchDeviceName: '',
      searchBeingTime: '',
      searchEndTime: '',
      total: 0,
      dataList: [],
    }
  },

  mounted() {
    this.getPage();
  },
  methods: {
    getPageByPaginationCurrentChange(page) {
      this.page = page
      this.getPage()
    },
    getPageByPaginationSizeChange(pagerSize) {
      this.page = 1
      this.pageSize = pagerSize
      this.getPage()
    },
    async getPage() {
      const { page, pageSize, searchUserName, searchUserAccount, searchDeviceName, searchBeingTime, searchEndTime } = this;
      let result = await this.$API.permissionRecords.getRecordsPage({ page, pageSize, searchUserName, searchUserAccount, searchDeviceName, searchBeingTime, searchEndTime })
      // console.log(result)
      if (result.code == 200) {
        this.total = result.data.total
        this.dataList = result.data.records
      }
    },
  }
}
</script>


<style>

</style>