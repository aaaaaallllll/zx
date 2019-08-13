// pages/myStore/list.js
import {
  api
} from '../../api/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    kong:false,
    dIndex:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
  //获取列表
  getList() {
    const that = this
    const userId = wx.getStorageSync('userinfo').userId
    wx.request({
      url: api.ajaxUrl,
      data: {
        operationType: 'xcxBossUserService',
        userId: userId,
        type: 'query'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        if (res.data.success) {
          const _data = JSON.parse(res.data.result)
          if (_data.length > 0) {
            //获取哪个门店被选中
            const companyCode = wx.getStorageSync('userinfo').companyCode
            let index=-1
            for (let i = 0; i < _data.length;i++){
              if (_data[i].companycode == companyCode){
                index=i
              }
            }
            that.setData({
              list: _data,
              dIndex:index
            })
          } else {
            that.setData({
              kong: true
            })
          }
        } else {
          wx.showToast({
            title: res.data.errorDesc,
            icon: 'none',
            duration: 1000//持续的时间
          })
        }
      }
    })
  },
  //点击
  onDown(e) {
    const that = this
    const _index = e.currentTarget.dataset.name
    
    const index = that.data.dIndex
    
    if (index == _index) {
      that.setData({
        dIndex: -1
      })
    } else {
      const companyName = e.currentTarget.dataset.cname
      console.log(companyName)
      const userId = wx.getStorageSync('userinfo').userId
      const pwd = wx.getStorageSync('userinfo').pwd
      const companyCode = e.currentTarget.id
      that.setData({
        dIndex: _index
      })
      wx.showToast({
        title: '门店切换成功',
        icon: 'none',
        duration: 1000//持续的时间
      })
      var userinfo = {
        userId: userId,
        pwd: pwd,
        companyCode: companyCode,
        companyName: companyName
      }
      wx.setStorageSync("userinfo", userinfo);
      console.log(wx.getStorageSync('userinfo'))
      wx.navigateBack({
        delta: 1  // 返回上一级页面。
      })
    }
  },
})