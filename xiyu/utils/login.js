class Login {
  isLogin() {
    console.log('cdddd')
    if (wx.getStorageSync('userinfo')) {
      console.log('ceshi')
    } else {
      wx.redirectTo({
        url: '/pages/admin/login'
      })
    }
  }

}
export {
  Login
}