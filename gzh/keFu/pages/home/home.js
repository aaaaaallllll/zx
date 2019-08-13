// pages/home/home.js
import {Login} from '../../utils/login.js' 
const login = new Login()
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay:true,
    interval: 5000,
    duration: 500,
    animation1: '',
    animation2: '',
    animation3: '',
    code:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    // let code = null
    if (wx.getStorageSync('userinfo')) {
      const companyCode = wx.getStorageSync('userinfo').companyCode
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: api.url,
            data: {
              operationType: 'xcxLogIn',
              code: res.code,
              type: '3',
              companyCode: companyCode,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            success(res) {
              console.log(res)
              if (res.data.success) {
                console.log('ceshi')
              } else {
                wx.redirectTo({
                  url: '/pages/login/login'
                })
              }
            }
          })
          console.log('cdddd')
        }
      })
    }else{
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }
    
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
    // login.isLogin()
    this.isLogin()
    this.animation = wx.createAnimation({
      // 动画持续时间 单位ms 默认 400
      duration: 300,
      timingFunctionL: 'ease',
      delay: 0,
    })
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
  //自动登录
  isLogin() {
    const that=this
    // let code = null
    
  },
  //按钮动画
  scale: function () {
    // console.log('1')
    this.animation.scale(0.5).opacity(0.1).step().scale(1).opacity(1).step()
  },
  toIndex(){
    this.scale()
    this.setData({ animation1: this.animation.export() })
    wx.navigateTo({
      url: '/pages/index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.setData({ animation1: ''})
  },
  toClock() {
    this.scale()
    this.setData({ animation2: this.animation.export() })
    wx.navigateTo({
      url: '/pages/clock/newClock',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.setData({ animation2: '' })
  },
  toDispatch(){
    this.scale()
    this.setData({ animation3: this.animation.export() })
    wx.navigateTo({
      url: '/pages/dispatch/dispatch',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    this.setData({ animation3: '' })
  },
  toLudan(){
    wx.navigateTo({
      url: '/pages/webpage/newLudan',
    })
  },
  toYeji(){
    wx.navigateTo({
      url: '/pages/webpage/statistics',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  tohujiao() {
    wx.navigateTo({
      url: '/pages/hujiaofuwu/hujiaofuwu',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})