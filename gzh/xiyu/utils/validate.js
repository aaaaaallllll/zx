class Validate {
  // 获取验证码
  tel(tel) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (tel.length == 0) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (tel.length < 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(tel)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      // wx.showToast({
      //   title: '填写正确',
      //   icon: 'success',
      //   duration: 1500
      // })
      return true
    }
  }
  code(code) {
    var myreg = /([0-9]{4})/;
    if (code.length == 0) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (code.length < 6) {
      wx.showToast({
        title: '请输入6位验证码',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(code)) {
      wx.showToast({
        title: '验证码有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      return true
    }
  }
}

export {
  Validate
}