import request from '@/utils/request'

export function acceptApply(applyId) {
  return request({
    url: '/user/apply/accept',
    method: 'post',
    params: { applyId }
  })
}

export function addApply(userApplyToAdd) {
  return request({
    url: '/user/apply/add',
    method: 'post',
    data: userApplyToAdd
  })
}

export function deleteApply(userApplyId) {
  return request({
    url: '/user/apply/deleteById',
    method: 'delete',
    params: { userApplyId }
  })
}

export function deleteApplyByList(userApplyIDList) {
  return request({
    url: '/user/apply/deleteByIdList',
    method: 'post',
    data: userApplyIDList
  })
}

export function getApplyPage(pageInfo) {
  return request({
    url: '/user/apply/page',
    method: 'get',
    params: {
      page: pageInfo.page, pageSize: pageInfo.pageSize,
      queryName: pageInfo.searchUserName,
      queryAccount: pageInfo.searchUserAccount,
      queryDevice: pageInfo.SearchDeviceName
    }
  })
}

export function getOwnApplyPage(pageInfo) {
  return request({
    url: '/user/apply/pageForMyOwn',
    method: 'get',
    params: { page: pageInfo.page, pageSize: pageInfo.pageSize, queryDevice: pageInfo.searchDeviceName }
  })
}
