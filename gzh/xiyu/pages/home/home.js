import {
  Login
} from '../../utils/login.js'
const login = new Login()
import {
  Model
} from '../../api/model.js'
const Models = new Model()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName: true,
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
  },
  clickMenu: function(e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getbanner()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    login.isLogin()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 获取banner
  getbanner: function() {
    var that=this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const xcxAdImg = Models.xcxAdImg()
    xcxAdImg.then(res => {
      if(res.success){
        that.setData({
          imgUrls:res.result
        })
      }else{
        wx.showToast({
          title: res.errorDesc,
          icon:'none'
        })
      }
    })
  },
  // 预约管理
  toYygl: function() {
    wx.navigateTo({
      url: '/pages/webpage/yylists',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toStatistics: function() {
    wx.navigateTo({
      url: '/pages/webpage/statistics',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  tohujiaofuwu(){
    wx.navigateTo({
      url: '/pages/hujiaofuwu/hujiaofuwu',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  toRemind: function() {
    wx.navigateTo({
      url: '/pages/webpage/remind',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  topzTable: function() {
    wx.navigateTo({
      url: '/pages/webpage/pzTable',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toorderm: function() {
    wx.navigateTo({
      url: '/pages/webpage/orderManagement',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})