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
    array: ['小费', '基本提成', '销售业绩','推钟提成'],
    index: 0,
    index2: 0,
    type: '',
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    showbegin: false,
    showend: false,
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      type: this.data.array[e.detail.value]
    })
  },
  bindPickerChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      begin: e.detail.value
    })
  },
  bindDateChange2: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      end: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      type: options.type,
      begin: options.begin,
      end: options.end,

    })
    this.getdetail()
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
  getdetail: function() {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    let companyCode = wx.getStorageSync('userinfo').companyCode
    let techId = wx.getStorageSync('userinfo').techId
    const jiShiYeJiXq = Models.jiShiYeJiXq(techId, that.data.begin, that.data.end, that.data.type)
    jiShiYeJiXq.then(res => {
      wx.hideLoading()
      console.log(res)
      if (res.success) {
        var titlelist = res.result.title
        var datalist = res.result.data
        var listpro=[]
        for (var i = 0; i < datalist.length; i++) {
          let list3 = {}
          for (var s = 0; s < titlelist.length; s++) {
            let d = titlelist[s]
            let k = datalist[i]
            list3[s]=k[d]
          }
          listpro.push(list3)
        }
        
        that.setData({
          listdata: listpro,
          listtitle: res.result.title
        })
        if (res.result.length == 0) {
          wx.showToast({
            title: '暂无记录',
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: res.errorDesc,
          icon: 'none',
          image: '',
          duration: 0,
          mask: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
  },
  checkdatatime: function(e) {
    console.log(e)
    var time = new Date(e);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    var datas = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    return datas
  },
  add0: function(m) {
    return m < 10 ? '0' + m : m
  },
  showtimebegin: function() {
    this.setData({
      showbegin: true,
      showend: false,
    })
  },
  showtimeend: function() {
    this.setData({
      showend: true,
      showbegin: false,
    })
  },
  hidetimebegin: function() {
    this.setData({
      showbegin: false,
    })
  },
  hidetimeend: function() {
    this.setData({
      showend: false,
    })
  },
  checkbegin: function(e) {
    var start = e.detail
    this.setData({
      begintime: start,
      begin: this.checkdatatime(start),
      showbegin: false
    })
  },
  checkend: function(e) {
    var start = e.detail
    this.setData({
      endtime: start,
      end: this.checkdatatime(start),
      showend: false
    })
  }
})