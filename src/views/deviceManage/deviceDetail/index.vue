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
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="showAddAdminDialog"
          style=" float: right">添加管理员</el-button>
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
        <el-table-column prop="prop" label="操作" width="240px" align="center">
          <template slot-scope="{row, $index}">
            <el-button type="primary" size="small" icon="el-icon-info" @click="jumpToUserInfoPage(row)">查看用户</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteAuthority(row)">删除权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="deviceManageData.total"
        :current-page="deviceManageData.page" :page-size="deviceManageData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total"
        @current-change="getDeviceManagePageByPaginationCurrentChange"
        @size-change="getDeviceManagePageByPaginationSizeChange">
      </el-pagination>
    </el-card>

    <!-- 拥有通行权限的用户 -->
    <el-card style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>拥有通行权限的用户</span>
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="showAddPermitDialog"
          style=" float: right">添加用户权限</el-button>
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
        <el-table-column prop="beginTime" label="开始时间" width="width"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="width"></el-table-column>
        <el-table-column prop="prop" label="操作" width="240px" align="center">
          <template slot-scope="{row, $index}">
            <el-button type="primary" size="small" icon="el-icon-info" @click="jumpToUserInfoPage(row)">查看用户</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="deletePermit(row)">删除权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="devicePermitData.total"
        :current-page="devicePermitData.page" :page-size="devicePermitData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total"
        @current-change="getDevicePermitPageByPaginationCurrentChange"
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
          <el-input placeholder="要搜索的用户账号" prefix-icon="el-icon-data-board"
            v-model="deviceRecordsData.searchUserAccount" clearable @keyup.enter.native="getDeviceRecordsPage">
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
        layout="prev, pager, next, jumper, ->, sizes, total"
        @current-change="getDeviceRecordsPageByPaginationCurrentChange"
        @size-change="getDeviceRecordsPageByPaginationSizeChange">
      </el-pagination>
    </el-card>


    <!-- 添加管理员权限表单 -->
    <el-dialog title='添加管理员' :visible.sync="addAdminDialogFormVisible">

      <el-row :gutter="8">
        <el-col :span="6">
          <el-input placeholder="要搜索的名称" prefix-icon="el-icon-user-solid" v-model="userSelect.searchUserName" clearable
            @keyup.enter.native="getUserPage">
          </el-input>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>

        <el-col :span="6">
          <el-input placeholder="要搜索的学工号" prefix-icon="el-icon-edit-outline" v-model="userSelect.searchUserAccount"
            clearable @keyup.enter.native="getUserPage">
          </el-input>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getUserPage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table style="width: 100%; margin-top: 20px;" border stripe :data="userSelect.dataList"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="240px"></el-table-column>
        <el-table-column prop="account" label="学工号" width="width"></el-table-column>
        <el-table-column prop="prop" label="用户类型" width="110px" align="center">
          <template slot-scope="{row, $index}">
            <el-tag v-if="row.type === '1'" type="success">普通用户</el-tag>
            <el-tag v-else-if="row.type === '2'" type="warning">管理员</el-tag>
            <el-tag v-else-if="row.type === '3'" type="danger">超级管理员</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="userSelect.total"
        :current-page="userSelect.page" :page-size="userSelect.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getUserPageByPaginationCurrentChange"
        @size-change="getUserPageByPaginationSizeChange">
      </el-pagination>


      <div slot="footer" class="dialog-footer">
        <el-button @click="disShowAddAdminDialog">完 成</el-button>
        <el-button type="primary" @click="sendAddAdminInfo">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 添加用户权限表单 -->
    <el-dialog title='添加用户通行权限' :visible.sync="addPermitDialogFormVisible">
      <el-date-picker v-model="selectBeginAndEndTime" type="datetimerange" range-separator="-" start-placeholder="开始日期"
        end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>

      <el-card style="margin-top: 20px;">
        <!-- 搜索框 -->
        <el-row :gutter="8" >
          <el-col :span="6">
            <el-input placeholder="要搜索的名称" prefix-icon="el-icon-user-solid" v-model="userSelect.searchUserName" clearable
              @keyup.enter.native="getUserPage">
            </el-input>
            <!-- <div class="grid-content bg-purple"></div> -->
          </el-col>
  
          <el-col :span="6">
            <el-input placeholder="要搜索的学工号" prefix-icon="el-icon-edit-outline" v-model="userSelect.searchUserAccount"
              clearable @keyup.enter.native="getUserPage">
            </el-input>
            <!-- <div class="grid-content bg-purple"></div> -->
          </el-col>
  
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="getUserPage" round>搜索</el-button>
            <!-- <div class="grid-content bg-purple"></div> -->
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table style="width: 100%; margin-top: 20px;" border stripe :data="userSelect.dataList"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="240px"></el-table-column>
          <el-table-column prop="account" label="学工号" width="width"></el-table-column>
          <el-table-column prop="prop" label="用户类型" width="110px" align="center">
            <template slot-scope="{row, $index}">
              <el-tag v-if="row.type === '1'" type="success">普通用户</el-tag>
              <el-tag v-else-if="row.type === '2'" type="warning">管理员</el-tag>
              <el-tag v-else-if="row.type === '3'" type="danger">超级管理员</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination style="margin-top:20px; text-align: center;" :total="userSelect.total"
          :current-page="userSelect.page" :page-size="userSelect.pageSize" :page-sizes="[5, 10, 20]"
          layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getUserPageByPaginationCurrentChange"
          @size-change="getUserPageByPaginationSizeChange">
        </el-pagination>
      </el-card>

      <div slot="footer" class="dialog-footer">
        <el-button @click="disShowAddPermitDialog">完 成</el-button>
        <el-button type="primary" @click="sendAddPermitInfo">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deletePermit } from '@/api/userPermit'


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

      // 选择用户特定相关
      userSelect: {
        page: 1,
        pageSize: 10,
        searchUserName: '',
        searchUserAccount: '',
        searchUserType: '',
        total: 0,
        dataList: [],
        multipleSelection: [],
      },

      // 添加管理员相关
      addAdminDialogFormVisible: false,
      addPermitDialogFormVisible: false,
      selectBeginAndEndTime: []
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
    // 一些按钮操作
    jumpToUserInfoPage(row) {
      this.$router.push({ name: "UserDetail", params: { id: row.userId } })
    },
    async deleteAuthority(row) {
      let result = await this.$API.adminAuthority.deleteAuthority(row.id)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }
      this.getDeviceManagePage()
    },
    async deletePermit(row) {
      let result = await this.$API.userPermit.deletePermit(row.id)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        });
      }
      this.getDevicePermitPage()
    },

    // 获取用户列表信息
    getUserPageByPaginationCurrentChange(page) {
      this.userSelect.page = page
      this.getUserPage()
    },
    getUserPageByPaginationSizeChange(pagerSize) {
      this.userSelect.page = 1
      this.userSelect.pageSize = pagerSize
      this.getUserPage()
    },
    async getUserPage() {
      const { page, pageSize, searchUserName, searchUserAccount } = this.userSelect;
      const searchUserType = this.userSelect.searchUserType
      let result = await this.$API.user.getUserPage({ page, pageSize, searchUserName, searchUserAccount, searchUserType })
      if (result.code == 200) {
        this.userSelect.total = result.data.total
        this.userSelect.dataList = result.data.records
      }
    },
    handleSelectionChange(val) {
      this.userSelect.multipleSelection = val
    },
    // 添加管理员
    showAddAdminDialog() {
      this.userSelect.searchUserType = 2
      this.getUserPage()
      this.addAdminDialogFormVisible = true
    },
    disShowAddAdminDialog() {
      this.addAdminDialogFormVisible = false
      this.userSelect.searchUserName = ''
      this.userSelect.searchUserAccount = ''
    },
    async sendAddAdminInfo() {
      const newAdminList = []
      this.userSelect.multipleSelection.forEach(element => {
        const adminAuthority = { userId: '', deviceId: '' }
        adminAuthority.deviceId = this.queryDeviceId
        adminAuthority.userId = element.id
        newAdminList.push(adminAuthority)
      });
      let result = await this.$API.adminAuthority.addAuthorityList(newAdminList)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: result.data
        });
      }
      this.getDeviceManagePage()
    },
    // 添加权限
    showAddPermitDialog() {
      this.userSelect.searchUserType = ''
      this.getUserPage()
      this.addPermitDialogFormVisible = true
    },
    disShowAddPermitDialog() {
      this.addPermitDialogFormVisible = false
      this.userSelect.searchUserName = ''
      this.userSelect.searchUserAccount = ''
    },
    async sendAddPermitInfo() {
      const newPermitList = []
      this.userSelect.multipleSelection.forEach(element => {
        const userPermit = { userId: '', deviceId: '', beginTime: '', endTime: '' }
        userPermit.deviceId = this.queryDeviceId
        userPermit.userId = element.id
        userPermit.beginTime = this.selectBeginAndEndTime[0]
        userPermit.endTime = this.selectBeginAndEndTime[1]
        newPermitList.push(userPermit)
      });
      let result = await this.$API.userPermit.addPermitByList(newPermitList)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: result.data
        });
      }
      this.getDevicePermitPage()
    }
  }
}
</script>

<style>

</style>
