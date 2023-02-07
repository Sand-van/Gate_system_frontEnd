import request from '@/utils/request'

export function getRecordsPage(pageInfo) {
    return request({
        url: '/permissionRecords/page',
        method: 'get',
        params: {
            page: pageInfo.page,
            pageSize: pageInfo.pageSize,
            queryName: pageInfo.queryName,
            queryNumber: pageInfo.queryNumber,
            queryDevice: pageInfo.queryDevice,
            beginTime: pageInfo.beginTime,
            endTime: pageInfo.endTime
        }
    })
}