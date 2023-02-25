import request from '@/utils/request'

export function addDevice(deviceInfo) {
    return request({
        url: '/device/add',
        method: 'post',
        data: deviceInfo
    })
}

export function deleteDevice(deviceIdToDelete) {
    return request({
        url: '/device/delete',
        method: 'delete',
        params: { deviceIdToDelete }
    })
}

export function getDeviceInfo(deviceId) {
    return request({
        url: '/device/getById',
        method: 'get',
        params: { deviceId }
    })
}

export function openDevice(deviceId) {
    return request({
        url: '/device/openDevice',
        method: 'post',
        params: { deviceId }
    })
}

export function getDevicePage(pageInfo) {
    return request({
        url: '/device/page',
        method: 'get',
        params: { page: pageInfo.page, pageSize: pageInfo.pageSize, queryName: pageInfo.searchDeviceName }
    })
}

export function updateDeviceInfo(deviceInfo) {
    return request({
        url: '/device/update',
        method: 'post',
        data: deviceInfo
    })
}

export function getDeviceSimpleInfo() {
    return request({
        url: '/device/simpleInfo',
        method: 'get',
    })
}
