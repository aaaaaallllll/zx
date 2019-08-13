// pages/table/mdfwGrade.js
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
    shopTitles: [],
    // shopTitle: ['本日金额', '本月累计', '本月指标', '本月指标完成度', '本月累计', '本月指标', '本月指标完成度', '本月累计', '本月指标', '本月指标完成度'],
    gradeData: [],
    total: [],
    shopNames: [],
    companyList: [],
    datetype: 'date',
    left: 0,
    offsetTop: 10000,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getToday()

   
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
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    that.getIndex()

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
  },
  onPageScroll: function (e) {
    // console.log(e)//{scrollTop:99}
    this.setData({
      scrollTop: e.scrollTop
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
    // console.log(e)
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
    // console.log(e)
    this.setData({
      begin: e.detail.begin,
      end: e.detail.end,
      begintime: e.detail.begintime,
      endtime: e.detail.endtime
    })
    this.getList()
  },
  getdatatimebegin: function (e) {
    // console.log(e)
    this.setData({
      begin: e.detail.data,
      begintime: e.detail.datatime
    })
  },
  getdatatimeend: function (e) {
    // console.log(e)
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
    // console.log('1')
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    // let companyCode = wx.getStorageSync('userinfo').companyCode
    let userId = wx.getStorageSync('userinfo').userId
    const companyList = that.data.companyList
    // const companyList = ['m44gwOk2PSU4cMtqHiEw007', 'm44gwOk2PSU4cMtqHiEw007']
    const shopNames = that.data.shopNames
    // const shopNames = ['1','2']

    
    let gradeList = []
    let qiuHe = []
    let ttList=[]
    

    // mdList[i].companycode

    for (let i = 0; i < companyList.length; i++) {
      wx.request({
        url: api.url,
        data: {
          operationType: 'queryLocal',
          companyCode: companyList[i],
          queryType: 'MenDianFuWuYeJi',
          date: that.data.begin,
          userId: userId
          // date: "2019-06-02"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        success(res) {
          wx.hideLoading()
          console.log(res.data)
          let list = null
          let list2 = []
          let list3 = []
          let list4 = []
          if (res.data.success) {
            list = res.data.result
          }else{
            
            list = [{
              benRiJinE: 0,
              benYueJinE: 0,
              benYueZhiBiao: 0,
              buMen: '',
              wanChengLv: ''
            }]
          }
           
            // list3.push(shopNames[i])
            for(let j=0;j<list.length;j++){
              list2.push(list[j].buMen)
              let benRiJinE = Math.floor(list[j].benRiJinE)
              let benYueJinE = Math.floor(list[j].benYueJinE)
              let benYueZhiBiao = Math.floor(list[j].benYueZhiBiao)
              // let son={
              //   buMen: list[j].buMen,
              //   brje: benRiJinE,
              //   byje: benYueJinE,
              //   byzb: benYueZhiBiao,
              //   wcl: list[j].wanChengLv
              // }
              // list3.push(son)
              list3.push(benRiJinE)
              list3.push(benYueJinE)
              list3.push(benYueZhiBiao)
              list3.push(list[j].wanChengLv)
              list4.push(benRiJinE)
              list4.push(benYueJinE)
              list4.push(benYueZhiBiao)
              list4.push('')
            }
            qiuHe.push(list4)
            let qiuHeList = []
            for (let j = 0; j < qiuHe.length; j++) {
              qiuHe[j].forEach((value, index) => {
                if (qiuHeList[index] == null || qiuHeList[index] == '') {
                  qiuHeList[index] = 0;
                }
                qiuHeList[index] += value;
              })
            }
            // console.log(list2)
            // console.log(list3)
            let son={
              name: shopNames[i],
              companyCode: companyList[i],
              list: list3
            }
            gradeList.push(son)
            for (let j = 0; j < list2.length; j++){
              let index = (j + 1) * 4
              qiuHeList[index - 1] = Math.floor((qiuHeList[index - 3] / qiuHeList[index - 2])*100)/100
              if (qiuHeList[index - 1] == null || qiuHeList[index - 1]==Infinity){
                qiuHeList[index - 1]=0
              }
            }
            
            if (list2.length>ttList.length){
              // console.log('ttList=' + ttList)
              ttList=list2
              that.setData({
                shopTitles: list2
              })
            }
           
            that.setData({
              gradeData: gradeList,
              total: qiuHeList
            })
            // if (i == companyList.length - 1) {
            //   console.log(ttList)
            //   that.paiXuData(gradeList, ttList)
            // }
           if(res.data.errorDesc){
            wx.showToast({

              title: shopNames[i] +res.data.errorDesc,

              icon: 'none',

              duration: 1000//持续的时间

            })
          }
         
        }
      })
    }
  },
  // paiXuData(list,tList){
  //   console.log(tList)
  //   // console.log(this.data.shopTitles)
  //   for (let i = 0; i < list.length;i++){
  //     for(let j=0;j<list[i].length;j++){
  //       let index = tList.indexOf(list[i].list[j].buMen)
  //       if (index!=-1){
  //         list[i].list[j].pm=index
  //       }else
  //     }
  //   }
  // },

  toBmYj(e) {
    const companyCode = e.currentTarget.dataset.id
    const companyName = e.currentTarget.dataset.name
    const userId = wx.getStorageSync('userinfo').userId
    const pwd = wx.getStorageSync('userinfo').pwd
    // console.log(wx.getStorageSync('userinfo'))
    // console.log(companyName)
    let list = {
      companyCode: companyCode,
      userId: userId,
      pwd: pwd,
      companyName: companyName
    }
    console.log(list)
    wx.setStorageSync("userinfo", list);
    // console.log(wx.getStorageSync('userinfo'))
    wx.navigateTo({
      url: '/pages/section/secGrade',
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
  //获取门店id
  getIndex() {
    const that = this
    const userId = wx.getStorageSync('userinfo').userId
    wx.request({
      url: api.ajaxUrl,
      data: {
        operationType: 'xcxBossUserService',
        userId: userId,
        type: 'query'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      success(res) {
        if (res.data.success) {
          const _data = JSON.parse(res.data.result)
          if (_data.length > 0) {
            that.setData({
              mdList: _data,
            })
            let shopNames = []
            let companyList = []
            // that.getList()

            for (let i = 0; i < _data.length; i++) {
              shopNames.push(_data[i].companyname)
              companyList.push(_data[i].companycode)
            }
            that.setData({
              shopNames: shopNames,
              companyList: companyList
            })
            that.getyesterday()
          } else {
            wx.showToast({
              title: res.data.errorDesc,
              icon: 'none',
              duration: 1000//持续的时间
            })
          }
        }
      }
    })

  },
})