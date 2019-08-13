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
    flag: false,
    chaXunType: 1,
    data: [],
    typelist: [{
      title: '技师预约',
      id: '1'
    }, {
      title: '房间预约',
      id: '2'
    }],
    yeMa: 1,
    isEmypt:false,
    getListtype:[]
  },
  clickMenu: function(e) {
    console.log(e)
    this.setData({
      flag: !this.data.flag
    })
  },
  chaxuncheck: function(e) {
    var type = e.currentTarget.dataset.id
    this.setData({
      chaXunType: type
    })
    this.getList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getListtype()
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
    this.setData({
      yeMa: 1,
      isEmypt: false
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('ssssss')
    if (!this.data.isEmypt) {
      if (this.data.yeMa + 1 <= this.data.total_page) {
        this.setData({
          yeMa: this.data.yeMa + 1
        })
        this.getList(1)
      }
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
    // that.showLoading()
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const queryTechMsg = Models.queryTechMsg(companyCode, techId, that.data.yeMa)
    queryTechMsg.then(res => {
      // that.hideLoading()
      wx.stopPullDownRefresh()
      that.setData({
        data: res.result
      })
      if (a == 1) {
        var arr = that.data.data;
        if (res.data.length > 0) {
          for (var v in res.result) {
            arr.push(res.result[v])
          };
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
  // 取消上钟
  quXiaoTechMsg:function(e){
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.id
    that.showLoading()
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const quXiaoTechMsg = Models.quXiaoTechMsg(techId,id )
    quXiaoTechMsg.then(res => {
      if(res.success){
        wx.showToast({
          title: '取消成功',
          
        })
        that.setData({
          yeMa: 1,
        })
        that.getList()
      }else{
        wx.showToast({
          title: res.errorDesc,
          icon:'none'
        })
      }
    })
  },
  // 上钟
  // 提交
  shangZhong: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const shangZhong = Models.shangZhong2(companyCode, techId, id)
    shangZhong.then(res => {
      if (res.result) {
        wx.showToast({
          title: '上钟成功'
        })
        that.setData({
          yeMa: 1,
        })
        that.getList()
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },

})