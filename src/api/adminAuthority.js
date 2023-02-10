import request from '@/utils/request'

export function addAuthority(adminAuthorityToAdd) {
    return request({
        url: '/admin/add',
        method: 'post',
        adminAuthorityToAdd
    })
}

export function deleteAuthority(adminAuthorityID) {
    return request({
        url: '/admin/deleteById',
        method: 'post',
        params: { adminAuthorityID }
    })
}

export function getAuthorityPageByAdminID(pageInfo) {
    return request({
        url: '/admin/page/adminId',
        method: 'get',
        params: {
            page: pageInfo.page, pageSize: pageInfo.pageSize,
            adminId: pageInfo.adminId, deviceName: pageInfo.searchDeviceName
        }
    })
}

export function getAuthorityPageByDeviceID(pageInfo) {
    return request({
        url: '/admin/page/deviceId',
        method: 'get',
        params: { page: pageInfo.page, pageSize: pageInfo.pageSize, queryID: pageInfo.queryID }
    })
}

