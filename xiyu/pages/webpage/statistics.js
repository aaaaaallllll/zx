import {
  Model
} from '../../api/model.js'
const Models = new Model()
import {
  Datas
} from '../../utils/data.js'
const datas = new Datas()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    status: false,
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    showbegin: false,
    showend: false,
    timeType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getToday()
    this.getList()
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

  getList: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const jiShiYeJi = Models.jiShiYeJi(companyCode, techId, that.data.timeType, that.data.begin, that.data.end)
    jiShiYeJi.then(res => {
      console.log(res)
      that.setData({
        data: res.result
      })
    })
  },
  checkdata: function(e) {
    var that = this;
    console.log(e)
    var type = e.currentTarget.dataset.id
    that.setData({
      type: type
    })
    if (type == 0) {
      this.getToday()
    } else if (type == 1) {
      this.getyesterday()
    } else if (type == 2) {
      this.getCurrentMonth()
    } else {
      this.getlastMonth()
    }
  },
  getToday() {
    var that = this;
    let timeType = 1;
    let end = datas.gettoday()
    let begin = datas.gettoday()
    that.setData({
      timeType: timeType,
      begin: begin,
      end: end,
      begintime: new Date(begin).getTime(),
      endtime: new Date(end).getTime()
    })
    this.getList()
  },
  todetail(e) {
    let begin = e.currentTarget.dataset.begin
    let end = e.currentTarget.dataset.end
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/webpage/statisticsdetail?type=' + type + '&begin=' + begin + '&end=' + end,
    })
  },
  changedata() {
    var status = this.data.status
    this.setData({
      status: !status
    })
  },
  getdata: function(e) {
    console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    this.getList()
  },
  getdatatimebegin: function(e) {
    console.log(e)
    this.setData({
      begin: e.detail.data,
      begintime: e.detail.datatime
    })
  },
  getdatatimeend: function(e) {
    console.log(e)
    this.setData({
      end: e.detail.data,
      endtime: e.detail.datatime
    })
  }
})