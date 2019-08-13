import {
  Login
} from '../../utils/login.js'
const login = new Login()
import {
  Model
} from '../../api/model.js'
const Models = new Model()
// pages/jiazhong/jiazhong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    companyName: '',
    listData: [],
    menu: '',
    jiazhongarr: ['1', '2'],
    columns: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
    number: '',
    inputShowed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let companyName = wx.getStorageSync('userinfo').companyName
    this.setData({
      companyName: companyName
    })
    this.getData()
    this.gettype()
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
  bindPickerChange(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      menu: that.data.jiazhongarr[e.detail.value]
    })
  },
  bindPickerChange2(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      number: that.data.jiazhongarr[e.detail.value]
    })
  },
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },

  // 获取上钟信息
  getData: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const querySofaTechIng = Models.querySofaTechIng(companyCode, techId)
    querySofaTechIng.then(res => {
      if (res.result) {
        that.setData({
          data: res.result,
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },
  // 获取类型
  gettype: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const queryTechMenus = Models.queryTechMenus(companyCode, techId)
    queryTechMenus.then(res => {
      if (res.result) {
        that.setData({
          listData: res.result,
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },
  // 获取类型
  jiazhongselect: function() {
    this.setData({
      show: true
    })

  },
  onClose: function() {
    this.setData({
      show: false
    })
  },
  jiazhong: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const jiaZhong = Models.jiaZhong(companyCode, techId, that.data.menu, that.data.number)
    jiaZhong.then(res => {
      if (res.success) {
        wx.showToast({
          title: '加钟成功',
          icon: 'icon'
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },

  onConfirm(e) {
    console.log(e)
    this.setData({
      number: e.detail.value
    })
    this.onClose()
  },
  jiazhongre() {
    this.setData({
      inputShowed: false
    })
  },
  changeselect(){
    this.setData({
      inputShowed: !this.data.inputShowed
    })
  }
})