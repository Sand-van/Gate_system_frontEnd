<template>
  <div>
    <!-- 用户信息 -->
    <el-descriptions class="margin-top" title="用户信息" :column="3" border style="width: 1000px;">
      <template slot="extra">
        <el-button type="primary" size="small" @click="showUpdateDialog">修改信息</el-button>
        <el-button type="warning" size="small">修改密码</el-button>
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ this.queryUserData.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          用户账户
        </template>
        {{ this.queryUserData.account }}
      </el-descriptions-item>
      <el-descriptions-item :contentStyle="{ 'text-align': 'center' }">
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          用户类型
        </template>
        <el-tag v-if="this.queryUserData.type === '1'" type="success">普通用户</el-tag>
        <el-tag v-else-if="this.queryUserData.type === '2'" type="warning">管理员</el-tag>
        <el-tag v-else-if="this.queryUserData.type === '3'" type="danger">超级管理员</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{ this.queryUserData.phoneNumber }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          校园卡id
        </template>
        {{ this.queryUserData.cardId }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- 用户的管理的设备 -->
    <el-card v-if="this.queryUserData.type == '2'" style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>用户管理的设备</span>
      </div>
      <!-- 上层搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="要搜索的设备名" prefix-icon="el-icon-data-board" v-model="myManageDeviceData.searchDeviceName"
            clearable @keyup.enter.native="getMyManagePage">
          </el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getMyManagePage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table style="width: 100%; margin-top:20px" border stripe :data="myManageDeviceData.dataList">
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="deviceName" label="设备名" width="width"></el-table-column>
        <el-table-column prop="prop" label="状态" width="width"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="width"></el-table-column>
        <el-table-column prop="prop" label="操作" width="120px" align="center">
          <template slot-scope="{row, $index}">
            <el-button type="primary" size="small" icon="el-icon-info" @click="jumpToDeviceInfoPage(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="myManageDeviceData.total"
        :current-page="myManageDeviceData.page" :page-size="myManageDeviceData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getMyManagePageByPaginationCurrentChange"
        @size-change="getMyManagePageByPaginationSizeChange">
      </el-pagination>
    </el-card>

    <!-- 用户的通行权限 -->
    <el-card v-if="this.queryUserData.type != '3'" style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>用户的通行权限</span>
      </div>
      <!-- 上层搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="要搜索的设备名" prefix-icon="el-icon-data-board" v-model="myPermitDeviceData.searchDeviceName"
            clearable @keyup.enter.native="getMyPermitPage">
          </el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getMyPermitPage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table style="width: 100%; margin-top:20px" border stripe :data="myPermitDeviceData.dataList">
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="deviceName" label="设备名" width="width"></el-table-column>
        <el-table-column prop="beginTime" label="开始时间" width="width"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="width"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="myPermitDeviceData.total"
        :current-page="myPermitDeviceData.page" :page-size="myPermitDeviceData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getMyPermitPageByPaginationCurrentChange"
        @size-change="getMyPermitPageByPaginationSizeChange">
      </el-pagination>
    </el-card>

    <!-- 用户的通行记录 -->
    <el-card style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>用户的通行记录</span>
      </div>
      <!-- 上层搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input placeholder="要搜索的设备名" prefix-icon="el-icon-data-board" v-model="myRecordsData.searchDeviceName"
            clearable @keyup.enter.native="getMyRecordsPage">
          </el-input>
        </el-col>
        <el-col :span="7">
          <el-date-picker v-model="myRecordsData.searchBeingTime" type="datetime" placeholder="选择开始日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker v-model="myRecordsData.searchEndTime" type="datetime" placeholder="选择结束日期时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getMyRecordsPage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table style="width: 100%; margin-top:20px" border stripe :data="myRecordsData.dataList">
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="width"></el-table-column>
        <el-table-column prop="deviceName" label="设备名" width="width"></el-table-column>
        <el-table-column prop="permissionTime" label="开启时间" width="width"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="myRecordsData.total"
        :current-page="myRecordsData.page" :page-size="myRecordsData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getMyRecordsPageByPaginationCurrentChange"
        @size-change="getMyRecordsPageByPaginationSizeChange">
      </el-pagination>
    </el-card>

    <!-- 修改用户表单 -->
    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="updateUserData" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="用户账户" prop="account">
          <el-input v-model="updateUserData.account"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" v-if="!updateUserData.id" prop="password">
          <el-input v-model="updateUserData.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="updateUserData.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="updateUserData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="校园卡号">
          <el-input v-model="updateUserData.cardId" type="number"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-select v-model="updateUserData.type" placeholder="请选择用户类型">
            <el-option label="普通用户" value=1></el-option>
            <el-option label="管理员" value=2></el-option>
            <el-option label="超级管理员" value=3></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disShowDialog">取 消</el-button>
        <el-button type="primary" @click="sendUserInfo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'userDetail',
  data() {
    return {
      queryUserId: '',

      queryUserData: {},

      // 用户的管理权限查询数据
      myManageDeviceData: {
        page: 1,
        pageSize: 10,
        searchDeviceName: '',
        total: 0,
        dataList: [],
      },
      // 用户的通信权限查询数据
      myPermitDeviceData: {
        page: 1,
        pageSize: 10,
        searchDeviceName: '',
        searchBeginTime: '',
        searchEndTime: '',
        total: 0,
        dataList: [],
      },
      // 用户的通行记录
      myRecordsData: {
        page: 1,
        pageSize: 10,
        searchDeviceName: '',
        searchBeginTime: '',
        searchEndTime: '',
        total: 0,
        dataList: [],
      },

      updateUserData: {
        id: '',
        account: '',
        password: '',
        name: '',
        phoneNumber: '',
        cardId: '',
        type: ''
      },

      dialogFormVisible: false,

      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入学工号', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { require: true, min: 6, message: '密码长度不能小于6个数字', trigger: 'blur' }

        ]
      },
    }
  },
  mounted() {
    this.queryUserId = this.$route.params.id
    this.getUserInfo()

    // if (this.queryUserData.type == '2') {
    this.getMyManagePage()
    // }
    // if (this.queryUserData.type != '3') {
    this.getMyPermitPage()
    // }
    this.getMyRecordsPage()
  },
  methods: {
    async getUserInfo() {
      let request = await this.$API.user.getUserInfo(this.queryUserId)
      this.queryUserData = request.data
    },
    // 用户的管理权限查询数据
    getMyManagePageByPaginationCurrentChange(page) {
      this.myManageDeviceData.page = page
      this.getMyManagePage()
    },
    getMyManagePageByPaginationSizeChange(pagerSize) {
      this.myManageDeviceData.page = 1
      this.myManageDeviceData.pageSize = pagerSize
      this.getMyManagePage()
    },
    async getMyManagePage() {
      const { page, pageSize, searchDeviceName } = this.myManageDeviceData;
      const adminId = this.queryUserId
      let result = await this.$API.adminAuthority.getAuthorityPageByAdminID({ page, pageSize, adminId, searchDeviceName })
      if (result.code == 200) {
        this.myManageDeviceData.total = result.data.total
        this.myManageDeviceData.dataList = result.data.records
      }
    },
    // 用户的通信权限查询数据
    getMyPermitPageByPaginationCurrentChange(page) {
      this.myPermitDeviceData.page = page
      this.getMyPermitPage()
    },
    getMyPermitPageByPaginationSizeChange(pagerSize) {
      this.myPermitDeviceData.page = 1
      this.myPermitDeviceData.pageSize = pagerSize
      this.getMyPermitPage()
    },
    async getMyPermitPage() {
      const { page, pageSize, searchDeviceName } = this.myPermitDeviceData;
      const queryUserId = this.queryUserId
      let result = await this.$API.userPermit.getPermitPage({ page, pageSize, queryUserId, searchDeviceName })
      if (result.code == 200) {
        this.myPermitDeviceData.total = result.data.total
        this.myPermitDeviceData.dataList = result.data.records
      }
    },
    // 用户的通行记录
    getMyRecordsPageByPaginationCurrentChange(page) {
      this.myRecordsData.page = page
      this.getMyRecordsPage()
    },
    getMyRecordsPageByPaginationSizeChange(pagerSize) {
      this.myRecordsData.page = 1
      this.myRecordsData.pageSize = pagerSize
      this.getMyRecordsPage()
    },
    async getMyRecordsPage() {
      const { page, pageSize, searchDeviceName, searchBeginTime, searchEndTime } = this.myRecordsData;
      const queryUserId = this.queryUserId
      let result = await this.$API.permissionRecords.getRecordsPage({ page, pageSize, queryUserId, searchDeviceName, searchBeginTime, searchEndTime })
      if (result.code == 200) {
        this.myRecordsData.total = result.data.total
        this.myRecordsData.dataList = result.data.records
      }
    },
    //修改用户信息相关
    showUpdateDialog() {
      this.$set(this.updateUserData, "id", this.queryUserData.id)
      this.$set(this.updateUserData, "account", this.queryUserData.account)
      this.$set(this.updateUserData, "name", this.queryUserData.name)
      this.$set(this.updateUserData, "phoneNumber", this.queryUserData.phoneNumber)
      this.$set(this.updateUserData, "type", this.queryUserData.type)
      this.$set(this.updateUserData, "cardId", this.queryUserData.cardId)
      this.dialogFormVisible = true
    },
    disShowDialog() {
      this.dialogFormVisible = false
    },
    sendUserInfo() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false
          let result = await this.$API.user.sendUserInfo(this.updateUserData)
          if (result.code == 200) {
            this.$message({ message: '修改用户成功', type: 'success' })
            this.getUserInfo()
          }
          this.cleanData()
        } else {
          return false
        }
      })
    },
    jumpToDeviceInfoPage(row) {
      this.$router.push({ name: "DeviceDetail", params: { id: row.deviceId } })
    }
  },
}
</script>


<style>

</style>