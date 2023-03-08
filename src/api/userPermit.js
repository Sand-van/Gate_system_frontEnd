import request from '@/utils/request'

export function addPermit(userPermitToAdd) {
  return request({
    url: '/user/permit/add',
    method: 'post',
    data: userPermitToAdd
  })
}

export function addPermitByList(userPermitListToAdd) {
  return request({
    url: '/user/permit/addByList',
    method: 'post',
    data: userPermitListToAdd
  })
}

export function deletePermit(userPermitId) {
  return request({
    url: '/user/permit/deleteById',
    method: 'delete',
    params: { userPermitId }
  })
}

export function deletePermitByList(userPermitIdList) {
  return request({
    url: '/user/permit/deleteByIdList',
    method: 'post',
    data: userPermitIdList
  })
}

export function getPermitPage(pageInfo) {
  return request({
    url: '/user/permit/page',
    method: 'get',
    params: {
      page: pageInfo.page, pageSize: pageInfo.pageSize,
      queryUserId: pageInfo.queryUserId,
      queryDeviceId: pageInfo.queryDeviceId,
      queryName: pageInfo.searchUserName,
      queryAccount: pageInfo.searchUserAccount,
      queryDevice: pageInfo.searchDeviceName
    }
  })
}