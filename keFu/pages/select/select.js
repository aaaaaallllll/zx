// pages/select/select.js
// var util = require('../../utils/util2.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tymIndex: 0,
    sjIndex: 0,
    jqIndex: -1,
    jqIndex2: -1,
    today: '',
    tomorrow: '',
    afterday: '',
    disableid: '',
    meus: [],
    nighttimelist: [{
      time: '18:00', checked: false, id: 37,
    }, {
      time: '18:30', checked: false, id: 38,
    }, {
      time: '19:00', checked: false, id: 39,
    }, {
      time: '19:30', checked: false, id: 40,
    }, {
      time: '20:00', checked: false, id: 41,
    }, {
      time: '20:30', checked: false, id: 42,
    }, {
      time: '21:00', checked: false, id: 43,
    }, {
      time: '21:30', checked: false, id: 44,
    }, {
      time: '22:00', checked: false, id: 45,
    }, {
      time: '22:30', checked: false, id: 46,
    }, {
      time: '23:00', checked: false, id: 47,
    }, {
      time: '23:30', checked: false, id: 48,
    }],
    daytimelist: [{
      time: '00:00', checked: false, id: 1,
    }, {
      time: '00:30', checked: false, id: 2,
    }, {
      time: '01:00', checked: false, id: 3,
    }, {
      time: '01:30', checked: false, id: 4,
    }, {
      time: '02:00', checked: false, id: 5,
    }, {
      time: '02:30', checked: false, id: 6,
    }, {
      time: '03:00', checked: false, id: 7,
    }, {
      time: '03:30', checked: false, id: 8,
    }, {
      time: '04:00', checked: false, id: 9,
    }, {
      time: '04:30', checked: false, id: 10,
    }, {
      time: '05:00', checked: false, id: 11,
    }, {
      time: '05:30', checked: false, id: 12,
    }, {
      time: '06:00', checked: false, id: 13,
    }, {
      time: '06:30', checked: false, id: 14,
    }, {
      time: '07:00', checked: false, id: 15,
    }, {
      time: '07:30', checked: false, id: 16,
    }, {
      time: '08:00', checked: false, id: 17,
    }, {
      time: '08:30', checked: false, id: 18,
    }, {
      time: '09:00', checked: false, id: 19,
    }, {
      time: '09:30', checked: false, id: 20,
    }, {
      time: '10:00', checked: false, id: 21,
    }, {
      time: '10:30', checked: false, id: 22,
    }, {
      time: '11:00', checked: false, id: 23,
    }, {
      time: '11:30', checked: false, id: 24,
    }, {
      time: '12:00', checked: false, id: 25,
    }, {
      time: '12:30', checked: false, id: 26,
    }, {
      time: '13:00', checked: false, id: 27,
    }, {
      time: '13:30', checked: false, id: 28,
    }, {
      time: '14:00', checked: false, id: 29,
    }, {
      time: '14:30', checked: false, id: 30,
    }, {
      time: '15:00', checked: false, id: 31,
    }, {
      time: '15:30', checked: false, id: 32,
    }, {
      time: '16:00', checked: false, id: 33,
    }, {
      time: '16:30', checked: false, id: 34,
    }, {
      time: '17:00', checked: false, id: 35,
    }, {
      time: '17:30', checked: false, id: 36,
    }],
    xzList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDate()
    // var time = util.formatTime(new Date());
    // console.log(time)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

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
  //按钮
  chenk(e) {
    const that = this
      if (that.data.jqIndex2 == -1 & that.data.jqIndex == -1) {
        wx.showToast({

          title: '请选择时间',

          icon: 'none',

          duration: 1000//持续的时间

        })
        return
      }
    console.log(that.data.meus)
    const time = that.data.meus[0] + '-' + that.data.meus[1] + ' ' + that.data.meus[2]+':00'
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      time: time,
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  //获取时间
  alterDay(e) {
    const that = this
    // console.log(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.id
    let day = ''
    let meus = that.data.meus
    const today = that.data.today
    const tomorrow = that.data.tomorrow
    const afterday = that.data.afterday
    if (index == 0) {
      day = today
    } else if (index == 1) {
      day = tomorrow
    } else if (index == 2) {
      day = afterday
    }
    meus[1] = day
    that.setData({
      tymIndex: index,
      meus: meus
    })
  },
  alterSj(e) {
    const that = this
    // console.log(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.id
    that.setData({
      sjIndex: index
    })
  },
  alterjq(e) {
    const that = this
    // console.log(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.id
    let time = e.currentTarget.dataset.time
    let id = e.currentTarget.dataset.name
    let meus = that.data.meus
    if (id >= that.data.disableid || that.data.tymIndex != 0) {
      meus[2] = time
    }
    that.setData({
      jqIndex: index,
      jqIndex2: -1,
      meus: meus
    })
  },
  alterjq2(e) {
    const that = this
    // console.log(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.id
    let time = e.currentTarget.dataset.time
    let id = e.currentTarget.dataset.name
    let meus = that.data.meus
    if (id >= that.data.disableid || that.data.tymIndex != 0) {
      meus[2] = time
    }
    meus[2] = time
    that.setData({
      jqIndex: -1,
      jqIndex2: index,
      meus: meus
    })
  },

  getDate() {
    let disableid = null
    let meus = []
    let today = this.getDateStr(0)
    let tomorrow = this.getDateStr(1)
    let afterday = this.getDateStr(2)
    let year = new Date().getFullYear();
    let hour = new Date().getHours()
    let min = new Date().getMinutes()
    let day = this.today
    meus.push(year)
    meus.push(today)
    console.log(hour, min)
    console.log(year)
    if (min > 30) {
      disableid = hour * 2 + 3
    } else {
      disableid = hour * 2 + 2
    }
    this.setData({
      today: today,
      tomorrow: tomorrow,
      afterday: afterday,
      disableid: disableid,
      meus: meus
    })
  },
  getDateStr(dayCount) {
    if (null == dayCount) {
      dayCount = 0;
    }
    var dd = new Date();
    console.log(dd)
    dd.setDate(dd.getDate() + dayCount);//设置日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return m + "-" + d;
  }
  //提交页面
})