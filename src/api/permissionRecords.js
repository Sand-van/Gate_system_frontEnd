import request from '@/utils/request'

export function getRecordsPage(pageInfo) {
  return request({
    url: '/permissionRecords/page',
    method: 'get',
    params: {
      page: pageInfo.page,
      pageSize: pageInfo.pageSize,
      queryUserId: pageInfo.queryUserId,
      queryDeviceId: pageInfo.queryDeviceId,
      queryName: pageInfo.searchUserName,
      queryAccount: pageInfo.searchUserAccount,
      queryDeviceName: pageInfo.searchDeviceName,
      beginTime: pageInfo.searchBeginTime,
      endTime: pageInfo.searchEndTime
    }
  })
}