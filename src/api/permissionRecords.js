import request from '@/utils/request'

export function getRecordsPage(pageInfo) {
    return request({
        url: '/permissionRecords/page',
        method: 'get',
        params: {
            page: pageInfo.page,
            pageSize: pageInfo.pageSize,
            queryName: pageInfo.searchUserName,
            queryNumber: pageInfo.searchUserAccount,
            queryDevice: pageInfo.searchDeviceName,
            beginTime: pageInfo.searchBeingTime,
            endTime: pageInfo.searchEndTime
        }
    })
}