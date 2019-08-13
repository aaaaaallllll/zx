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
    isEmypt: false,
    show: false,
    show2: false,
    minHour: 10,
    maxHour: 20,
    showtime: false,
    currentDate: new Date().getTime(),
    yuJiDaoDa: '',
    roomNo: '',
    kePhone:''
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
      this.setData({
        yeMa: this.data.yeMa + 1
      })
      this.getList(1)
    }
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
    let techId = wx.getStorageSync('userinfo').techId
    const yuYueChaXun = Models.yuYueChaXun(companyCode, techId, that.data.chaXunType, that.data.yeMa)
    yuYueChaXun.then(res => {
      console.log(res)
      that.setData({
        data: res.result
      })
    })
  },
  xinzeng: function() {
    if (this.data.chaXunType == 1) {
      this.setData({
        show: true
      })
    } else {
      this.setData({
        show1: true
      })
    }
  },
  onClose: function() {
    this.setData({
      show: false,
      show1: false
    })
  },
  showtime2: function() {
    this.setData({
      showtime: true,
    })
  },
  hideshowtime: function() {
    this.setData({
      showtime: false,
    })
  },
  sublist: function() {
    var that = this;
    let companyCode = wx.getStorageSync('userinfo').companyCode
    if (that.data.kePhone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon:'none'
      })
      return
    }
    if (that.data.yuJiDaoDa == '') {
      wx.showToast({
        title: '请选择预约时间',
        icon:'none'
      })
      return
    }
    let techId = wx.getStorageSync('userinfo').techId
    if (this.data.chaXunType == 1) {
      const addYuYue = Models.addYuYue1(companyCode, techId, that.data.kePhone, that.data.yuJiDaoDa)
      addYuYue.then(res => {
        if (res.success) {
          wx.showToast({
            title: '预约提交成功',
          })
          that.setData({
            yeMa: 1,
            isEmypt: false
          })
          that.getList()
          that.onClose()
        } else {
          wx.showToast({
            title: res.errorDesc,
            icon: 'none'
          })
        }

      })
    } else {
      if (that.data.roomNo == '') {
        wx.showToast({
          title: '请输入房间号',
          icon: 'none'
        })
        return
      }
      const addYuYue = Models.addYuYue2(companyCode, techId, that.data.kePhone, that.data.yuJiDaoDa, that.data.roomNo)
      addYuYue.then(res => {
        if (res.success) {
          wx.showToast({
            title: '预约提交成功',
          })
          that.setData({
            yeMa: 1,
            isEmypt: false
          })
          that.getList()
          that.onClose()
        } else {
          wx.showToast({
            title: res.errorDesc,
            icon: 'none'
          })
        }

      })
    }

  },
  checkdatatime: function(e) {
    console.log(e)
    var time = new Date(e.detail);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    var datas = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    this.setData({
      currentDate: e.detail,
      showtime: false,
      yuJiDaoDa: datas
    });
  },
  add0: function(m) {
    return m < 10 ? '0' + m : m
  },
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
  },
})