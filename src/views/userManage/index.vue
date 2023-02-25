<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>用户管理</span>
        <el-button type="primary" icon="el-icon-plus" size="medium" @click="showAddDialog" style="margin-left: 20px;">添加用户</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="openConfirmDeleteListMessageBox" style="float: right">批量删除</el-button>
      </div>
      <!-- 上层选择部分 -->
      <el-row :gutter="8">
        <el-col :span="3">
          <el-input placeholder="要搜索的名称" prefix-icon="el-icon-user-solid" v-model="searchUserName" clearable
            @keyup.enter.native="getPage">
          </el-input>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>

        <el-col :span="4">
          <el-input placeholder="要搜索的学工号" prefix-icon="el-icon-edit-outline" v-model="searchUserAccount" clearable
            @keyup.enter.native="getPage">
          </el-input>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="getPage" round>搜索</el-button>
          <!-- <div class="grid-content bg-purple"></div> -->
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table style="width: 100%;" border stripe :data="dataList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="序号" width="60px" type="index" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="240px"></el-table-column>
        <el-table-column prop="account" label="学工号" width="width"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="width"></el-table-column>
        <el-table-column prop="cardId" label="校园卡id" width="width"></el-table-column>
        <el-table-column prop="prop" label="用户类型" width="110px" align="center">
          <template slot-scope="{row, $index}">
            <el-tag v-if="row.type === '1'" type="success">普通用户</el-tag>
            <el-tag v-else-if="row.type === '2'" type="warning">管理员</el-tag>
            <el-tag v-else-if="row.type === '3'" type="danger">超级管理员</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="250px" align="center">
          <template slot-scope="{row, $index}">
            <!-- <el-button-group> -->
            <el-button type="warning" size="small" icon="el-icon-edit" @click="showUpdateDialog(row)">编辑</el-button>
            <el-button type="primary" size="small" @click="jumpToUserInfoPage(row)">详情</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete"
              @click="openConfirmMessageBox(row)">删除</el-button>
            <!-- </el-button-group> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination style="margin-top:20px; text-align: center;" :total="total" :current-page="page"
        :page-size="pageSize" :page-sizes="[5, 10, 20]" layout="prev, pager, next, jumper, ->, sizes, total"
        @current-change="getPageByPaginationCurrentChange" @size-change="getPageByPaginationSizeChange">
      </el-pagination>
    </el-card>

    <!-- 添加用户表单 -->
    <el-dialog :title="UserData.id ? '修改用户信息' : '添加用户'" :visible.sync="dialogFormVisible">
      <el-form :model="UserData" label-width="80px" :rules="rules" ref="ruleForm">
        <el-form-item label="用户账户" prop="account">
          <el-input v-model="UserData.account"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" v-if="!UserData.id" prop="password">
          <el-input v-model="UserData.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="UserData.name"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="UserData.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="校园卡号">
          <el-input v-model="UserData.cardId" type="number"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-select v-model="UserData.type" placeholder="请选择用户类型">
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
import { async } from 'q';

export default {
  name: 'userManage',
  data() {
    return {
      page: 1,
      pageSize: 10,
      searchUserName: '',
      searchUserAccount: '',
      total: 0,
      dataList: [],

      dialogFormVisible: false,
      // updateDialogFormVisible: false,

      UserData: {
        id: '',
        account: '',
        password: '',
        name: '',
        phoneNumber: '',
        cardId: '',
        type: ''
      },

      multipleSelection:[],

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
      }
    }
  },
  //组件挂载完毕，发送请求
  mounted() {
    this.getPage();
    this.cleanData()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
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
      const { page, pageSize, searchUserName, searchUserAccount } = this;
      let result = await this.$API.user.getUserPage({ page, pageSize, searchUserName, searchUserAccount })
      if (result.code == 200) {
        this.total = result.data.total
        this.dataList = result.data.records
      }
    },
    cleanData() {
      this.UserData = {}
    },
    showAddDialog() {
      this.dialogFormVisible = true
    },
    showUpdateDialog(row) {
      this.$set(this.UserData, "id", row.id)
      this.$set(this.UserData, "account", row.account)
      this.$set(this.UserData, "name", row.name)
      this.$set(this.UserData, "phoneNumber", row.phoneNumber)
      this.$set(this.UserData, "type", row.type)
      this.$set(this.UserData, "cardId", row.cardId)

      this.dialogFormVisible = true
    },
    disShowDialog() {
      this.cleanData()
      this.dialogFormVisible = false
    },
    sendUserInfo() {
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          this.UserData.type = this.UserData.type
          let result = await this.$API.user.sendUserInfo(this.UserData)
          if (result.code == 200) {
            this.$message({ message: this.UserData.id ? '修改用户成功' : "添加用户成功", type: 'success' })
            this.getPage()
            if (this.UserData.id) {
              this.dialogFormVisible = false
            }
          }
          this.cleanData()
        } else {
          return false
        }
      })
    },
    openConfirmMessageBox(row) {
      this.$confirm('此操作将永久删除用户 “' + row.name + '”, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await this.$API.user.deleteUser(row.id)
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPage()
        }
      }).catch(() => {
        // this.$message({
        // type: 'info',
        // message: '已取消删除'
        // });
      });
    },
    openConfirmDeleteListMessageBox() {
      this.$confirm('将永久删除' + this.multipleSelection.length + '个用户, 此操作不可逆！,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const userToDelete = []
        this.multipleSelection.forEach(element => {
          userToDelete.push(element.id)
        });
        let result = await this.$API.user.deleteUserByList(userToDelete)
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: result.data
          });
          this.getPage()
        }
      }).catch(() => {
        // this.$message({
        // type: 'info',
        // message: '已取消删除'
        // });
      });
    },
    jumpToUserInfoPage(row) {
      // this.$router.push({ path:"/userManage/userDetail/index/"+row.id})
      this.$router.push({ name: "UserDetail", params: { id: row.id } })
    }
  }
}
</script>


<style>
.el-row {
  margin-bottom: 20px;

}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>