import request from '@/utils/request'

export function addPermit(userPermitToAdd) {
    return request({
        url: '/user/permit/add',
        method: 'post',
        userPermitToAdd
    })
}

export function deletePermit(userPermitID) {
    return request({
        url: '/user/permit/deleteById',
        method: 'post',
        params: { userPermitID }
    })
}

export function deletePermitByList(userPermitIDList) {
    return request({
        url: '/user/permit/deleteByIdList',
        method: 'post',
        userPermitIDList
    })
}

export function getPermitPage(pageInfo) {
    return request({
        url: '/user/permit/page',
        method: 'get',
        params: { page: pageInfo.page, pageSize: pageInfo.pageSize, queryName: pageInfo.queryName, queryNumber: pageInfo.queryNumber, queryDevice: pageInfo.queryDevice }
    })
}