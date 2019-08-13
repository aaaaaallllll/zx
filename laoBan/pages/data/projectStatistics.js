import {
  Model
} from '../../api/model.js'
const Models = new Model()
import {
  Datas
} from '../../utils/data.js'
const datas = new Datas()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    index2: 0,
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    list: [],
    list2: ['不限'],
    list3: ['不限'],
    catName: '不限',
    listpro: [],
    typename: '不限'
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    let companyName = wx.getStorageSync('userinfo').companyName
    this.setData({
      companyName: companyName
    })
    this.queryCats()
    console.log('1')
    this.getyesterday()
  },
  // 获取分类
  queryCats: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const queryCats = Models.queryCats(companyCode)
    queryCats.then(res => {
      if (res.success) {
        var list2 = that.data.list2
        console.log(list2)
        for (var i = 0; i < res.result.length; i++) {
          list2.push(res.result[i])
        }
        that.setData({
          list2: list2,
          catName: list2[0]
        })
        console.log(list2)
        that.queryCatMenus()
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },

  // 获取分类下的产品
  queryCatMenus: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const queryCatMenus = Models.queryCatMenus(companyCode, that.data.catName)
    queryCatMenus.then(res => {
      if (res.success) {
        var list = that.data.list3
        for (let i = 0; i < res.result.length; i++) {
          res.result[i].num = 0;
          list[i+1] = res.result[i].name
        }
        var listpro = that.data.listpro
        listpro[that.data.catName] = list
        that.setData({
          listpro: listpro,
          list: res.result,
          list3: list,
          typename: list[0]
        })
        console.log(that.data.listpro, '333')
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon:'none'
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
  // onShow: function() {

  // },

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
    // this.getList()
  },
  restype(e) {
    console.log(e)
    this.setData({
      index: e.detail.index,
      catName: e.detail.title
    })
    this.queryCatMenus()
  },
  restypename(e) {
    console.log(e)
    this.setData({
      index2: e.detail.index,
      typename: e.detail.title
    })
  },
  // 获取分类
  bossXiangMuXiaoShouTongJi: function () {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let userId = wx.getStorageSync('userinfo').userId
    const bossXiangMuXiaoShouTongJi = Models.bossXiangMuXiaoShouTongJi(userId, companyCode, that.data.begin, that.data.end, that.data.catName, that.data.typename)
    bossXiangMuXiaoShouTongJi.then(res => {
      if (res.success) {
        that.setData({
          listdata:res.result
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
        })
      }
    })
  },
  getdatatimebegin: function (e) {
    console.log(e)
    this.setData({
      begin: e.detail.data,
      begintime: e.detail.datatime
    })
  },
  getdatatimeend: function (e) {
    console.log(e)
    this.setData({
      end: e.detail.data,
      endtime: e.detail.datatime
    })
  },
  getyesterday() {
    console.log('1')
    var that = this;
    let timeType = 1;
    let end = that.checkdatatime(datas.getyesterday())
    let begin = that.checkdatatime(datas.getyesterday())
    let begin1 = begin.replace(/-/g, '/');
    let end1 = end.replace(/-/g, '/');
    console.log(begin)
    that.setData({
      timeType: timeType,
      begin: begin,
      end: end,
      begintime: new Date(begin1).getTime(),
      endtime: new Date(end1).getTime()
    })
    // that.getList()
  },
  checkdatatime: function (e) {
    var time = new Date(e.replace(/-/g, '/'));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if (this.data.datetype == 'date') {
      var datas = y + '-' + this.add0(m) + '-' + this.add0(d)
    } else {
      var datas = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    }

    return datas
  },
  add0: function (m) {
    return m < 10 ? '0' + m : m
  },
})