/**
 * 全局统一暴露接口
 */

import * as adminAuthority from './adminAuthority'
import * as deviceManage from './deviceManage'
import * as permissionRecords from './permissionRecords'
import * as user from './user'
import * as userApply from './userApply'
import * as userPermit from './userPermit'

export default {
    adminAuthority,
    deviceManage,
    permissionRecords,
    user,
    userApply,
    userPermit
}