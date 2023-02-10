import user from '@/store/modules/user'
import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    params: { userAccount: data.userAccount, password: data.password }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function addUser(userInfo) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data: userInfo
  })
}

export function deleteUser(userIdToDelete) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params: { userIdToDelete }
  })
}

export function deleteUserByList(userIdListToDelete) {
  return request({
    url: '/user/deleteByIdList',
    method: 'delete',
    data: userIdListToDelete
  })
}

export function getUserInfo(id) {
  return request({
    url: '/user/getById',
    method: 'get',
    params: { id }
  })
}

export function updateUserInfo(userInfo) {
  return request({
    url: '/user/update',
    method: 'put',
    data: userInfo
  })
}

export function getUserPage(pageInfo) {
  return request({
    url: '/user/page',
    method: 'get',
    params: { page: pageInfo.page, pageSize: pageInfo.pageSize, queryName: pageInfo.searchUserName, queryAccount: pageInfo.searchUserAccount}
  })
}

export function sendUserInfo(userInfo) {
  if (userInfo.id) {
    return updateUserInfo(userInfo)
  } else {
    return addUser(userInfo)
  }
}
