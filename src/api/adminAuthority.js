import request from '@/utils/request'

export function addAuthority(adminAuthorityToAdd) {
  return request({
    url: '/admin/add',
    method: 'post',
    data: adminAuthorityToAdd
  })
}

export function addAuthorityList(adminAuthorityListToAdd) {
  return request({
    url: '/admin/addByList',
    method: 'post',
    data: adminAuthorityListToAdd
  })
}

export function deleteAuthority(adminAuthorityId) {
  return request({
    url: '/admin/deleteById',
    method: 'delete',
    params: { adminAuthorityId }
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
    params: {
      page: pageInfo.page, pageSize: pageInfo.pageSize,
      deviceId: pageInfo.deviceId, userAccount: pageInfo.searchUserAccount, userName: pageInfo.searchUserName
    }
  })
}

