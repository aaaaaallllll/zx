// pages/apply/apply.js
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    pwd:'',
    showPass:false,
    yzm:'',
    djs:0,
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wxlogin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //双向绑定
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },
  //显示隐藏密码
  showPwd(){
    let show = !this.data.showPass
    this.setData({
      showPass:show
    })
  },
  //清空手机号
  empty(){
    this.setData({
      phone: ''
    })
  },
  //获取验证码
  getSms(){
    const that=this
    if(that.data.phone.length==11){
      let sj = 30
      let time = setInterval(() => {
        sj = sj - 1
        that.setData({
          djs: sj
        })
        if (sj == 0) {
          clearInterval(time)
        }
        // console.log(sj)
      }, 1000)
    }else{
      wx.showToast({

        title: '请输入正确的手机号',

        icon: 'none',

        duration: 1000//持续的时间

      })
    }
  },
  //提交
  sub(){
    const that=this
    
    if (that.data.phone.length != 11){
      wx.showToast({

        title: '请输入正确的手机号',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } else if (that.data.pwd.length == 0){
      wx.showToast({

        title: '密码不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
      }
    // } else if (that.data.yzm.length == 0) {
    //   wx.showToast({

    //     title: '验证码不能为空',

    //     icon: 'none',

    //     duration: 1000//持续的时间

    //   })
    //   return
    // }
    this.wxlogin()
    console.log(that.data.pwd);
    console.log(that.data.phone);
    console.log(that.data.code);
   
    wx.request({
      url: api.ajaxUrl,
      data: {
        operationType: 'xcxBossUserService',
        pwd: that.data.pwd,
        userId: that.data.phone,
        code: that.data.code,
        type: 'register'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.success){
          var userinfo = {
            userId: that.data.phone,
            pwd: that.data.pwd
          }
          wx.setStorageSync("userinfo", userinfo);
          console.log(wx.getStorageSync('userinfo'))
          wx.switchTab({
            url: '/pages/data/data',
          })
        }else{
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }
       
      }
    })

  },
  //获取code
  wxlogin() {
    const that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.setData({
          code: res.code
        })
      }
    })
  },
})