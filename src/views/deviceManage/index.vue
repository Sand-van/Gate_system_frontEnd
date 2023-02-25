<template>
  <div>
    <!-- <el-card>
      <div slot="header" class="clearfix">
        <span>我有权限的设备</span>
      </div>
      <el-row :gutter="8">
        <div v-for="device in devices">
          <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 12 }" :lg="{ span: 6 }" :xl="{ span: 6 }">
            <el-card>
              <el-descriptions :column="1" :colon="false" align="center">
                <el-descriptions-item :contentStyle="{ 'text-align': 'right' }">
                  {{ device.deviceName }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <el-tag size="small">{{ device.statue }}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <el-button type="primary">开门</el-button>
            </el-card>
          </el-col>
        </div>
      </el-row>
    </el-card> -->

    <!-- 用户管理的设备 -->
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
        <!-- <el-table-column prop="prop" label="状态" width="80px" align="center">
          <template slot-scope="{row, $index}">
            <el-tag v-if="row.status === '1'" type="success">在线</el-tag>
            <el-tag v-else-if="row.status === '2'" type="danger">离线</el-tag>
            <el-tag v-else-if="row.status === '3'" type="info">禁用</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="createTime" label="创建时间" width="width"></el-table-column>
        <el-table-column prop="prop" label="操作" width="120px" align="center">
          <template slot-scope="{row, $index}">
            <el-button type="primary" size="small" icon="el-icon-info"
              @click="jumpToDeviceInfoPage(row.deviceId)">查看详情</el-button>
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

    <!-- 超级管理员管理的设备 -->
    <el-card v-if="this.queryUserData.type == '3'" style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span>我管理的设备</span>
        <!-- <el-button type="danger" icon="el-icon-delete" @click="openConfirmDeleteListMessageBox"
          style="float: right">批量删除</el-button> -->
      </div>
      <!-- 上层搜索部分 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input placeholder="要搜索的设备名" prefix-icon="el-icon-data-board" v-model="myManageDeviceData.searchDeviceName"
            clearable @keyup.enter.native="getSuperAdminManagePage">
          </el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getSuperAdminManagePage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>

      <!-- 表格 -->
      <el-table style="width: 100%; margin-top:20px" border stripe :data="myManageDeviceData.dataList">
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="id" label="设备id" width="width"></el-table-column>
        <el-table-column prop="name" label="设备名" width="width"></el-table-column>
        <el-table-column prop="prop" label="状态" width="80px" align="center">
          <template slot-scope="{row, $index}">
            <el-tag v-if="row.status === '1'" type="success">在线</el-tag>
            <el-tag v-else-if="row.status === '2'" type="danger">离线</el-tag>
            <el-tag v-else-if="row.status === '3'" type="info">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="ip" width="width"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="width"></el-table-column>
        <el-table-column prop="prop" label="操作" width="200px" align="center">
          <template slot-scope="{row, $index}">
            <el-button type="primary" size="small" icon="el-icon-info"
              @click="jumpToDeviceInfoPage(row.id)">详情</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="openConfirmMessageBox(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="myManageDeviceData.total"
        :current-page="myManageDeviceData.page" :page-size="myManageDeviceData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total"
        @current-change="getSuperAdminManagePageByPaginationCurrentChange"
        @size-change="getSuperAdminManagePageByPaginationSizeChange">
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
        <el-table-column prop="prop" label="操作" width="120" align="center">
          <template slot-scope="{row, $index}">
            <el-button type="primary" size="small" icon="el-icon-info" @click="runDevice(row.deviceId)">开启</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="myPermitDeviceData.total"
        :current-page="myPermitDeviceData.page" :page-size="myPermitDeviceData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getMyPermitPageByPaginationCurrentChange"
        @size-change="getMyPermitPageByPaginationSizeChange">
      </el-pagination>
    </el-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'deviceManage',
  computed: {
    ...mapGetters([
      'USER_ID',
      'USER_TYPE'
    ])
  },
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

      deviceDataToSend: {

      },

      multipleSelection: [],

      dialogFormVisible: false,
    }
  },
  mounted() {
    this.queryUserId = this.USER_ID
    if (this.USER_TYPE == '3') {
      this.$set(this.queryUserData, 'type', this.USER_TYPE)
      this.getSuperAdminManagePage()
    } else if (this.USER_TYPE == '2') {
      this.getUserInfo()
      this.getMyManagePage()
      this.getMyPermitPage()
    } else {
      this.getUserInfo()
      this.getMyPermitPage()
    }
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
    // 超管
    getSuperAdminManagePageByPaginationCurrentChange(page) {
      this.myManageDeviceData.page = page
      this.getSuperAdminManagePage()
    },
    getSuperAdminManagePageByPaginationSizeChange(pagerSize) {
      this.myManageDeviceData.page = 1
      this.myManageDeviceData.pageSize = pagerSize
      this.getSuperAdminManagePage()
    },
    async getSuperAdminManagePage() {
      const { page, pageSize, searchDeviceName } = this.myManageDeviceData;
      let result = await this.$API.deviceManage.getDevicePage({ page, pageSize, searchDeviceName })
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
    openConfirmMessageBox(row) {
      this.$confirm('此操作将永久删除设备 “' + row.name + '”, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await this.$API.deviceManage.deleteDevice(row.id)
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          if (this.queryUserData.type == 3) {
            this.getSuperAdminManagePage()
          }
        }
      }).catch(() => {
      });
    },
    openConfirmDeleteListMessageBox() {
      this.$confirm('将永久删除' + this.multipleSelection.length + '个设备, 此操作不可逆！,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const userToDelete = []
        this.multipleSelection.forEach(element => {
          userToDelete.push(element.id)
        });
        // let result = await this.$API.user.deleteUserByList(userToDelete)
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: result.data
          });
          this.getPage()
        }
      }).catch(() => {
      });
    },
    jumpToDeviceInfoPage(id) {
      this.$router.push({ name: "DeviceDetail", params: { id: id } })
    },
    runDevice(deviceId) {
      console.log(deviceId)
    }
  },

}
</script>


<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>