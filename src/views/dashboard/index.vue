
<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="50">
      <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 12 }" :xl="{ span: 12 }"
        style="padding-right:8px;margin-bottom:30px;">
        <!-- 用户信息 -->
        <el-descriptions class="margin-top" title="用户信息" :column="2" border>
          <template slot="extra">
            <el-button type="primary" size="small" @click="showUpdateDialog">修改信息</el-button>
            <el-button type="warning" size="small">修改密码</el-button>
          </template>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              用户名
            </template>
            {{ this.userData.name }}
          </el-descriptions-item>
          <el-descriptions-item :contentStyle="{ 'text-align': 'center' }">
            <template slot="label">
              <i class="el-icon-location-outline"></i>
              用户类型
            </template>
            <el-tag v-if="this.userData.type === '1'" type="success">普通用户</el-tag>
            <el-tag v-else-if="this.userData.type === '2'" type="warning">管理员</el-tag>
            <el-tag v-else-if="this.userData.type === '3'" type="danger">超级管理员</el-tag>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              用户账户
            </template>
            {{ this.userData.account }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            {{ this.userData.phoneNumber }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              校园卡id
            </template>
            {{ this.userData.cardId }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 24 }" :lg="{ span: 12 }" :xl="{ span: 12 }"
        style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>


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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="disShowDialog">取 消</el-button>
        <el-button type="primary" @click="sendUserInfo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import TransactionTable from './components/TransactionTable'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    LineChart,
    TransactionTable,
  },
  computed: {
    ...mapGetters([
      'USER'
    ])
  },
  data() {
    return {
      lineChartData: {
        actualData: [120, 82, 91, 154, 162, 140, 145]
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
      userData: {},
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
    this.userData = this.USER
  },
  methods: {
    async getUserInfo() {
      let request = await this.$API.user.getUserInfo(this.userData.id)
      this.userData = request.data
    },
    showUpdateDialog() {
      this.$set(this.updateUserData, "id", this.userData.id)
      this.$set(this.updateUserData, "account", this.userData.account)
      this.$set(this.updateUserData, "name", this.userData.name)
      this.$set(this.updateUserData, "phoneNumber", this.userData.phoneNumber)
      this.$set(this.updateUserData, "cardId", this.userData.cardId)
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
  },
}
</script>


<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
