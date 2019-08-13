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
    flag: false,
    chaXunType: 1,
    data: [],
    yeMa: 1,
    isEmypt: false,
    companyName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
    this.setData({
      companyName: wx.getStorageSync('userinfo').companyName
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('ssssss')
    if (!this.data.isEmypt) {
      this.setData({
        yeMa: this.data.yeMa + 1
      })
      this.getList(1)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  showLoading() {
    wx.showLoading({
      title: '加载中',
    })
  },
  hideLoading() {
    wx.hideLoading()
  },
  // 获取详情
  getList: function(a = 0) {
    var that = this;
    that.showLoading()
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const jiShiDingDan = Models.jiShiDingDan(companyCode, techId, that.data.yeMa)
    jiShiDingDan.then(res => {
      that.hideLoading()
      wx.stopPullDownRefresh()
      that.setData({
        data: res.result
      })
      if (a == 1) {
        var arr = that.data.data;
        if (res.result.length > 0) {
          for (var v in res.result) {
            arr.push(res.result[v])
          };
          console.log(arr)
          that.setData({
            data: arr
          });
        } else {
          that.setData({
            isEmypt: true
          })
        }
      } else {
        that.setData({
          data: res.result
        })
      }
    })
  },
})