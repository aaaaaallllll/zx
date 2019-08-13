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
    array2: ['正序', '倒序'],
    paixu: '',
    index: 0,
    index2: 0,
    techtypes: [],
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    radarImg: '',
    showchart: true,
    chongzhijine: '',
    xiaofeijine: '',
    qichuyue: '',
    qimoyue: '',
    xinzenghuiyuan: '',
    chongzhijine: '',
    techtypename: '',
    techids: [],
    techid: '',
    list: [],
    zhongshu: 0,
    listtitle: ['工号', '项目', '数量', '金额', '轮钟数', '点钟数', '挑钟数', '加班轮钟', '加班点钟', '加班挑钟']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    this.getyesterday()
    this.gettechtype()
    // this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  gettechtype: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    const bossQueryTechTypes = Models.bossQueryTechTypes(techId, companyCode)
    bossQueryTechTypes.then(res => {
      if (res.success) {
        let list = res.result
        list.splice(0, 0, "不限");
        this.setData({
          techtypes: list,
          techtypename: list[0]
        })
        that.gettechids()
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  },
  gettechids: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    const bossQueryTechIdByTypes = Models.bossQueryTechIdByTypes(techId, companyCode, that.data.techtypename)
    bossQueryTechIdByTypes.then(res => {
      if (res.success) {
        let list = res.result
        list.splice(0, 0, "不限");
        this.setData({
          techids: list,
          techid: list[0]
        })
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
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
  },
  resdata(e) {
    console.log(e)
    this.setData({
      techtypename: e.detail.title
    })
    this.gettechids()
  },
  resdatapaixu(e) {
    console.log(e)
    this.setData({
      paixu: e.detail.title
    })
  },
  resdatatechids(e) {
    console.log(e)
    this.setData({
      techid: e.detail.title
    })
    console.log(this.data.techid)
  },
  getdata() {
    // bossJiShiZhongShu(userId, companyCode, begin, end, techType, techId)
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').userId
    wx.showLoading({
      title: '加载中',
    })
    const bossJiShiZhongShu = Models.bossJiShiZhongShu(techId, companyCode, that.data.begin, that.data.end, that.data.techtypename, that.data.techid)
    bossJiShiZhongShu.then(res => {
      wx.hideLoading()
      if (res.success) {
        var a = 0;
        var list=[]
        for (var i = 0; i < res.result.length; i++) {
          a += res.result[i].number
        }
        
        that.setData({
          list: res.result,
          zhongshu: a
        })

        console.log(that.data.result)
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none'
        })
      }
    })
  },
  getToday() {
    var that = this;
    let timeType = 1;
    let end = that.checkdatatime(datas.getCurrentseven()[0])
    let begin = that.checkdatatime(datas.getCurrentseven()[0])
    let begin1 = begin.replace(/-/g, '/');
    let end1 = end.replace(/-/g, '/');
    that.setData({
      begin: begin,
      end: end,
      begintime: new Date(begin1).getTime(),
      endtime: new Date(end1).getTime()
    })
  },
  checkdatatime: function(e) {
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
    console.log(datas, '999999999')
    return datas
  },
  add0: function(m) {
    return m < 10 ? '0' + m : m
  },
  getyesterday() {
    var that = this;
    let timeType = 1;
    let end = that.checkdatatime(datas.getyesterday())
    let begin = that.checkdatatime(datas.getyesterday())
    let begin1 = begin.replace(/-/g, '/');
    let end1 = end.replace(/-/g, '/');
    that.setData({
      timeType: timeType,
      begin: begin,
      end: end,
      begintime: new Date(begin1).getTime(),
      endtime: new Date(end1).getTime()
    })
  },
  resdata: function () {
    console.log('resdata')
    this.triggerEvent('resdata', {
      begin: this.data.begin,
      end: this.data.end,
      begintime: this.data.begintime,
      endtime: this.data.endtime
    })
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
})