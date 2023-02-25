<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>我的通行记录</span>
    </div>
    <el-table :data="dataList" style="width: 100%;">
      <el-table-column label="设备名" width="100">
        <template slot-scope="scope">
          {{ scope.row.deviceName }}
        </template>
      </el-table-column>
      <el-table-column label="通行时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.permissionTime }}
        </template>
      </el-table-column>
      <el-table-column label="结果" width="90" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.isSuccess === '0'" type="danger">非法访问</el-tag>
          <el-tag v-else-if="row.isSuccess === '1'" type="success">成功</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'USER_ID',
      'USER_ACCOUNT'
    ])
  },
  data() {
    return {
      page: 1,
      pageSize: 7,
      dataList: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const page = this.page
      const pageSize = this.pageSize
      const queryUserId = this.USER_ID
      let result = await this.$API.permissionRecords.getRecordsPage({ page, pageSize, queryUserId })
      if (result.code == 200) {
        this.dataList = result.data.records
      }
    }
  }
}
</script>
