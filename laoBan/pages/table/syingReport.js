// pages/table/syingReport.js
import {
  Datas
} from '../../utils/data.js'
import {
  api
} from '../../api/config.js'
const datas = new Datas()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: false,
    begin: '',
    end: '',
    begintime: new Date().getTime(),
    endtime: new Date().getTime(),
    shopTitles: ['本日数量', '本日实收金额', '收款占比', '累计数量', '本月实收金额', '累计收款占比'],
    gradeData: [],
    shopName: '',
    datetype: 'date',
    quans:[],
    skLIst:[],
    left: 0,
    offsetTop: 10000,
    scrollTop: 0,
    total:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    const that = this
    var query = wx.createSelectorQuery()//创建节点查询器 query
    query.select('#title').boundingClientRect()//这段代码的意思是选择Id=the-id的节点，获取节点位置信息的查询请求
    query.selectViewport().scrollOffset()//这段代码的意思是获取页面滑动位置的查询请求
    query.exec(function (res) {
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
      // console.log(res)
      that.setData({
        offsetTop: res[0].top,
      })
      // console.log(res[0].top)
      // console.log(res[0].left)
    })
    that.getyesterday()
    const shopName = wx.getStorageSync('userinfo').companyName
    that.setData({
      shopName: shopName
    })
  },
  onPageScroll: function (e) {
    // console.log(e)//{scrollTop:99}
    this.setData({
      scrollTop: e.scrollTop
    })
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
  //获取日期
  resdata: function (e) {
    console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    // this.getList()
  },
  //切换查询方式
  changedata() {
    var status = this.data.status
    this.setData({
      status: !status
    })
  },
  //时段查询
  // checkdata: function (e) {
  //   var that = this;
  //   console.log(e)
  //   var type = e.currentTarget.dataset.id
  //   that.setData({
  //     type: type
  //   })
  //   if (type == 0) {
  //     this.getToday()
  //   } else if (type == 1) {
  //     this.getyesterday()
  //   } else if (type == 2) {
  //     this.getCurrentMonth()
  //   } else {
  //     this.getlastMonth()
  //   }
  // },
  // getToday() {
  //   var that = this;
  //   let timeType = 1;
  //   let end = datas.gettoday()
  //   let begin = datas.gettoday()
  //   let begin1 = begin.replace(/-/g, '/');
  //   let end1 = end.replace(/-/g, '/');
  //   that.setData({
  //     timeType: timeType,
  //     begin: begin,
  //     end: end,
  //     begintime: new Date(begin1).getTime(),
  //     endtime: new Date(end1).getTime()
  //   })
  //   this.getList()
  // },
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
  getdata: function (e) {
    console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    this.getList()
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
  formatter: function (val) {
    var strs = val.split(''); //字符串数组
    var str = ''
    for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
      str += s;
      if (!(i % 4)) str += '\n'; //按需要求余
    }
    return str
  },
  getList() {
    console.log('1')
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    const companyCode = wx.getStorageSync('userinfo').companyCode
    const userId = wx.getStorageSync('userinfo').userId
    let gradeList = []
    // mdList[i].companycode
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        companyCode: companyCode,
        queryType: 'ShouYinRiBao',
        date: that.data.begin,
        userId:userId
        // date: "2019-06-02"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.success) {
          const data = res.data.result.data
          console.log(data)
          let gradeData = []
          let quans=[]
          for (let i = 0; i < data.length; i++) {
            let type=data[i].payType
            if (type.indexOf('现金') != -1 || type.indexOf('银联') != -1 || type.indexOf('支付宝') != -1 || type.indexOf('微信') != -1 || type.indexOf('美团') != -1){
              let list = {
                payType: data[i].payType,
                benRiJinE: (Math.floor(data[i].benRiJinE * 100)) / 100,
                leiJiJinE: (Math.floor(data[i].leiJiJinE * 100)) / 100,
                leiJiShuLiang: (Math.floor(data[i].leiJiShuLiang * 100)) / 100,
                benRiShuLiang: (Math.floor(data[i].benRiShuLiang * 100)) / 100,
                benRiZhanBi: data[i].benRiZhanBi,
                leiJiZhanBi: data[i].leiJiZhanBi
              }
              quans.push(list)
            }else{
              let list = {
                payType: data[i].payType,
                benRiJinE: (Math.floor(data[i].benRiJinE * 100)) / 100,
                leiJiJinE: (Math.floor(data[i].leiJiJinE * 100)) / 100,
                leiJiShuLiang: (Math.floor(data[i].leiJiShuLiang * 100)) / 100,
                benRiShuLiang: (Math.floor(data[i].benRiShuLiang * 100)) / 100,
                benRiZhanBi: data[i].benRiZhanBi,
                leiJiZhanBi: data[i].leiJiZhanBi
              }
              gradeData.push(list)
            }
            
          }
          const cards = res.data.result.card
          let qiuHe=[0,0,'',0,0,'']
          for (let i = 0; i < cards.length;i++){
            qiuHe[0] += cards[i].benRiShuLiang
            qiuHe[1] += cards[i].benRiJinE
            qiuHe[3] += cards[i].leiJiShuLiang
            qiuHe[4] += cards[i].leiJiJinE
          }
          that.setData({
            gradeData: gradeData,
            quans:quans,
            skLIst: cards,
            total: qiuHe
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
    that.getList()
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
  getLeft(e) {
    // console.log(e.detail.scrollLeft)
    // console.log(e.currentTarget.offsetTop)
    let left = e.detail.scrollLeft
    let offsetTop = e.currentTarget.offsetTop
    this.setData({
      left: left,

    })
  }
})