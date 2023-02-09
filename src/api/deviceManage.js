import request from '@/utils/request'

export function addDevice(deviceInfo) {
    return request({
        url: '/device/add',
        method: 'post',
        deviceInfo
    })
}

export function deleteDevice(deviceID) {
    return request({
        url: '/device/delete',
        method: 'delete',
        params: {deviceID}
    })
}

export function getDeviceInfo(deviceID) {
    return request({
        url: '/device/getById',
        method: 'get',
        params: { deviceID }
    })
}

export function openDevice(deviceID) {
    return request({
        url: '/device/openDevice',
        method: 'post',
        params: {deviceID}
    })
}

export function getDevicePage(pageInfo) {
    return request({
        url: '/device/page',
        method: 'get',
        params: { page: pageInfo.page, pageSize: pageInfo.pageSize, queryName: pageInfo.queryName }
    })
}

export function updateDeviceInfo(deviceInfo) {
    return request({
        url: '/device/update',
        method: 'post',
        deviceInfo
    })
}

export function getDeviceSimpleInfo() {
    return request({
        url: '/device/simpleInfo',
        method: 'get',
    })
}
