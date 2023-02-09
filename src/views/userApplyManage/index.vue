<template>
  <div>
    <!-- 我的申请部分 -->
    <el-card>
      <!-- 上层选择部分 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 添加按钮 -->
          <el-button type="primary" icon="el-icon-plus" @click="showApplyAddDialog">添加申请</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>

        <el-col :span="4">
          <el-input placeholder="要搜索的设备名" prefix-icon="el-icon-data-board" v-model="myApplyData.searchDeviceName"
            clearable @keyup.enter.native="getMyApplyPage">
          </el-input>
        </el-col>

        <el-col :span="2">
          <el-button type="info" icon="el-icon-search" @click="getMyApplyPage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>

      </el-row>

      <!-- 表格 -->
      <el-table style="width: 100%; margin-top:20px" border stripe :data="myApplyData.dataList">
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="applyTime" label="申请时间" width="width"></el-table-column>
        <el-table-column prop="deviceName" label="申请设备名" width="width"></el-table-column>
        <el-table-column prop="beginTime" label="开始时间" width="width"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="width"></el-table-column>
        <el-table-column prop="prop" label="操作" width="120px" align="center">
          <template slot-scope="{row, $index}">
            <el-button type="danger" size="small" icon="el-icon-delete"
              @click="deleteMyApply(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="myApplyData.total"
        :current-page="myApplyData.page" :page-size="myApplyData.pageSize" :page-sizes="[5, 10, 20]"
        layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getMyApplyPageByPaginationCurrentChange"
        @size-change="getMyApplyPageByPaginationSizeChange">
      </el-pagination>
    </el-card>

    <!-- 添加申请表单 -->
    <el-dialog title='添加申请' :visible.sync="dialogFormVisible">
      <el-form :model="applyData" label-width="80px" :rules="rules" ref="ruleForm">
        <!-- how? -->
        <el-form-item label="申请设备" prop="deviceId">
          <el-select v-model="applyData.deviceId" filterable placeholder="请搜索和选择">
            <el-option v-for="item in allDeviceInfo" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始与结束时间" prop="beginTimeAndEndTime">
          <el-date-picker v-model="beginAndEndTime" type="datetimerange" range-separator="-" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disShowDialog">取 消</el-button>
        <el-button type="primary" @click="sendMyApplyInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'userApplyManage',
  data() {
    return {
      myApplyData: {
        page: 1,
        pageSize: 10,
        searchDeviceName: '',
        total: 0,
        dataList: [],
      },

      allDeviceInfo: [],

      dialogFormVisible: false,

      beginAndEndTime: '',

      applyData: {
        id: '',
        userId: '',
        deviceId: '',
      },

      rules: {
        deviceId: [
          { required: true, message: '请选择设备', trigger: 'blur' }
        ],
        // beginTimeAndEndTime: [
        //   { required: true, message: '请选项开始和结束时间', trigger: 'blur' }
        // ],
      }
    }
  },
  computed: {
    ...mapGetters([
      'USER_ID'
    ])
  },
  mounted() {
    this.getMyApplyPage();
    this.getAllDevice();
    this.cleanApplyData()
  },
  methods: {
    async getAllDevice() {
      let result = await this.$API.deviceManage.getDeviceSimpleInfo()
      if (result.code == 200) {
        this.allDeviceInfo = result.data
      }
    },
    getMyApplyPageByPaginationCurrentChange(page) {
      this.myApplyData.page = page
      this.getMyApplyPage()
    },
    getMyApplyPageByPaginationSizeChange(pagerSize) {
      this.myApplyData.page = 1
      this.myApplyData.pageSize = pagerSize
      this.getMyApplyPage()
    },
    async getMyApplyPage() {
      const { page, pageSize, searchDeviceName } = this.myApplyData;
      let result = await this.$API.userApply.getOwnApplyPage({ page, pageSize, searchDeviceName })
      if (result.code == 200) {
        this.myApplyData.total = result.data.total
        this.myApplyData.dataList = result.data.records
      }
    },
    cleanApplyData() {
      this.applyData = {}
    },
    showApplyAddDialog() {
      this.dialogFormVisible = true
    },
    disShowDialog() {
      this.cleanApplyData()
      this.dialogFormVisible = false
    },
    sendMyApplyInfo() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.$set(this.applyData, "userId", this.USER_ID)
          this.$set(this.applyData, "beginTime", this.beginAndEndTime[0])
          this.$set(this.applyData, "endTime", this.beginAndEndTime[1])
          let result = await this.$API.userApply.addApply(this.applyData)
          if (result.code == 200) {
            this.$message({ message: "申请成功", type: 'success' })
            this.getMyApplyPage()
          } else {
            this.$message({ message: "申请失败", type: 'danger' })
          }
          this.cleanApplyData()
        } else {
          return false
        }
      })

    },
    async deleteMyApply(row) {
      let result = await this.$API.userApply.deleteApply(row.id)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getMyApplyPage()
      }
    }
  },
}
</script>


<style>

</style>