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
    userApplyToAdd
  })
}

export function deleteApply(userApplyID) {
  return request({
    url: '/user/apply/deleteById',
    method: 'post',
    params: { userApplyID }
  })
}

export function deleteApplyByList(userApplyIDList) {
  return request({
    url: '/user/apply/deleteByIdList',
    method: 'post',
    userApplyIDList
  })
}

export function getApplyPage(pageInfo) {
  return request({
    url: '/user/apply/page',
    method: 'get',
    params: { page: pageInfo.page, pageSize: pageInfo.pageSize, queryName: pageInfo.queryName, queryNumber: pageInfo.queryNumber ,queryDevice: pageInfo.queryDevice}
  })
}
