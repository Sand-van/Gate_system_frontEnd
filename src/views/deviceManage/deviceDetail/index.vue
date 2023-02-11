<template>
  <div>
    <!-- 设备信息 -->
    <el-descriptions class="margin-top" title="设备信息" :column="3" border style="width: 1000px;">
      <template slot="extra">
        <el-button type="primary" size="small">修改信息</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          设备名
        </template>
        {{ this.queryDeviceData.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          设备ip
        </template>
        {{ this.queryDeviceData.ip }}
      </el-descriptions-item>
      <el-descriptions-item :contentStyle="{ 'text-align': 'center' }">
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          设备状态
        </template>
        <el-tag v-if="this.queryDeviceData.status === '1'" type="success">在线</el-tag>
        <el-tag v-else-if="this.queryDeviceData.status === '2'" type="danger">离线</el-tag>
        <el-tag v-else-if="this.queryDeviceData.status === '3'" type="info">禁用</el-tag>
      </el-descriptions-item>
    </el-descriptions>

    <!-- 管理该设备的管理员 -->
    <el-card style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>管理该设备的管理员</span>
      </div>
      <!-- 上层搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="要搜索的用户名" prefix-icon="el-icon-data-board" v-model="deviceManageData.searchUserName"
            clearable @keyup.enter.native="getDeviceManagePage">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="要搜索的用户账号" prefix-icon="el-icon-data-board" v-model="deviceManageData.searchUserAccount"
            clearable @keyup.enter.native="getDeviceManagePage">
          </el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getDeviceManagePage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table style="width: 100%; margin-top:20px" border stripe :data="deviceManageData.dataList">
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="adminName" label="用户名" width="width"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="width"></el-table-column>
        <el-table-column prop="prop" label="操作" width="120px" align="center">
          <template slot-scope="{row, $index}">
            <el-button type="primary" size="small" icon="el-icon-info" @click="jumpToUserInfoPage(row)">查看用户</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="deviceManageData.total"
        :current-page="deviceManageData.page" :page-size="deviceManageData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getDeviceManagePageByPaginationCurrentChange"
        @size-change="getDeviceManagePageByPaginationSizeChange">
      </el-pagination>
    </el-card>

    <!-- 拥有通行权限的用户 -->
    <el-card style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>拥有通行权限的用户</span>
      </div>
      <!-- 上层搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="要搜索的用户名" prefix-icon="el-icon-data-board" v-model="devicePermitData.searchUserName"
            clearable @keyup.enter.native="getDevicePermitPage">
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="要搜索的用户账号" prefix-icon="el-icon-data-board" v-model="devicePermitData.searchUserAccount"
            clearable @keyup.enter.native="getDevicePermitPage">
          </el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getDevicePermitPage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table style="width: 100%; margin-top:20px" border stripe :data="devicePermitData.dataList">
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="userName" label="用户名" width="width"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="width"></el-table-column>
        <el-table-column prop="beginTime" label="开始时间" width="width"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="width"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="devicePermitData.total"
        :current-page="devicePermitData.page" :page-size="devicePermitData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getDevicePermitPageByPaginationCurrentChange"
        @size-change="getDevicePermitPageByPaginationSizeChange">
      </el-pagination>
    </el-card>

    <!-- 该设备的通行记录 -->
    <el-card style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>该设备的通行记录</span>
      </div>
      <!-- 上层搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input placeholder="要搜索的用户名" prefix-icon="el-icon-data-board" v-model="deviceRecordsData.searchUserName"
            clearable @keyup.enter.native="getDeviceRecordsPage">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="要搜索的用户账号" prefix-icon="el-icon-data-board" v-model="deviceRecordsData.searchUserAccount"
            clearable @keyup.enter.native="getDeviceRecordsPage">
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-date-picker v-model="deviceRecordsData.searchBeingTime" type="datetime" placeholder="选择开始日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker v-model="deviceRecordsData.searchEndTime" type="datetime" placeholder="选择结束日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getDeviceRecordsPage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table style="width: 100%; margin-top:20px" border stripe :data="deviceRecordsData.dataList">
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="width"></el-table-column>
        <el-table-column prop="permissionTime" label="通行时间" width="width"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="deviceRecordsData.total"
        :current-page="deviceRecordsData.page" :page-size="deviceRecordsData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getDeviceRecordsPageByPaginationCurrentChange"
        @size-change="getDeviceRecordsPageByPaginationSizeChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'deviceDetail',
  data() {
    return {
      queryDeviceId: '',

      queryDeviceData: {},

      // 设备的被管理权限查询数据
      deviceManageData: {
        page: 1,
        pageSize: 10,
        searchUserName: '',
        searchUserAccount: '',
        total: 0,
        dataList: [],
      },
      // 设备的通行权限查询数据
      devicePermitData: {
        page: 1,
        pageSize: 10,
        searchUserName: '',
        searchUserAccount: '',
        searchBeginTime: '',
        searchEndTime: '',
        total: 0,
        dataList: [],
      },
      // 设备的通行记录
      deviceRecordsData: {
        page: 1,
        pageSize: 10,
        searchUserName: '',
        searchUserAccount: '',
        searchBeginTime: '',
        searchEndTime: '',
        total: 0,
        dataList: [],
      },
    }
  },
  mounted() {
    this.queryDeviceId = this.$route.params.id
    this.getDeviceInfo()
    this.getDeviceManagePage()
    this.getDevicePermitPage()
    this.getDeviceRecordsPage()
  },
  methods: {
    async getDeviceInfo() {
      let request = await this.$API.deviceManage.getDeviceInfo(this.queryDeviceId)
      this.queryDeviceData = request.data
    },
    // 设备的管理权限查询数据
    getDeviceManagePageByPaginationCurrentChange(page) {
      this.deviceManageData.page = page
      this.getDeviceManagePage()
    },
    getDeviceManagePageByPaginationSizeChange(pagerSize) {
      this.deviceManage.page = 1
      this.deviceManage.pageSize = pagerSize
      this.getMyManagePage()
    },
    async getDeviceManagePage() {
      const { page, pageSize, searchUserName, searchUserAccount } = this.deviceManageData;
      const deviceId = this.queryDeviceId
      let result = await this.$API.adminAuthority.getAuthorityPageByDeviceID({ page, pageSize, deviceId, searchUserName, searchUserAccount })
      if (result.code == 200) {
        this.deviceManageData.total = result.data.total
        this.deviceManageData.dataList = result.data.records
      }
    },
    // 设备的通信权限查询数据
    getDevicePermitPageByPaginationCurrentChange(page) {
      this.devicePermitData.page = page
      this.getMyPermitPage()
    },
    getDevicePermitPageByPaginationSizeChange(pagerSize) {
      this.devicePermitData.page = 1
      this.devicePermitData.pageSize = pagerSize
      this.getMyPermitPage()
    },
    async getDevicePermitPage() {
      const { page, pageSize, searchUserName, searchUserAccount } = this.devicePermitData;
      const queryDeviceId = this.queryDeviceId
      let result = await this.$API.userPermit.getPermitPage({ page, pageSize, queryDeviceId, searchUserName, searchUserAccount })
      if (result.code == 200) {
        this.devicePermitData.total = result.data.total
        this.devicePermitData.dataList = result.data.records
      }
    },
    // 设备的通行记录
    getDeviceRecordsPageByPaginationCurrentChange(page) {
      this.deviceRecordsData.page = page
      this.getMyRecordsPage()
    },
    getDeviceRecordsPageByPaginationSizeChange(pagerSize) {
      this.deviceRecordsData.page = 1
      this.deviceRecordsData.pageSize = pagerSize
      this.getMyRecordsPage()
    },
    async getDeviceRecordsPage() {
      const { page, pageSize, searchUserName, searchUserAccount, searchBeginTime, searchEndTime } = this.deviceRecordsData;
      const queryDeviceId = this.queryDeviceId
      let result = await this.$API.permissionRecords.getRecordsPage({ page, pageSize, queryDeviceId, searchUserName, searchUserAccount, searchBeginTime, searchEndTime })
      if (result.code == 200) {
        this.deviceRecordsData.total = result.data.total
        this.deviceRecordsData.dataList = result.data.records
      }
    },
    jumpToUserInfoPage(row) {
      this.$router.push({ name: "UserDetail", params: { id: row.userId } })
    }
  }
}
</script>

<style>

</style>
