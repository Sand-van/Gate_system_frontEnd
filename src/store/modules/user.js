import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { asyncRoutes, constantRoutes, anyRoutes, resetRouter } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    id: '',
    account: '',
    type: '',
    cardID: '',
    phoneNumber: '',
    finalRoutes: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  SET_CARD_ID: (state, cardID) => {
    state.cardID = cardID
  },
  SET_PHONE_NUMBER: (state, phoneNumber) => {
    state.phoneNumber = phoneNumber
  },
  SET_FINAL_ROUTES: (state, resultAsyncRoutes) => {
    state.finalRoutes = constantRoutes.concat(resultAsyncRoutes, anyRoutes)
    // router.addRoutes(state.finalRoutes)
    resetRouter(state.finalRoutes)
  }
}

const actions = {
  // 处理登录业务
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    let result = await login({ userAccount: username.trim(), password: password });
    if (result.code === 200) {
      commit('SET_TOKEN', result.token);
      setToken(result.token)
      return 'ok';
    }
    else {
      return Promise.reject(new Error('failed'))
    }
  },
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_NAME', data.name)
        commit('SET_ID', data.id)
        commit('SET_ACCOUNT', data.account)
        commit('SET_TYPE', data.type)
        commit('SET_CARD_ID', data.cardId)
        commit('SET_PHONE_NUMBER', data.phoneNumber)
        commit('SET_FINAL_ROUTES', setUserAsyncRoutes(data.type))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter(constantRoutes)
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

const computeAsyncRoutes = (asyncRoutes, routes) => {
  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) != -1) {
      // 递归子目录
      if (item.children && item.children.length) {
        item.children = computeAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}

const setUserAsyncRoutes = (userType) => {
  var routes = []
  if (userType === '3') {
    routes = [
      'UserManageMain', 'UserManage', 'UserDetail',
      'DeviceManageMain', 'DeviceManage', 'DeviceDetail',
      'UserApplyManageMain', 'UserApplyManage',
      'PermissionRecordsMain', 'PermissionRecords'
    ]
  } else if (userType === '2') {
    routes = [
      'DeviceManageMain', 'DeviceManage', 'DeviceDetail',
      'UserApplyManageMain', 'UserApplyManage',
      'PermissionRecordsMain', 'PermissionRecords'
    ]
  } else {
    routes = [
      'DeviceManageMain', 'DeviceManage', 'DeviceDetail',
      'UserApplyManageMain', 'UserApplyManage',
    ]
  }
  return computeAsyncRoutes(asyncRoutes, routes)
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}

