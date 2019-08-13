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
    tagid: 0,
    icon: ['icon-yingxiao', 'icon-mingxing', 'icon-zuliao'],
    datatype: [],
    type: ''
  },
  tagcheck: function(e) {
    var that=this;
    console.log(e)
    this.setData({
      tagid: e.currentTarget.dataset.id,
      type: e.currentTarget.dataset.title
    })
    that.getList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getListtype()
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
  // 获取详情
  getList: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    const paiZhongBiao = Models.paiZhongBiao(companyCode, that.data.datatype[that.data.tagid].id, that.data.chaXunType)
    paiZhongBiao.then(res => {
      that.setData({
        data: res.result
      })
    })
  },
  // 获取详情
  getListtype: function(a = 0) {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    const queryTechJobs = Models.queryTechJobs(companyCode)
    queryTechJobs.then(res => {
      that.setData({
        datatype: res.result
      })
      that.getList();
    })
  },
})