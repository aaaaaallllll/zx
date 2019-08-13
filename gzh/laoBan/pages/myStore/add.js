// pages/myStore/add.js
import {
  api
} from '../../api/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyCode: '',
    pwd: '',
    showPass: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  showPwd() {
    let show = !this.data.showPass
    this.setData({
      showPass: show
    })
  },
  //清空门店代码
  empty() {
    this.setData({
      companyCode: ''
    })
  },
  sub() {
    const that = this
    if (that.data.companyCode.length == 0) {
      wx.showToast({

        title: '门店代码不能为空',

        icon: 'none',

        duration: 1000//持续的时间

      })
      return
    } 
    const userId = wx.getStorageSync('userinfo').userId
    const pwd = wx.getStorageSync('userinfo').pwd
    
    console.log(userId)
    console.log(that.data.companyCode)
    console.log(that.data.pwd)
    wx.request({
      url: api.ajaxUrl,
      data: {
        operationType: 'xcxBossUserService',
        userId: userId,
        companyCode: that.data.companyCode,
        companyPwd: that.data.pwd,
        type: 'add'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        if (!res.data.errorDesc) {

          wx.showToast({

            title: '已添加',

            icon: 'none',

            duration: 1000//持续的时间

          })
          //获取companyname
          const list = JSON.parse(res.data.result)
          let companyName=null
          for (let i = 0; i < list.length;i++){
            if (that.data.companyCode == list[i].companycode){
              companyName = list[i].companyname
            }
          }
          console.log(list)
          console.log(list[0].companyname)
          var userinfo = {
            userId: userId,
            pwd: pwd,
            companyCode: that.data.companyCode,
            companyName: companyName
          }
          wx.setStorageSync("userinfo", userinfo);
          console.log(wx.getStorageSync('userinfo'))
        }else{
          wx.showToast({

            title: res.data.errorDesc,

            icon: 'none',

            duration: 1000//持续的时间

          })
        }

      }
    })
  }
})