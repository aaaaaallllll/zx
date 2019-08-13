// pages/table/jsGrade.js
// import Toast from '/miniprogram_npm/vant-weapp/dist/toast/toast';
// es5

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
    shopTitles: ['出勤', '总钟数', '点钟', '加钟', '总业绩', '业绩排名', '点钟率', '加钟率', '客人平均消费金额', '技师服务人数', '服务转化率', '会员占比', '业绩指标', '完成率', '会员卡销售指标', '会员卡销售金额', '会员卡指标完成率'],
    gradeData: [],
    shopName: '',
    datetype: 'date',
    jishitype:[],
    techType: '所有',
    seatText:'',
    left: 0,
    offsetTop: 10000,
    scrollTop: 0
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
      console.log(res)
      that.setData({
        offsetTop: res[0].top,
      })
      // console.log(res[0].top)
      // console.log(res[0].left)
    })
    that.getyesterday()
    that.getJiShiList()
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
    let tId=''
    if (that.data.seatText==''){
      tId='所有'
    }else{
      tId = that.data.seatText
    }
    // mdList[i].companycode
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        companyCode: companyCode,
        queryType: 'JiShiYeJi',
        // date: that.data.begin
        // date: "2019-06-02"
        begin: that.data.begin,
        end: that.data.end,
        techJob: that.data.techType,
        techId: tId,
        userId: userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data)
          const list = res.data.result
          // console.log(data)
          // let gradeData = []
          // for (let i = 0; i < data.length; i++) {
          //   let list = {
          //     payType: data[i].payType,
          //     benRiJinE: Math.floor(data[i].benRiJinE),
          //     leiJiJinE: Math.floor(data[i].leiJiJinE),
          //     leiJiShuLiang: Math.floor(data[i].leiJiShuLiang),
          //     benRiShuLiang: Math.floor(data[i].benRiShuLiang),
          //     benRiZhanBi: data[i].benRiZhanBi,
          //     leiJiZhanBi: data[i].leiJiZhanBi
          //   }
          //   gradeData.push(list)
          // }
          that.setData({
            gradeData: list
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

  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    this.setData(nameMap)
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
  onChange(event) {
    const { picker, value, index } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
  bindPickerjishitype(e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      techType: that.data.jishitype[e.detail.value].name
    })
    console.log('1')
  },
  //获取技师类型列表
  getJiShiList() {
    const that = this;
    wx.showLoading({
      title: '加载中',
    })
    const companyCode = wx.getStorageSync('userinfo').companyCode
    let gradeList = []
    // mdList[i].companycode
    wx.request({
      url: api.url,
      data: {
        operationType: 'queryLocal',
        companyCode: companyCode,
        queryType: 'queryTechJobs',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data)
          let list = res.data.result
          const name={
            name:'所有'
          }
          list.unshift(name)
          that.setData({
            jishitype: list
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