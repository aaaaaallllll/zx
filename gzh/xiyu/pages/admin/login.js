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
    openId: '',
    passwordshow: false,
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that=this
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.setData({
          code: res.code
        })
      }
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
  
    console.log(wx.getStorageSync('userinfo'))
    this.setData({
      userId: wx.getStorageSync('userinfo').techId,
      companyCode: wx.getStorageSync('userinfo').companyCode,
      pwd: wx.getStorageSync('userinfo').pwd,
    })
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
  login: function() {
    let openId = '';
    const that = this;
    // that.wxlogin()
    console.log(that.data.companyCode);
    console.log(that.data.userId);
    console.log(that.data.pwd);
    console.log(that.data.code);
    console.log('hh');
    wx.login({
      success:res=>{
        console.log(res.code)
        wx.request({
          url: api.url,
          data: {
            operationType: 'xcxLogIn',
            pwd: that.data.pwd,
            companyCode: that.data.companyCode,
            userId: that.data.userId,
            code: res.code,

          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'post',
          success(res) {
            console.log(res.data)
            if (res.data.success) {
              var userinfo = {
                techId: that.data.userId,
                companyCode: that.data.companyCode,
                companyName: res.data.result,
                pwd: that.data.pwd
              }
              wx.setStorageSync("userinfo", userinfo);
              
              wx.switchTab({
                url: '/pages/home/home',
              })
            } else {
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
   
    // const dengLu = Models.dengLu(that.data.companyCode, that.data.userId, that.data.pwd, that.data.code)
    // dengLu.then(res => {
    //   console.log('1')
    //   console.log(res)
    //   if (res.success) {
    //     console.log('2')
    //     var userinfo = {
    //       companyCode: that.data.companyCode,
    //       techId: that.data.userId,
    //       companyName: res.result
    //     }
    //     wx.setStorageSync("userinfo", userinfo);
    //     wx.switchTab({
    //       url: '/pages/home/home',
    //     })
    //   }
    // })

  },
  wxlogin() {
    var that = this;
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
  saveFormId: function(v) {
    var that = this;
    if (v.detail.formId == 'the formId is a mock one') {
      return
    }
    const subFormid = Models.subFormid(v.detail.formId, that.data.code, that.data.companyCode, that.data.userId)
    subFormid.then(res => {
      console.log(res)
      if (res.success) {

      }
    })
  },
  hidepassword: function() {
    this.setData({
      passwordshow: false
    })
  },
  showpassword: function() {
    console.log('ces')
    this.setData({
      passwordshow: true
    })
  }
})