// import {
//   Model
// } from '../../api/model.js'
// const Models = new Model()
// import {
//   Validate
// } from '../../utils/validate.js'
import {
  api
} from '../../api/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd: '',
    companyCode: '',
    userId: '',
    // openId: 'c1111211',
    openId: 'o3Whq1Mp-MDDwlJTbD_xEoVogHfg',
    passwordshow: false,
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that =this
    that.wxlogin()
    console.log('cdddd')
    if (wx.getStorageSync('userinfo')) {
      // const companyCode = wx.getStorageSync('userinfo').companyCode
      const pwd = wx.getStorageSync('userinfo').pwd
      const userId = wx.getStorageSync('userinfo').userId
      that.setData({
        // companyCode: companyCode,
        pwd: pwd,
        userId: userId
      })
    } else {
      console.log('ceshi')
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
  onShow: function () { },

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
  login: function () {
    let openId = '';
    const that = this;
    that.wxlogin()
    console.log(that.data.userId);
    console.log(that.data.pwd);
    console.log(that.data.code);
    wx.request({
      url: api.ajaxUrl,
      data:{
        operationType:'xcxBossUserService',
        pwd: that.data.pwd,
        // companyCode: that.data.companyCode,
        userId: that.data.userId,
        code: that.data.code,
        type:'logIn'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res.data)
        if(res.data.success){
          const list = JSON.parse(res.data.result)
          if (list.length>0){
            var userinfo = {
              userId: that.data.userId,
              pwd: that.data.pwd,
              companyCode: list[0].companycode,
              companyName: list[0].companyname
            }
          }else{
            var userinfo = {
              userId: that.data.userId,
              pwd: that.data.pwd,
            }
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
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail
    this.setData(nameMap)
  },
  clearValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = ''
    this.setData(nameMap)
  },
  hidepassword: function () {
    this.setData({
      passwordshow: false
    })
  },
  showpassword: function () {
    console.log('ces')
    this.setData({
      passwordshow: true
    })
  },
  toApply(){
    // console.log('1')
    wx.navigateTo({
      url: '/pages/apply/apply',
    })
  }
})