const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  USER_TYPE: state => state.user.type,
  USER_ACCOUNT: state => state.user.account,
  token: state => state.user.token,
  USER_ID: state => state.user.id,
  USER_NAME: state => state.user.name
}
export default getters
